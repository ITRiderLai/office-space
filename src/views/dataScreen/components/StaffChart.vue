<template>
  <div class="chart-card">
    <PanelTitle title="编制人数/办公人数" absolute />
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import PanelTitle from './PanelTitle.vue'

interface StaffData {
  category: string
  staffCount: number
  workCount: number
}

const props = defineProps<{
  data: StaffData[]
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

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  const categories = props.data.map(item => item.category)
  const staffCounts = props.data.map(item => item.staffCount)
  const workCounts = props.data.map(item => item.workCount)

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      borderWidth: 1,
      padding: 8,
      textStyle: { color: '#fff', fontSize: getFontSize(12) }
    },
    legend: {
      data: ['编制人数', '办公人数'],
      top: 10,
      textStyle: { color: 'rgba(255, 255, 255, 0.8)', fontSize: getFontSize(12) },
      itemWidth: 12,
      itemHeight: 12
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: getFontSize(11),
        interval: 0,
        rotate: 0,
        lineHeight: getFontSize(18),
        formatter: (value: string) => {
          if (value === '市级正职') return '市级\n正职'
          if (value === '市级副职') return '市级\n副职'
          if (value === '正局(处)级') return '正局\n(处)级'
          if (value === '副局(处)级') return '副局\n(处)级'
          if (value === '局(处)级以下') return '局(处)级\n以下'
          return value
        }
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位（人）',
      nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)', fontSize: getFontSize(11) },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(255, 255, 255, 0.6)', fontSize: getFontSize(11) },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
    },
    series: [
      {
        name: '编制人数',
        type: 'bar',
        data: staffCounts,
        barWidth: 12,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#5DB6FF' },
            { offset: 1, color: '#008CFF' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: getFontSize(10),
          formatter: (params: any) => {
            const idx = params.dataIndex
            const staffVal = staffCounts[idx]
            const workVal = workCounts[idx]
            if (staffVal >= workVal && staffVal > 0) {
              return staffVal
            }
            return ''
          }
        }
      },
      {
        name: '办公人数',
        type: 'bar',
        data: workCounts,
        barWidth: 12,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#85CFA0' },
            { offset: 1, color: '#32C667' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: getFontSize(10),
          formatter: (params: any) => {
            const idx = params.dataIndex
            const staffVal = staffCounts[idx]
            const workVal = workCounts[idx]
            if (workVal > staffVal && workVal > 0) {
              return workVal
            }
            return ''
          }
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
  window.removeEventListener('resize', handleResize)
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
  padding: 40px 15px 10px;
  box-sizing: border-box;
  background-image: url('@/assets/dashboard/bg-cont.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
