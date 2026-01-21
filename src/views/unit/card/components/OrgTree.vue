<template>
  <div class="org-tree">
    <!-- 头部 -->
    <div class="tree-header">
      <span class="tree-title">目录</span>
      <lay-icon
        type="layui-icon-shrink-right"
        class="tree-toggle-icon"
        @click="$emit('toggle-collapse')"
      />
    </div>

    <!-- 搜索框 -->
    <div class="tree-search">
      <lay-input
        v-model="searchKeyword"
        placeholder="请输入"
        :allow-clear="true"
        @input="handleSearch"
      >
        <template #suffix>
          <lay-icon type="layui-icon-search" />
        </template>
      </lay-input>
    </div>

    <!-- 刷新按钮 -->
    <div class="tree-actions">
      <lay-button size="sm" @click="handleRefresh">刷新</lay-button>
    </div>

    <!-- 树形结构 -->
    <div class="tree-content">
      <lay-tree
        v-if="treeData.length > 0"
        :data="treeNodes"
        :showCheckbox="false"
        :showLine="false"
        :default-expand-all="false"
        v-model:expandKeys="expandKeys"
        v-model:selectedKey="selectedKey"
        @node-click="handleNodeClick"
      />
      <lay-empty v-else-if="!loading" description="暂无数据" />
      <div v-if="loading" class="tree-loading">
        <lay-icon type="layui-icon-loading" class="layui-anim layui-anim-rotate layui-anim-loop" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { OrgTreeNode } from '@/api/module/unit'

interface Props {
  treeData: OrgTreeNode[]
  loading?: boolean
  selectedId?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  selectedId: ''
})

const emit = defineEmits(['select', 'refresh', 'collapse'])

const searchKeyword = ref('')
const expandKeys = ref<string[]>([])
const selectedKey = ref('')

// 转换为lay-tree需要的数据格式
const convertToTreeNodes = (nodes: OrgTreeNode[]): any[] => {
  return nodes.map(node => ({
    id: node.id,
    title: node.name,
    field: node.type,
    children: node.children ? convertToTreeNodes(node.children) : []
  }))
}

const treeNodes = computed(() => convertToTreeNodes(props.treeData))

// 监听selectedId变化
watch(() => props.selectedId, (newVal) => {
  if (newVal) {
    selectedKey.value = newVal
  }
})

// 搜索
let searchTimer: ReturnType<typeof setTimeout> | null = null
const handleSearch = () => {
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    emit('refresh', searchKeyword.value)
  }, 300)
}

// 刷新
const handleRefresh = () => {
  searchKeyword.value = ''
  emit('refresh', '')
}

// 节点点击
const handleNodeClick = (node: any) => {
  // 找到原始节点数据
  const findNode = (nodes: OrgTreeNode[], id: string): OrgTreeNode | null => {
    for (const n of nodes) {
      if (n.id === id) return n
      if (n.children) {
        const found = findNode(n.children, id)
        if (found) return found
      }
    }
    return null
  }

  const originalNode = findNode(props.treeData, node.id)
  if (originalNode) {
    emit('select', originalNode)
  }
}
</script>

<style scoped>
.org-tree {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  border-bottom: 1px solid #e8e8e8;
}

.tree-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.tree-toggle-icon {
  cursor: pointer;
  font-size: 18px;
  color: #666;
}

.tree-toggle-icon:hover {
  color: #1890ff;
}

.tree-search {
  padding: 10px 15px;
}

.tree-actions {
  padding: 0 15px 10px;
  display: flex;
  justify-content: flex-end;
}

.tree-content {
  flex: 1;
  overflow: auto;
  padding: 0 5px;
}

.tree-loading {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.tree-loading .layui-icon {
  font-size: 24px;
  color: #1890ff;
}

/* 树节点样式 */
.org-tree :deep(.layui-tree-entry) {
  padding: 5px 10px;
  border-radius: 4px;
  margin: 2px 0;
}

.org-tree :deep(.layui-tree-entry:hover) {
  background: transparent;
}

.org-tree :deep(.layui-tree-entry.layui-this) {
  background: transparent;
}

.org-tree :deep(.layui-tree-entry.layui-this .layui-tree-txt) {
  color: #1890ff;
  font-weight: bold;
}

.org-tree :deep(.layui-tree-txt) {
  font-size: 14px;
}

/* 隐藏树的虚线 */
.org-tree :deep(.layui-tree-line) {
  display: none;
}

.org-tree :deep(.layui-tree-iconClick) {
  margin-right: 5px;
}
</style>
