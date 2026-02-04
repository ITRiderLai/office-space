<template>
  <div class="map-panel">
    <!-- 工具栏 -->
    <div class="map-toolbar">
      <div class="toolbar-btn" @click="handleClear">
        <lay-icon type="layui-icon-delete" />
        <span>清除</span>
      </div>
      <div class="toolbar-btn" @click="handleZoomIn">
        <lay-icon type="layui-icon-add-circle" />
        <span>放大</span>
      </div>
      <div class="toolbar-btn" @click="handleZoomOut">
        <lay-icon type="layui-icon-reduce-circle" />
        <span>缩小</span>
      </div>
    </div>

    <!-- 地图容器 -->
    <div class="map-container" ref="mapRef"></div>

    <!-- 模式切换 -->
    <div class="map-mode-switch">
      <div
        class="mode-btn"
        :class="{ active: mapMode === 'region' }"
        @click="switchMode('region')"
      >
        区域
      </div>
      <div
        class="mode-btn"
        :class="{ active: mapMode === 'map' }"
        @click="switchMode('map')"
      >
        地图
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import * as echarts from 'echarts'

const mapRef = ref<HTMLElement>()
const mapMode = ref('region')
let chartInstance: echarts.ECharts | null = null
let mapData: any = null
const windowWidth = ref(window.innerWidth)

// 根据浏览器宽度计算地图缩放比例
// 宽度越大，zoom值越大（地图显示更大）
const mapZoom = computed(() => {
  const width = windowWidth.value
  if (width >= 1920) {
    return 1.0
  } else if (width >= 1600) {
    return 0.9
  } else if (width >= 1366) {
    return 0.85
  } else if (width >= 1280) {
    return 0.75
  } else {
    return 0.65
  }
})

// 云南省各地区数据
const regionData = [
  { name: '昆明市', value: 120 },
  { name: '曲靖市', value: 85 },
  { name: '玉溪市', value: 60 },
  { name: '保山市', value: 45 },
  { name: '昭通市', value: 70 },
  { name: '丽江市', value: 35 },
  { name: '普洱市', value: 50 },
  { name: '临沧市', value: 40 },
  { name: '楚雄彝族自治州', value: 55 },
  { name: '红河哈尼族彝族自治州', value: 75 },
  { name: '文山壮族苗族自治州', value: 48 },
  { name: '西双版纳傣族自治州', value: 30 },
  { name: '大理白族自治州', value: 65 },
  { name: '德宏傣族景颇族自治州', value: 25 },
  { name: '怒江傈僳族自治州', value: 15 },
  { name: '迪庆藏族自治州', value: 20 }
]

// 加载地图数据（使用本地文件）
const loadMapData = async () => {
  try {
    const response = await fetch('/530000_full.json')
    mapData = await response.json()
    echarts.registerMap('yunnan', mapData)
    initChart()
  } catch (error) {
    console.error('加载地图数据失败:', error)
  }
}

// 初始化图表
const initChart = () => {
  if (!mapRef.value || !mapData) return

  chartInstance = echarts.init(mapRef.value)
  updateChart()
}

// 更新图表
const updateChart = () => {
  if (!chartInstance) return

  const option: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    geo: {
      map: 'yunnan',
      roam: true,
      zoom: mapZoom.value,
      center: [101.5, 25],
      label: {
        show: true,
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 10
      },
      itemStyle: {
        areaColor: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#0b2a5a' },
            { offset: 1, color: '#0a1628' }
          ]
        },
        borderColor: '#1890ff',
        borderWidth: 1.5,
        shadowColor: 'rgba(24, 144, 255, 0.5)',
        shadowBlur: 10
      },
      emphasis: {
        itemStyle: {
          areaColor: '#1890ff',
          borderColor: '#00d4ff',
          borderWidth: 2
        },
        label: {
          color: '#fff',
          fontSize: 12
        }
      },
      select: {
        itemStyle: {
          areaColor: '#1890ff'
        }
      }
    },
    series: [
      {
        type: 'map',
        map: 'yunnan',
        geoIndex: 0,
        data: regionData
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: [
          { name: '昆明市', value: [102.8, 25.05, 120] },
          { name: '曲靖市', value: [103.8, 25.5, 85] },
          { name: '大理白族自治州', value: [100.2, 25.6, 65] }
        ],
        symbolSize: (val: number[]) => Math.sqrt(val[2]) * 2,
        showEffectOn: 'render',
        rippleEffect: {
          brushType: 'stroke',
          scale: 3
        },
        itemStyle: {
          color: '#00d4ff',
          shadowBlur: 10,
          shadowColor: '#00d4ff'
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

// 切换模式
const switchMode = (mode: string) => {
  mapMode.value = mode
  // 可以根据模式切换不同的显示效果
}

// 清除选中
const handleClear = () => {
  if (chartInstance) {
    chartInstance.dispatchAction({
      type: 'unselect',
      seriesIndex: 0
    })
  }
}

// 放大
const handleZoomIn = () => {
  if (chartInstance) {
    const option = chartInstance.getOption() as any
    const currentZoom = option.geo[0].zoom || 1.2
    chartInstance.setOption({
      geo: {
        zoom: currentZoom * 1.2
      }
    })
  }
}

// 缩小
const handleZoomOut = () => {
  if (chartInstance) {
    const option = chartInstance.getOption() as any
    const currentZoom = option.geo[0].zoom || 1.2
    chartInstance.setOption({
      geo: {
        zoom: currentZoom / 1.2
      }
    })
  }
}

// 窗口大小变化
const handleResize = () => {
  windowWidth.value = window.innerWidth
  chartInstance?.resize()
  // 根据新的宽度更新地图缩放
  if (chartInstance) {
    chartInstance.setOption({
      geo: {
        zoom: mapZoom.value
      }
    })
  }
}

onMounted(() => {
  loadMapData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  chartInstance?.dispose()
})
</script>

<style lang="scss" scoped>
.map-panel {
  height: 100%;
  position: relative;
  background-color: #0a1628;
  background-image: url('@/assets/dashboard/chat-bg.png');
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 4px;
  overflow: hidden;
}

.map-toolbar {
  position: absolute;
  top: 15px;
  left: 15px;
  @include flex();
  gap: 10px;
  z-index: 10;
}

.toolbar-btn {
  @include flex(flex-start, center);
  gap: 5px;
  padding: 6px 12px;
  background: rgba(0, 97, 206, 0.2);
  border: 1px solid rgba(44, 139, 255, 0.6);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
}

.toolbar-btn:hover {
  background: rgba(24, 144, 255, 0.3);
  border-color: #1890ff;
  color: #fff;
}

.toolbar-btn :deep(.layui-icon) {
  font-size: 14px;
}

.map-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.map-placeholder {
  text-align: center;
}

.placeholder-text {
  color: rgba(255, 255, 255, 0.5);
  font-size: 24px;
  margin-bottom: 10px;
}

.placeholder-subtext {
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
}

.map-mode-switch {
  position: absolute;
  bottom: 20px;
  left: 20px;
  @include flex();
}

.mode-btn {
  padding: 6px 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s;
  background: rgba(34, 79, 167, 0.2);
  border-radius: 0px 4px 4px 0px;
  border: 1px solid rgba(44, 139, 255, 0.6);
}

.mode-btn:first-child {
  border-radius: 4px 0 0  4px;
}

.mode-btn:hover {
  color: #fff;
}

.mode-btn.active {
  background: linear-gradient(360deg, rgba(27, 193, 200, 0.5) 0%, rgba(27, 193, 200, 0) 100%), #0061CE;
  border-radius: 4px 0px 0px 4px;
  border: 1px solid rgba(44, 139, 255, 0.6);
  color: #fff;
}
</style>
