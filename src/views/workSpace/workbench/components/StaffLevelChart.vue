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
let resizeObserver: ResizeObserver | null = null

const getFontSize = (baseSize: number) => {
  if (!chartRef.value) return baseSize
  const width = chartRef.value.clientWidth
  const scale = Math.min(Math.max(width / 400, 0.8), 1.2)
  return Math.round(baseSize * scale)
}

const getLineHeight = (baseHeight: number) => {
  if (!chartRef.value) return baseHeight
  const width = chartRef.value.clientWidth
  const scale = Math.min(Math.max(width / 400, 0.9), 1.1)
  return Math.round(baseHeight * scale)
}

const getGridLeft = () => {
  if (!chartRef.value) return '12%'
  return chartRef.value.clientWidth < 400 ? '15%' : '12%'
}

const getGridBottom = () => {
  if (!chartRef.value) return '20%'
  const height = chartRef.value.clientHeight
  if (height < 200) return '30%'
  if (height < 280) return '25%'
  return '20%'
}

const initChart = () => {
  if (!chartRef.value) return

  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  const levels = props.data.map(item => item.level)
  const counts = props.data.map(item => item.count)
  const barWidth = 20

  // 计算柱状图高度
  const computedBarHeight = (value: any, params: any) => {
    const zeroHeight = chartInstance!.convertToPixel({ yAxisIndex: 0 }, 0)
    const height = chartInstance!.convertToPixel({ yAxisIndex: 0 }, params.data.yAxis)
    return [barWidth / 2, zeroHeight - height]
  }

  // 构建 markPoint 数据 - 3D效果
  const markPointData: any[] = []
  counts.forEach((v, i) => {
    // 左侧面
    markPointData.push({
      xAxis: levels[i],
      yAxis: v,
      symbol: 'rect',
      symbolSize: computedBarHeight,
      symbolOffset: ['-50%', '50%'],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(200, 100, 70, 1)' },
            { offset: 1, color: 'rgba(200, 100, 70, 0.1)' }
          ]
        }
      }
    })
    // 右侧面
    markPointData.push({
      xAxis: levels[i],
      yAxis: v,
      symbol: 'rect',
      symbolSize: computedBarHeight,
      symbolOffset: ['50%', '50%'],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(232, 126, 97, 1)' },
            { offset: 1, color: 'rgba(232, 126, 97, 0.1)' }
          ]
        }
      }
    })
    // 顶部菱形
    markPointData.push({
      xAxis: levels[i],
      yAxis: v,
      symbol: 'path://M 0 5 L 10 10 L 20 5 L 10 0 L 0 5 Z',
      symbolSize: [barWidth, barWidth / 2],
      symbolOffset: [0, 0],
      itemStyle: {
        color: '#F5A08A'
      },
      label: {
        show: true,
        position: 'top',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: getFontSize(11),
        formatter: () => v.toLocaleString()
      }
    })
  })

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(232, 126, 97, 0.3)',
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        const idx = params[0]?.dataIndex
        if (idx !== undefined) {
          return `${levels[idx]}<br/>人数: ${counts[idx].toLocaleString()} 人`
        }
        return ''
      }
    },
    grid: {
      left: getGridLeft(),
      right: '5%',
      top: '15%',
      bottom: getGridBottom()
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
        fontSize: getFontSize(11),
        lineHeight: getLineHeight(16),
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
        fontSize: getFontSize(12),
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
        data: counts,
        barWidth: barWidth,
        itemStyle: {
          color: 'transparent'
        },
        markPoint: {
          data: markPointData,
          animation: false,
          silent: true
        }
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
