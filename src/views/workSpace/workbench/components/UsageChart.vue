<template>
  <div class="chart-card">
    <PanelTitle title="使 用 情 况" absolute />
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import PanelTitle from './PanelTitle.vue'

interface UsageData {
  type: string
  value: number
}

const props = defineProps<{
  data: UsageData[]
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null

const colors = ['#1890ff', '#52c41a', '#ffc107', '#fa8c16']

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  const total = props.data.reduce((sum, item) => sum + item.value, 0)

  const option: echarts.EChartsOption = {
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
        fontSize: 13
      },
      formatter: (name: string) => {
        const item = props.data.find(d => d.type === name)
        if (item) {
          return `${name}  ${item.value}`
        }
        return name
      }
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          color: '#fff',
          fontSize: 12,
          formatter: (params: any) => {
            const percent = ((params.value / total) * 100).toFixed(0)
            return `${percent}%`
          }
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          }
        },
        data: props.data.map((item, index) => ({
          name: item.type,
          value: item.value,
          itemStyle: {
            color: colors[index % colors.length]
          }
        }))
      }
    ]
  }

  chartInstance.setOption(option)
}

const handleResize = () => {
  chartInstance?.resize()
}

watch(() => props.data, updateChart, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style scoped>
.chart-card {
  position: relative;
  height: 100%;
}

.chart-container {
  height: 100%;
  padding-top: 40px;
  box-sizing: border-box;
  background-image: url('@/assets/dashboard/bg-cont.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
}
</style>
