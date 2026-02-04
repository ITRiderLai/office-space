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
let resizeObserver: ResizeObserver | null = null

const getFontSize = (baseSize: number) => {
  if (!chartRef.value) return baseSize
  const width = chartRef.value.clientWidth
  const scale = Math.min(Math.max(width / 400, 0.8), 1.2)
  return Math.round(baseSize * scale)
}

const getLegendRight = () => {
  if (!chartRef.value) return '10%'
  return chartRef.value.clientWidth < 350 ? '5%' : '10%'
}

const getPieCenter = () => {
  if (!chartRef.value) return ['35%', '50%']
  return chartRef.value.clientWidth < 350 ? ['40%', '50%'] : ['35%', '50%']
}

const getPieRadius = () => {
  if (!chartRef.value) return ['45%', '70%']
  return chartRef.value.clientWidth < 350 ? ['40%', '65%'] : ['45%', '70%']
}

const colors = [
  { fill: 'rgba(30, 223, 247, 0.6)', border: '#1EDFF7' },
  { fill: 'rgba(82, 196, 26, 0.6)', border: '#52c41a' },
  { fill: 'rgba(255, 193, 7, 0.6)', border: '#ffc107' },
  { fill: 'rgba(250, 140, 22, 0.6)', border: '#fa8c16' }
]

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  const total = props.data.reduce((sum, item) => sum + item.value, 0)
  const fontSize = getFontSize(12)

  const option: echarts.EChartsOption = {
    legend: {
      orient: 'vertical',
      right: getLegendRight(),
      top: 'center',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        color: '#fff',
        fontSize: getFontSize(13)
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
        radius: getPieRadius(),
        center: getPieCenter(),
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          color: '#fff',
          fontSize: fontSize,
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
            color: colors[index % colors.length].fill,
            borderColor: colors[index % colors.length].border,
            borderWidth: 4
          }
        }))
      }
    ]
  }

  chartInstance.setOption(option)
}

watch(() => props.data, updateChart, { deep: true })

onMounted(() => {
  initChart()
  resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(() => {
      chartInstance?.resize()
      updateChart()
    })
  })
  if (chartRef.value) {
    resizeObserver.observe(chartRef.value)
  }
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  chartInstance?.dispose()
})
</script>

<style lang="scss" scoped>
.chart-card {
  position: relative;
  height: 100%;
}

.chart-container {
  height: 100%;
  padding: 40px 10px 10px;
  box-sizing: border-box;
  background-image: url('@/assets/dashboard/bg-cont.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
}
</style>
