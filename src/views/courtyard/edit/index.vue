<template>
  <div class="courtyard-edit-page">
    <!-- 左侧目录树区域 -->
    <div class="tree-panel" :class="{ collapsed: treeCollapsed }">
      <OrgTree
        v-if="!treeCollapsed"
        :tree-data="treeData"
        :loading="treeLoading"
        :selected-id="selectedNodeId"
        @select="handleSelectNode"
        @refresh="loadTreeData"
        @toggle-collapse="toggleTreePanel"
      />
      <div class="expand-btn" v-if="treeCollapsed" @click="toggleTreePanel">
        <lay-icon type="layui-icon-spread-left" />
      </div>
    </div>

    <!-- 右侧内容区域 -->
    <div class="content-panel">
      <!-- 标签页 -->
      <lay-tab v-model="activeTab" type="brief">
        <lay-tab-item title="楼层图纸" id="floorPlan">
          <div class="floor-plan-placeholder">
            <!-- 后续集成私服组件 -->
          </div>
        </lay-tab-item>
        <lay-tab-item title="楼层信息" id="floorInfo">
          <FloorInfo :floor-id="selectedFloorId" />
        </lay-tab-item>
        <lay-tab-item title="楼层房屋" id="floorRooms">
          <FloorRooms :floor-id="selectedFloorId" />
        </lay-tab-item>
      </lay-tab>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'
import OrgTree from '@/views/unit/card/components/OrgTree.vue'
import FloorInfo from './components/FloorInfo.vue'
import FloorRooms from './components/FloorRooms.vue'
import { getCourtyardTree, CourtyardTreeNode } from '@/api/module/courtyard'

// 目录树相关
const treeData = ref<CourtyardTreeNode[]>([])
const treeLoading = ref(false)
const treeCollapsed = ref(false)
const selectedNodeId = ref('')

// 当前选中的楼层ID
const selectedFloorId = computed(() => {
  return selectedNodeId.value
})

// 标签页
const activeTab = ref('floorPlan')

// 加载目录树数据
const loadTreeData = async (keyword?: string) => {
  treeLoading.value = true
  try {
    const { data, code } = await getCourtyardTree(keyword)
    if (code === 200) {
      treeData.value = data || []
    }
  } catch (error) {
    console.error('加载目录树失败:', error)
  } finally {
    treeLoading.value = false
  }
}

// 选择节点
const handleSelectNode = (node: CourtyardTreeNode) => {
  selectedNodeId.value = node.id
}

// 切换目录树面板
const toggleTreePanel = () => {
  treeCollapsed.value = !treeCollapsed.value
}

onMounted(() => {
  loadTreeData()
})
</script>

<style scoped>
.courtyard-edit-page {
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

.content-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  overflow: hidden;
}

.content-panel :deep(.layui-tab) {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: var(--global-border-radius);
  margin: 0;
}

.content-panel :deep(.layui-tab-head) {
  padding: 0 20px;
  border-bottom: 1px solid #e8e8e8;
}

.content-panel :deep(.layui-tab-title li) {
  padding: 0 20px;
  font-size: 14px;
}

.content-panel :deep(.layui-tab-content) {
  flex: 1;
  overflow: hidden;
  padding: 10px;
}

.content-panel :deep(.layui-tab-item) {
  height: 100%;
  overflow: auto;
}

/* 楼层图纸占位容器 */
.floor-plan-placeholder {
  height: 100%;
  border: 1px dashed #d9d9d9;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
