<template>
  <div class="chart-card">
    <PanelTitle title="管理范围" absolute />
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import PanelTitle from './PanelTitle.vue'
import { useChartResize } from '@/composables/useChartResize'

interface ManagementData {
  category: string
  value: number
  color: string
  color2: string
}

const props = defineProps<{
  data: ManagementData[]
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const { getFontSize } = useChartResize(chartRef)

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  const categories = props.data.map(item => item.category)
  const values = props.data.map(item => item.value)
  const colors = props.data.map(item => item.color)
  const colors2 = props.data.map(item => item.color2)

  // 3D圆锥体路径
  const coneBody = 'path://M50,0 L100,100 Q50,115 0,100 L50,0 Z'

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      borderWidth: 1,
      padding: 8,
      textStyle: { color: '#fff', fontSize: getFontSize(12) },
      formatter: (params: any) => {
        const data = params[0]
        return `${data.name}: ${data.value} 人`
      }
    },
    legend: {
      show: false
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: getFontSize(12),
        margin: 14
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
      // 圆锥主体 - 使用双色渐变
      {
        type: 'pictorialBar',
        symbol: coneBody,
        symbolSize: ['50', '100%'],
        symbolOffset: [0, 5],
        symbolPosition: 'end',
        z: 12,
        data: values.map((v, i) => ({
          value: v,
          name: categories[i],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: hexToRgba(colors[i], 0.9) },
              { offset: 0.5, color: hexToRgba(colors[i], 0.8) },
              { offset: 0.5, color: hexToRgba(colors2[i], 0.8) },
              { offset: 1, color: hexToRgba(colors2[i], 0.7) }
            ])
          }
        })),
        label: {
          show: true,
          position: 'top',
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: getFontSize(12),
          fontWeight: 'bold',
          offset: [0, -5]
        }
      },
    ]
  }

  chartInstance.setOption(option)
}

// 颜色加深/变浅函数
const shadeColor = (color: string, percent: number) => {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (0x1000000 +
    (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)
  ).toString(16).slice(1)
}

// 十六进制颜色转rgba
const hexToRgba = (hex: string, alpha: number) => {
  const num = parseInt(hex.replace('#', ''), 16)
  const R = (num >> 16) & 0xFF
  const G = (num >> 8) & 0xFF
  const B = num & 0xFF
  return `rgba(${R}, ${G}, ${B}, ${alpha})`
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
