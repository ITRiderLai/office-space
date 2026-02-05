<template>
  <div class="map-container" ref="chartRef"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'

interface RegionData {
  name: string
  value: number
}

const props = defineProps<{
  data: RegionData[]
}>()

const chartRef = ref<HTMLElement>()
let chartInstance: echarts.ECharts | null = null
let resizeObserver: ResizeObserver | null = null

const getContainerSize = () => {
  if (!chartRef.value) return { width: 800, height: 600 }
  const rect = chartRef.value.getBoundingClientRect()
  return { width: rect.width, height: rect.height }
}

const mapZoom = computed(() => {
  const { width } = getContainerSize()
  if (width >= 1200) {
    return 1.6
  } else if (width >= 800) {
    return 1.4
  } else {
    return 1.2
  }
})

// 红河州GeoJSON数据（使用本地文件）
const loadGeoJson = async () => {
  try {
    const response = await fetch('/532500_full.json')
    const geoJson = await response.json()
    echarts.registerMap('honghe', geoJson)
    return true
  } catch (error) {
    console.error('加载地图数据失败:', error)
    return false
  }
}

const initChart = async () => {
  if (!chartRef.value) return

  const loaded = await loadGeoJson()
  if (!loaded) return

  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance) return

  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      borderColor: 'rgba(0, 212, 255, 0.3)',
      textStyle: { color: '#fff' },
      formatter: (params: any) => {
        return `${params.name}`
      }
    },
    geo: {
      map: 'honghe',
      roam: true,
      zoom: mapZoom.value,
      center: [103.3, 23.5],
      label: {
        show: true,
        color: '#fff',
        fontSize: 11
      },
      itemStyle: {
        areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#0d4a6e' },
          { offset: 1, color: '#0a2e4a' }
        ]),
        borderColor: '#00d4ff',
        borderWidth: 1,
        shadowColor: 'rgba(0, 212, 255, 0.5)',
        shadowBlur: 10
      },
      emphasis: {
        itemStyle: {
          areaColor: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1a6e9e' },
            { offset: 1, color: '#0d4a6e' }
          ]),
          borderColor: '#00d4ff',
          borderWidth: 2
        },
        label: {
          color: '#00d4ff',
          fontSize: 12,
          fontWeight: 'bold'
        }
      },
      select: {
        itemStyle: {
          areaColor: '#1a6e9e'
        }
      }
    },
    series: props.data.length ? [
      {
        type: 'map',
        geoIndex: 0,
        data: props.data
      }
    ] : []
  }

  chartInstance.setOption(option)
}

const handleResize = () => {
  chartInstance?.resize()
  if (chartInstance) {
    chartInstance.setOption({
      geo: {
        zoom: mapZoom.value
      }
    })
  }
}

watch(() => props.data, updateChart, { deep: true })

onMounted(() => {
  initChart()
  resizeObserver = new ResizeObserver(() => {
    requestAnimationFrame(() => {
      handleResize()
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

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}
</style>
