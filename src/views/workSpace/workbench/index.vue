<template>
  <div class="dashboard-wrapper">
    <div class="dashboard-page">
      <!-- 左侧地图区域 -->
      <div class="left-panel">
        <MapPanel />
      </div>

      <!-- 右侧数据面板 -->
      <div class="right-panel">
        <!-- 总体概况 -->
        <OverviewCard :data="overviewData" />

        <!-- 图表区域 -->
        <div class="charts-row">
          <OrgTypeChart :data="orgTypeData" />
          <StaffLevelChart :data="staffLevelData" />
        </div>

        <div class="charts-row">
          <UsageChart :data="usageData" />
          <RoomAreaChart :data="roomAreaData" />
        </div>

        <!-- 常用工具 -->
        <div class="tools-row">
          <QuickTools />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import MapPanel from './components/MapPanel.vue'
import OverviewCard from './components/OverviewCard.vue'
import OrgTypeChart from './components/OrgTypeChart.vue'
import StaffLevelChart from './components/StaffLevelChart.vue'
import UsageChart from './components/UsageChart.vue'
import RoomAreaChart from './components/RoomAreaChart.vue'
import QuickTools from './components/QuickTools.vue'
import { getDashboardData } from '@/api/module/dashboard'

// 总体概况数据
const overviewData = ref({
  unitCount: 0,
  staffCount: 0,
  courtyardCount: 0,
  buildingCount: 0,
  buildingArea: 0,
  landArea: 0
})

// 机构类型数据
const orgTypeData = ref<Array<{ name: string; value: number }>>([])

// 编制人数数据
const staffLevelData = ref<Array<{ level: string; count: number }>>([])

// 使用情况数据
const usageData = ref<Array<{ type: string; value: number }>>([])

// 办公用房面积数据
const roomAreaData = ref<Array<{ type: string; area: number }>>([])

// 获取数据
const fetchData = async () => {
  try {
    const { data, code } = await getDashboardData()
    if (code === 200) {
      overviewData.value = data.overview
      orgTypeData.value = data.orgTypes
      staffLevelData.value = data.staffLevels
      usageData.value = data.usageData
      roomAreaData.value = data.roomAreas
    }
  } catch (error) {
    console.error('获取首页数据失败:', error)
  }
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.dashboard-wrapper {
  height: 100%;
  overflow: hidden;
  background: linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%);
}

.dashboard-page {
  display: flex;
  height: 100%;
  padding: 15px;
  box-sizing: border-box;
  overflow: hidden;
}

.left-panel {
  flex: 1;
  min-width: 0;
}

.right-panel {
  width: 55%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
}

/* 高度小于850px时右侧面板可滚动 */
@media screen and (max-height: 850px) {
  .right-panel {
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* 固定子元素最小高度，使其可以产生溢出 */
  .right-panel .charts-row {
    flex: none;
    height: 200px;
  }

  .right-panel .tools-row {
    flex: none;
    height: 120px;
  }

  /* 自定义滚动条 - 默认透明 */
  .right-panel::-webkit-scrollbar {
    width: 6px;
  }

  .right-panel::-webkit-scrollbar-track {
    background: transparent;
  }

  .right-panel::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 3px;
  }

  /* 鼠标进入时显示滚动条 */
  .right-panel:hover::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
  }

  .right-panel:hover::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.5);
  }
}

.charts-row {
  display: flex;
  gap: 12px;
  flex: 1;
  min-height: 0;
  margin-top: 18px;
}

.charts-row > * {
  flex: 1;
  min-width: 0;
}

.tools-row {
  flex: 1;
  min-height: 0;
  max-height: 156px;
}

.tools-row > * {
  height: 100%;
}
</style>
