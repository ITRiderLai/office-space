<template>
  <div class="chart-card">
    <PanelTitle title="房屋使用情况分布" absolute />
    <div class="chart-wrapper">
      <div class="chart-container" ref="chartRef"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import PanelTitle from './PanelTitle.vue'
import chartBgImage from '@/assets/dataScreen/chart-bg.png'

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
let bgImageElement: any = null

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
      },
      events: {
        load: function(this: any) {
          const chart = this
          const addBgImage = () => {
            if (!chart.series[0]?.center) return
            const centerX = chart.plotLeft + chart.series[0].center[0]
            const centerY = chart.plotTop + chart.series[0].center[1]
            // 保持原始比例 277:125
            const imgWidth = Math.min(chart.plotWidth, chart.plotHeight) * 0.8
            const imgHeight = imgWidth * (125 / 277)

            if (bgImageElement) {
              bgImageElement.destroy()
            }
            bgImageElement = chart.renderer.image(
              chartBgImage,
              centerX - imgWidth / 2,
              centerY - imgHeight / 2 + 40,
              imgWidth,
              imgHeight
            ).attr({ zIndex: 0 }).add()
          }
          setTimeout(addBgImage, 100)
          // 微调容器尺寸以刷新图表位置
          if (chartRef.value) {
            setTimeout(() => {
              if (chartRef.value) {
                chartRef.value.style.height = 'calc(100% - 1px)'
              }
            }, 1000)
          }
        },
        redraw: function(this: any) {
          const chart = this
          if (!chart.series[0]?.center || !bgImageElement) return
          const centerX = chart.plotLeft + chart.series[0].center[0]
          const centerY = chart.plotTop + chart.series[0].center[1]
          const imgWidth = Math.min(chart.plotWidth, chart.plotHeight) * 0.8
          const imgHeight = imgWidth * (125 / 277)

          bgImageElement.attr({
            x: centerX - imgWidth / 2,
            y: centerY - imgHeight / 2 + 40,
            width: imgWidth,
            height: imgHeight
          })
        }
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
      borderWidth: 1,
      padding: 8,
      shadow: false,
      style: {
        color: '#fff',
        fontSize: '14px'
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
      layout: 'horizontal',
      itemStyle: {
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: '14px'
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

let resizeTimer: any = null
const handleResize = () => {
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeTimer = setTimeout(() => {
    if (chartInstance && chartRef.value) {
      const width = chartRef.value.clientWidth
      const height = chartRef.value.clientHeight
      chartInstance.setSize(width, height, false)
    }
  }, 100)
}

watch(() => props.data, updateChart, { deep: true })

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)

  // 使用 ResizeObserver 监听容器尺寸变化
  if (chartRef.value) {
    resizeObserver = new ResizeObserver(() => {
      handleResize()
    })
    resizeObserver.observe(chartRef.value)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (resizeTimer) clearTimeout(resizeTimer)
  resizeObserver?.disconnect()
  chartInstance?.destroy()
})
</script>

<style lang="scss" scoped>
.chart-card {
  position: relative;
  height: 100%;
}

.chart-wrapper {
  height: 100%;
  padding-top: 40px;
  box-sizing: border-box;
  background-image: url('@/assets/dashboard/bg-cont.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.chart-container {
  width: 100%;
  height: 100%;
}
</style>
