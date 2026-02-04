<template>
  <div class="courtyard-edit-page">
    <!-- 左侧目录树区域 -->
    <div
      class="tree-panel"
      :class="{ collapsed: treeCollapsed, dragging: isDragging }"
      :style="treePanelStyle"
    >
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
      <!-- 右侧边框拖拽区 -->
      <div
        v-if="!treeCollapsed"
        class="tree-edge-resize"
        @mousedown.prevent="startDrag"
      />
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
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import OrgTree from '@/views/unit/card/components/OrgTree.vue'
import FloorInfo from './components/FloorInfo.vue'
import FloorRooms from './components/FloorRooms.vue'
import { getCourtyardTree, CourtyardTreeNode } from '@/api/module/courtyard'

const TREE_WIDTH_MIN = 240
const TREE_WIDTH_MAX = 560
const TREE_WIDTH_DEFAULT = 300

// 目录树相关
const treeData = ref<CourtyardTreeNode[]>([])
const treeLoading = ref(false)
const treeCollapsed = ref(false)
const treeWidth = ref(TREE_WIDTH_DEFAULT)
const selectedNodeId = ref('')
const defaultExpandKeys = ref<string[]>([])

const isDragging = ref(false)
let dragStartX = 0
let dragStartWidth = 0

const treePanelStyle = computed(() => {
  if (treeCollapsed.value) {
    return { width: '40px', minWidth: '40px' }
  }
  const w = Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, treeWidth.value))
  return { width: `${w}px`, minWidth: `${w}px` }
})

const startDrag = (e: MouseEvent) => {
  isDragging.value = true
  dragStartX = e.clientX
  dragStartWidth = treeWidth.value
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
  document.body.style.cursor = 'col-resize'
  document.body.style.userSelect = 'none'
}

const onDrag = (e: MouseEvent) => {
  const delta = e.clientX - dragStartX
  treeWidth.value = Math.min(TREE_WIDTH_MAX, Math.max(TREE_WIDTH_MIN, dragStartWidth + delta))
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.body.style.cursor = ''
  document.body.style.userSelect = ''
}

onUnmounted(() => {
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
})

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

<style lang="scss" scoped>
.courtyard-edit-page {
  height: 100%;
  @include flex();
  padding: 16px;
  background: #fff;
}

.tree-panel {
  background: #fff;
  @include flex(flex-start, stretch, column);
  position: relative;
  transition: width 0.2s, min-width 0.2s;
  border: 1px solid #E9E9E9;
  flex-shrink: 0;
}

.tree-panel.dragging {
  transition: none;
}

.tree-panel.collapsed {
  width: 40px;
  min-width: 40px;
}

.tree-edge-resize {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 6px;
  cursor: col-resize;
  z-index: 1;
}

.expand-btn {
  width: 100%;
  padding-top: 15px;
  @include flex(center);
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
  @include flex(flex-start, stretch, column);
  padding-left: 16px;
  overflow: hidden;
}

.content-panel :deep(.layui-tab) {
  height: 100%;
  @include flex(flex-start, stretch, column);
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
