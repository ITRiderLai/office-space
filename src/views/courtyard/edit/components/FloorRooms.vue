<template>
  <div class="floor-rooms">
    <div class="rooms-content" v-if="floorId">
      <!-- 表格 -->
      <lay-table
        id="id"
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :default-toolbar="false"
        height="100%"
      />

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <lay-page
          v-model="pagination.page"
          v-model:limit="pagination.pageSize"
          :total="pagination.total"
          :show-page="true"
          :show-limit="true"
          :limits="[10, 20, 50, 100]"
          @change="handlePageChange"
          @limit="handleLimitChange"
        />
      </div>
    </div>

    <lay-empty v-else description="请从左侧目录选择楼层" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { getFloorRooms, RoomItem } from '@/api/module/courtyard'

const props = defineProps<{
  floorId: string
}>()

// 表格列配置
const columns = [
  { title: '房间号', key: 'roomNumber', width: '100px' },
  { title: '房间名称', key: 'name', width: '150px' },
  { title: '建筑面积(m²)', key: 'buildingArea', width: '120px' },
  { title: '使用面积(m²)', key: 'usableArea', width: '120px' },
  { title: '使用类型', key: 'useType', width: '120px' },
  { title: '使用单位', key: 'useUnit', width: '150px' },
  { title: '使用人', key: 'user', width: '100px' },
  { title: '状态', key: 'status', width: '100px' }
]

// 表格数据
const tableData = ref<RoomItem[]>([])
const loading = ref(false)

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 加载数据
const loadData = async () => {
  if (!props.floorId) {
    tableData.value = []
    return
  }

  loading.value = true
  try {
    const { data, code } = await getFloorRooms({
      floorId: props.floorId,
      page: pagination.page,
      pageSize: pagination.pageSize
    })
    if (code === 200) {
      tableData.value = data.list || []
      pagination.total = data.total || 0
    }
  } catch (error) {
    console.error('加载房屋列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 页码变化
const handlePageChange = () => {
  loadData()
}

// 每页条数变化
const handleLimitChange = () => {
  pagination.page = 1
  loadData()
}

// 监听楼层ID变化
watch(() => props.floorId, () => {
  pagination.page = 1
  loadData()
}, { immediate: true })
</script>

<style scoped>
.floor-rooms {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.rooms-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.floor-rooms :deep(.layui-table) {
  flex: 1;
  overflow: hidden;
}

.floor-rooms :deep(.layui-table-box) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.floor-rooms :deep(.layui-table-body) {
  flex: 1;
  overflow-y: auto;
}

.pagination-wrapper {
  padding: 15px 20px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e8e8e8;
}

.floor-rooms :deep(.layui-empty) {
  padding-top: 100px;
}
</style>
