<template>
  <div class="data-screen" ref="screenRef">
    <!-- 顶部标题栏 -->
    <ScreenHeader
      :isFullscreen="isFullscreen"
      @toggle-fullscreen="toggleFullscreen"
      @go-back="handleGoBack"
      @logout="handleLogout"
    />

    <!-- 主内容区域 -->
    <div class="screen-content">
      <!-- 左侧区域 -->
      <div class="left-panel">
        <div class="chart-item">
          <StaffChart :data="staffData" />
        </div>
        <div class="chart-item">
          <ManagementChart :data="managementData" />
        </div>
      </div>

      <!-- 中间区域 -->
      <div class="center-panel">
        <!-- 统计卡片 -->
        <StatsCard :data="statsData" />

        <!-- 地图区域 -->
        <div class="map-area">
          <RegionMap :data="regionData" />
        </div>

        <!-- 房屋面积分布 -->
        <div class="distribution-area">
          <AreaDistributionChart :data="areaDistributionData" />
        </div>
      </div>

      <!-- 右侧区域 -->
      <div class="right-panel">
        <div class="chart-item">
          <UsageChart :data="usageData" />
        </div>
        <div class="chart-item">
          <AreaTypeChart :data="areaTypeData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import ScreenHeader from './components/ScreenHeader.vue'
import StatsCard from './components/StatsCard.vue'
import StaffChart from './components/StaffChart.vue'
import ManagementChart from './components/ManagementChart.vue'
import RegionMap from './components/RegionMap.vue'
import AreaDistributionChart from './components/AreaDistributionChart.vue'
import UsageChart from './components/UsageChart.vue'
import AreaTypeChart from './components/AreaTypeChart.vue'
import { getDataScreenData } from '@/api/module/dataScreen'

const router = useRouter()
const screenRef = ref<HTMLElement>()
const isFullscreen = ref(false)

// 统计数据
const statsData = ref({
  unitCount: 0,
  courtyardCount: 0,
  buildingCount: 0,
  buildingArea: 0,
  landArea: 0,
  staffCount: 0,
  workCount: 0
})

// 编制人数/办公人数数据
const staffData = ref<Array<{ category: string; staffCount: number; workCount: number }>>([])

// 管理范围数据
const managementData = ref<Array<{ category: string; value: number; color: string; color2: string }>>([])

// 地图区域数据
const regionData = ref<Array<{ name: string; value: number }>>([])

// 房屋面积分布数据
const areaDistributionData = ref<Array<{ region: string; area: number }>>([])

// 房屋使用情况数据
const usageData = ref<Array<{ name: string; value: number; color: string }>>([])

// 房屋面积类型数据
const areaTypeData = ref<Array<{ name: string; value: number; color: string }>>([])

// 全屏切换
const toggleFullscreen = async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen()
  } else {
    await document.exitFullscreen()
  }
}

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

// 返回首页工作台
const handleGoBack = () => {
  router.push('/workspace/workbench')
}

// 退出登录
const handleLogout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

// 获取数据
const fetchData = async () => {
  try {
    const { data, code } = await getDataScreenData()
    if (code === 200) {
      statsData.value = data.stats
      staffData.value = data.staffData
      managementData.value = data.managementData
      regionData.value = data.regionData
      areaDistributionData.value = data.areaDistribution
      usageData.value = data.usageData
      areaTypeData.value = data.areaTypeData
    }
  } catch (error) {
    console.error('获取大屏数据失败:', error)
  }
}

onMounted(() => {
  fetchData()
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style lang="scss" scoped>
.data-screen {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/dataScreen/bg-page.png');
  background-size: cover;
  background-position: center;
  background-color: #0a1929;
  @include flex(flex-start, stretch, column);
  overflow: hidden;
}

.screen-content {
  flex: 1;
  @include flex(stretch, stretch);
  padding: 15px 20px  20px;
  gap: 20px;
  min-height: 0;
}

.left-panel {
  width: 20%;
  @include flex(stretch, stretch, column);
  gap: 15px;
}

.center-panel {
  flex: 1;
  @include flex(stretch, stretch, column);
  gap: 15px;
  min-width: 0;
}

.right-panel {
  width: 25%;
  @include flex(stretch, stretch, column);
  gap: 15px;
}

.chart-item {
  flex: 1;
  min-height: 0;
  margin-top: 20px;
}

.map-area {
  flex: 1;
  min-height: 0;
}

.distribution-area {
  height: 280px;
  flex-shrink: 0;
}
</style>
