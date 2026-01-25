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

const initChart = () => {
  if (!chartRef.value) return
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  const regions = props.data.map(item => item.region)
  const areas = props.data.map(item => item.area)

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        const data = params[0]
        return `${data.name}<br/>面积: ${data.value.toLocaleString()} m²`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: regions,
      axisLine: { lineStyle: { color: 'rgba(255, 255, 255, 0.2)' } },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 10,
        interval: 0,
        rotate: 30
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      name: '单位（平方米）',
      nameTextStyle: { color: 'rgba(255, 255, 255, 0.6)', fontSize: 10 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: 10,
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
        barWidth: '60%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00d4ff' },
            { offset: 1, color: '#0066cc' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        label: {
          show: true,
          position: 'top',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 9,
          formatter: (params: any) => {
            if (params.value >= 1000) {
              return (params.value / 1000).toFixed(1) + 'k'
            }
            return params.value
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
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style scoped>
.distribution-card {
  height: 100%;
  background-image: url('@/assets/dataScreen/bg-房屋面积分布.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
}

.distribution-title {
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
  flex-shrink: 0;
}

.chart-container {
  flex: 1;
  min-height: 0;
}
</style>
