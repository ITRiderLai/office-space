<template>
  <div class="chart-card">
    <PanelTitle title="房屋使用情况公布" absolute />
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import PanelTitle from './PanelTitle.vue'

interface UsageData {
  name: string
  value: number
  color: string
}

const props = defineProps<{
  data: UsageData[]
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  const total = props.data.reduce((sum, item) => sum + item.value, 0)

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        return `${params.name}: ${params.value}%`
      }
    },
    legend: {
      orient: 'horizontal',
      top: '8%',
      left: 'center',
      textStyle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: 12 },
      itemWidth: 12,
      itemHeight: 12,
      itemGap: 20
    },
    series: [
      {
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['50%', '58%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: '#0a1929',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 11,
          formatter: '{d}%'
        },
        labelLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)'
          }
        },
        data: props.data.map(item => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: item.color }
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
}
</style>
