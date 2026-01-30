<template>
  <div class="courtyard-edit-page">
    <!-- 左侧目录树区域 -->
    <div class="tree-panel" :class="{ collapsed: treeCollapsed }">
      <OrgTree
        v-if="!treeCollapsed"
        :tree-data="treeData"
        :loading="treeLoading"
        :selected-id="selectedNodeId"
        :default-expand-keys="defaultExpandKeys"
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
import { ref, computed, onMounted, nextTick } from 'vue'
import OrgTree from '@/views/unit/card/components/OrgTree.vue'
import FloorInfo from './components/FloorInfo.vue'
import FloorRooms from './components/FloorRooms.vue'
import { getCourtyardTree, CourtyardTreeNode } from '@/api/module/courtyard'

// 目录树相关
const treeData = ref<CourtyardTreeNode[]>([])
const treeLoading = ref(false)
const treeCollapsed = ref(false)
const selectedNodeId = ref('')
const defaultExpandKeys = ref<string[]>([])

// 当前选中的楼层ID
const selectedFloorId = computed(() => {
  return selectedNodeId.value
})

// 标签页
const activeTab = ref('floorPlan')

// 查找第一个楼层节点及其父节点路径
const findFirstFloorNodeWithPath = (nodes: CourtyardTreeNode[], path: string[] = []): { node: CourtyardTreeNode | null, path: string[] } => {
  for (const node of nodes) {
    if (node.type === 'floor') {
      return { node, path }
    }
    if (node.children && node.children.length > 0) {
      const result = findFirstFloorNodeWithPath(node.children, [...path, node.id])
      if (result.node) return result
    }
  }
  return { node: null, path: [] }
}

// 加载目录树数据
const loadTreeData = async (keyword?: string, autoSelectFirst = false) => {
  treeLoading.value = true
  try {
    const { data, code } = await getCourtyardTree(keyword)
    if (code === 200) {
      treeData.value = data || []
      // 自动选中第一项
      if (autoSelectFirst && treeData.value.length > 0) {
        const { node: firstFloor, path } = findFirstFloorNodeWithPath(treeData.value)
        if (firstFloor) {
          defaultExpandKeys.value = path
          await nextTick()
          handleSelectNode(firstFloor)
        }
      }
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
  loadTreeData('', true)
})
</script>

<style scoped>
.courtyard-edit-page {
  height: 100%;
  display: flex;
  padding: 24px;
  background: #fff;
}

.tree-panel {
  width: 320px;
  min-width: 320px;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: width 0.3s, min-width 0.3s;
  border: 1px solid #E9E9E9;
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
  padding-left: 16px;
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
  padding: 0;
  border-bottom: 1px solid #e8e8e8;
}

.content-panel :deep(.layui-tab-title li) {
  padding: 0 20px;
  font-size: 14px;
}

.content-panel :deep(.layui-tab-title .layui-this) {
  background-color: transparent !important;
  border-bottom: none !important;
  font-weight: bold;
}

.content-panel :deep(.layui-tab-content) {
  flex: 1;
  overflow: hidden;
  padding: 10px 0 0;
}

.content-panel :deep(.layui-tab-item) {
  height: 100%;
  overflow: auto;
}

/* 楼层图纸占位容器 */
.floor-plan-placeholder {
  height: 100%;
  border: 1px solid #E9E9E9;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
