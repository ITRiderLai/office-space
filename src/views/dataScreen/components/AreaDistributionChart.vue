<template>
  <div class="distribution-card">
    <div class="distribution-title">房屋面积分布</div>
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'

interface AreaDistribution {
  region: string
  area: number
}

const props = defineProps<{
  data: AreaDistribution[]
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const getChartSize = () => {
  if (!chartRef.value) return { width: 400, height: 200 }
  const width = chartRef.value.clientWidth || 400
  const height = chartRef.value.clientHeight || 200
  return { width, height }
}

const getFontSize = (baseSize: number) => {
  const { width } = getChartSize()
  const scale = width / 800
  return Math.round(baseSize * scale)
}

const getLineHeight = (baseHeight: number) => {
  const { width } = getChartSize()
  const scale = Math.min(Math.max(width / 400, 0.9), 1.1)
  return Math.round(baseHeight * scale)
}

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  const regions = props.data.map(item => item.region)
  const areas = props.data.map(item => item.area)
  const barWidth = 20

  // 计算柱状图高度
  const computedBarHeight = (value: any, params: any) => {
    const zeroHeight = chartInstance!.convertToPixel({ yAxisIndex: 0 }, 0)
    const height = chartInstance!.convertToPixel({ yAxisIndex: 0 }, params.data.yAxis)
    return [barWidth / 2, zeroHeight - height]
  }

  // 构建 markPoint 数据
  const markPointData: any[] = []
  areas.forEach((v, i) => {
    // 左侧面
    markPointData.push({
      xAxis: regions[i],
      yAxis: v,
      symbol: 'rect',
      symbolSize: computedBarHeight,
      symbolOffset: ['-50%', '50%'],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(40, 158, 82, 1)' },
            { offset: 1, color: 'rgba(40, 158, 82, 0.1)' }
          ]
        }
      }
    })
    // 右侧面
    markPointData.push({
      xAxis: regions[i],
      yAxis: v,
      symbol: 'rect',
      symbolSize: computedBarHeight,
      symbolOffset: ['50%', '50%'],
      itemStyle: {
        color: {
          type: 'linear',
          x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(50, 198, 103, 1)' },
            { offset: 1, color: 'rgba(50, 198, 103, 0.1)' }
          ]
        }
      }
    })
    // 顶部菱形
    markPointData.push({
      xAxis: regions[i],
      yAxis: v,
      symbol: 'path://M 0 5 L 10 10 L 20 5 L 10 0 L 0 5 Z',
      symbolSize: [barWidth, barWidth / 2],
      symbolOffset: [0, 0],
      itemStyle: {
        color: '#5DE092'
      },
      label: {
        show: true,
        position: 'top',
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: getFontSize(9),
        formatter: () => {
          if (v >= 1000) {
            return (v / 1000).toFixed(1) + 'k'
          }
          return v.toString()
        }
      }
    })
  })

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
        const idx = params[0]?.dataIndex
        if (idx !== undefined) {
          return `${regions[idx]}<br/>面积: ${areas[idx].toLocaleString()} m²`
        }
        return ''
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '5%',
      top: '20%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: regions,
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: getFontSize(10),
        interval: 0,
        lineHeight: getLineHeight(16),
        formatter: (value: string) => {
          // 每4个字符换行
          if (value.length > 4) {
            return value.replace(/(.{4})/g, '$1\n').trim()
          }
          return value
        }
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位（平方米）',
      nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)', fontSize: getFontSize(10) },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: getFontSize(10),
        formatter: (value: number) => {
          if (value >= 1000) {
            return (value / 1000).toFixed(0) + 'k'
          }
          return value
        }
      },
      splitLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.1)' } }
    },
    series: [
      {
        type: 'bar',
        data: areas,
        barWidth: barWidth,
        itemStyle: {
          color: 'transparent'
        },
        markPoint: {
          data: markPointData,
          animation: false
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
.distribution-card {
  height: 100%;
  background-image: url('@/assets/dataScreen/bg-房屋面积分布.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  @include flex(stretch, stretch, column);
}

.distribution-title {
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  flex-shrink: 0;
  height: 32px;
  line-height: 32px;
}

.chart-container {
  flex: 1;
  min-height: 0;
}
</style>
