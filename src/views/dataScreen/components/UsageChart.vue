<template>
  <div class="chart-card">
    <PanelTitle title="房屋使用情况分布" absolute />
    <div class="chart-container" ref="chartRef"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
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
let chartInstance: any = null

// 将 hex 颜色转换为带透明度的 rgba
const hexToRgba = (hex: string, alpha: number) => {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = (num >> 16) & 0xFF
  const g = (num >> 8) & 0xFF
  const b = num & 0xFF
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const initChart = () => {
  if (!chartRef.value) return
  const Highcharts = (window as any).Highcharts
  if (!Highcharts) {
    console.error('Highcharts not loaded')
    return
  }

  chartInstance = Highcharts.chart(chartRef.value, {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
      options3d: {
        enabled: true,
        alpha: 60,
        beta: 0
      }
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      style: {
        color: '#fff'
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      layout: 'horizontal',
      itemStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '12px'
      },
      itemHoverStyle: {
        color: '#00d4ff'
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 40,
        size: '65%',
        innerSize: '50%',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderWidth: 1,
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f}%',
          color: 'rgba(255, 255, 255, 0.8)',
          style: {
            fontSize: '11px',
            textOutline: 'none'
          }
        },
        showInLegend: true
      }
    },
    series: [{
      name: '占比',
      data: props.data.map(item => ({
        name: item.name,
        y: item.value,
        color: hexToRgba(item.color, 0.7),
        borderColor: '#ffffff',
        borderWidth: 2
      }))
    }]
  })
}

const updateChart = () => {
  if (!chartInstance || !props.data.length) return

  chartInstance.series[0].setData(
    props.data.map(item => ({
      name: item.name,
      y: item.value,
      color: hexToRgba(item.color, 0.7)
    })),
    true
  )
}

const handleResize = () => {
  chartInstance?.reflow()
}

watch(() => props.data, updateChart, { deep: true })

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.destroy()
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
