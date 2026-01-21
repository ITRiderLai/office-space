<template>
  <div class="unit-card-page">
    <!-- 左侧目录树区域 -->
    <div class="tree-panel" :class="{ collapsed: treeCollapsed }">
      <OrgTree
        v-if="!treeCollapsed"
        :tree-data="treeData"
        :loading="treeLoading"
        :selected-id="selectedUnitId"
        @select="handleSelectUnit"
        @refresh="loadTreeData"
        @toggle-collapse="toggleTreePanel"
      />
      <div class="expand-btn" v-if="treeCollapsed" @click="toggleTreePanel">
        <lay-icon type="layui-icon-spread-left" />
      </div>
    </div>

    <!-- 右侧详情区域 -->
    <div class="detail-panel">
      <lay-scroll height="100%">
        <div class="detail-content" v-if="unitDetail">
          <!-- 基本信息卡片 -->
          <UnitHeader :unit-detail="unitDetail" />

          <!-- 人员编制区块 -->
          <StaffEstablishment
            :data="unitDetail.staffEstablishment"
            @open-calculation="handleOpenCalculation"
          />

          <!-- 实有人数区块 -->
          <ActualStaff :data="unitDetail.actualStaff" />

          <!-- 办公室使用面积区块 -->
          <OfficeArea title="办公室使用面积" />

          <!-- 办公室使用面积（房屋实有人数）区块 -->
          <OfficeArea
            title="办公室使用面积（房屋实有人数）"
            :data="unitDetail.officeAreaByStaff"
          />
        </div>
        <div class="detail-empty" v-else>
          <lay-empty description="请从左侧目录选择单位" />
        </div>
      </lay-scroll>
    </div>

    <!-- 面积核算表弹窗 -->
    <AreaCalculationModal
      v-model="calculationModalVisible"
      :unit-id="selectedUnitId"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import OrgTree from './components/OrgTree.vue'
import UnitHeader from './components/UnitHeader.vue'
import StaffEstablishment from './components/StaffEstablishment.vue'
import ActualStaff from './components/ActualStaff.vue'
import OfficeArea from './components/OfficeArea.vue'
import AreaCalculationModal from './components/AreaCalculationModal.vue'
import { getOrgTree, getUnitDetail, OrgTreeNode, UnitDetail } from '@/api/module/unit'

// 目录树相关
const treeData = ref<OrgTreeNode[]>([])
const treeLoading = ref(false)
const treeCollapsed = ref(false)
const selectedUnitId = ref('')

// 单位详情
const unitDetail = ref<UnitDetail | null>(null)

// 面积核算表弹窗
const calculationModalVisible = ref(false)

// 加载目录树数据
const loadTreeData = async (keyword?: string) => {
  treeLoading.value = true
  try {
    const { data, code } = await getOrgTree(keyword)
    if (code === 200) {
      treeData.value = data || []
    }
  } catch (error) {
    console.error('加载目录树失败:', error)
  } finally {
    treeLoading.value = false
  }
}

// 选择单位
const handleSelectUnit = async (node: OrgTreeNode) => {
  if (node.type !== 'unit') return
  selectedUnitId.value = node.id
  await loadUnitDetail(node.id)
}

// 加载单位详情
const loadUnitDetail = async (id: string) => {
  try {
    const { data, code } = await getUnitDetail(id)
    if (code === 200) {
      unitDetail.value = data
    }
  } catch (error) {
    console.error('加载单位详情失败:', error)
  }
}

// 切换目录树面板
const toggleTreePanel = () => {
  treeCollapsed.value = !treeCollapsed.value
}

// 打开面积核算表
const handleOpenCalculation = () => {
  calculationModalVisible.value = true
}

onMounted(() => {
  loadTreeData()
})
</script>

<style scoped>
.unit-card-page {
  height: 100%;
  display: flex;
  background: #f5f5f5;
}

.tree-panel {
  width: 320px;
  min-width: 320px;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: width 0.3s, min-width 0.3s;
}

.tree-panel.collapsed {
  width: 40px;
  min-width: 40px;
}

.expand-btn {
  width: 100%;
  padding-top: 15px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  background: #fff;
}

.expand-btn:hover {
  background: #f5f5f5;
}

.expand-btn .layui-icon {
  font-size: 18px;
  color: #666;
}

.detail-panel {
  flex: 1;
  padding: 15px;
  overflow: hidden;
}

.detail-content {
  padding-right: 10px;
}

.detail-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
