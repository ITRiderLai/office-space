<template>
  <div class="chart-card">
    <PanelTitle title="编 制 人 数" absolute />
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import PanelTitle from './PanelTitle.vue'

interface StaffLevelData {
  level: string
  count: number
}

const props = defineProps<{
  data: StaffLevelData[]
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

  const levels = props.data.map(item => item.level)
  const counts = props.data.map(item => item.count)

  const option: echarts.EChartsOption = {
    grid: {
      left: '12%',
      right: '5%',
      top: '15%',
      bottom: '20%'
    },
    xAxis: {
      type: 'category',
      data: levels,
      axisLine: {
        lineStyle: { color: 'rgba(255, 255, 255, 0.3)' }
      },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 11,
        interval: 0,
        formatter: (value: string) => {
          if (value.length > 3) {
            return value.slice(0, 3) + '\n' + value.slice(3)
          }
          return value
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 12,
        formatter: (value: number) => {
          if (value >= 1000) {
            return (value / 1000).toFixed(0) + ',000'
          }
          return value.toString()
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    series: [
      {
        type: 'bar',
        data: counts.map((v, i) => ({
          value: v,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#00d4ff' },
              { offset: 1, color: '#0066cc' }
            ]),
            borderRadius: [4, 4, 0, 0]
          }
        })),
        barWidth: 20,
        label: {
          show: true,
          position: 'top',
          color: '#00d4ff',
          fontSize: 12,
          formatter: (params: any) => params.value.toLocaleString()
        }
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
