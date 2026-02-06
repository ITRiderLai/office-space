<template>
  <div class="chart-card">
    <PanelTitle title="机 构 类 型" absolute />
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'
import PanelTitle from './PanelTitle.vue'
import { useChartResize } from '@/composables/useChartResize'

interface OrgTypeData {
  name: string
  value: number
}

const props = defineProps<{
  data: OrgTypeData[]
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

  const names = props.data.map(item => item.name)
  const values = props.data.map(item => item.value)
  const maxValue = Math.max(...values)
  const fontSize = getFontSize(12)

  const option: echarts.EChartsOption = {
    grid: {
      left: '15%',
      right: '15%',
      top: '10%',
      bottom: '15%'
    },
    xAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: getFontSize(12)
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: names,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: '#fff',
        fontSize: fontSize
      }
    },
    series: [
      {
        type: 'bar',
        data: values.map((v, i) => ({
          value: (v / maxValue) * 100,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#4AA1FF' },
              { offset: 1, color: '#3CC8FF' }
            ]),
            borderRadius: [0, 10, 10, 0]
          }
        })),
        barWidth: 16,
        label: {
          show: true,
          position: 'right',
          color: '#fff',
          fontSize: fontSize,
          formatter: (params: any) => values[params.dataIndex]
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(255, 255, 255, 0.1)',
          borderRadius: [0, 10, 10, 0]
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
