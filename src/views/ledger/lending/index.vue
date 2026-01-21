<template>
  <div class="lending-ledger">
    <!-- 操作按钮区 -->
    <div class="action-bar">
      <lay-button type="primary" @click="handleAdd">
        <lay-icon type="layui-icon-add-1" /> 新增
      </lay-button>
      <lay-button type="normal" :disabled="selectedRows.length !== 1" @click="handleEdit">
        <lay-icon type="layui-icon-edit" /> 编辑
      </lay-button>
      <lay-button type="danger" :disabled="selectedRows.length === 0" @click="handleDelete">
        <lay-icon type="layui-icon-delete" /> 删除
      </lay-button>
      <lay-button @click="handleExport">
        <lay-icon type="layui-icon-export" /> 导出
      </lay-button>
    </div>

    <!-- 搜索筛选区 -->
    <SearchForm @search="handleSearch" @reset="handleReset" />

    <!-- 数据表格区 -->
    <div class="table-container">
      <lay-table
        id="id"
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        v-model:selected-keys="selectedKeys"
        :default-toolbar="false"
        :resize="true"
        @row-double="handleRowDouble"
      >
        <template #unitName="{ row }">
          {{ row.unitName }}
        </template>
        <template #violation="{ row }">
          <lay-tag :type="row.violation === '是' ? 'danger' : 'success'">
            {{ row.violation }}
          </lay-tag>
        </template>
      </lay-table>
    </div>

    <!-- 分页区 -->
    <div class="pagination-container">
      <div class="pagination-info">
        共 {{ pagination.total }} 条数据，此页显示{{ paginationRange }}条数据
      </div>
      <lay-page
        v-model="pagination.page"
        :limit="pagination.pageSize"
        :total="pagination.total"
        :show-page="true"
        :show-limit="true"
        :limits="[10, 20, 50, 100]"
        @change="handlePageChange"
        @limit="handleLimitChange"
      />
    </div>

    <!-- 编辑弹窗 -->
    <EditModal
      v-model="editModalVisible"
      :edit-data="currentEditData"
      @success="handleEditSuccess"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { layer } from '@layui/layui-vue'
import SearchForm from './components/SearchForm.vue'
import EditModal from './components/EditModal.vue'
import { getLendingList, deleteLending, LendingRecord, LendingQueryParams } from '@/api/module/ledger'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

// 表格列配置
const columns = [
  { type: 'checkbox', width: '50px', fixed: 'left' },
  { title: '单位名称', key: 'unitName', width: '120px', sort: true },
  { title: '填报单位', key: 'reportUnitId', width: '200px', sort: true },
  { title: '单位性质', key: 'unitType', width: '100px' },
  { title: '楼宇', key: 'building', width: '80px' },
  { title: '出租房产地址', key: 'address', width: '220px' },
  { title: '产权人', key: 'owner', width: '80px' },
  { title: '产权证号', key: 'certNo', width: '120px' },
  { title: '出租面积', key: 'rentArea', width: '100px' },
  { title: '承租人', key: 'tenant', width: '80px' },
  { title: '租赁开始时间', key: 'startDate', width: '120px' },
  { title: '租赁结束时间', key: 'endDate', width: '120px' },
  { title: '批准部门', key: 'approvalDept', width: '140px' },
  { title: '是否违规', key: 'violation', width: '90px', customSlot: 'violation' },
  { title: '违规类型', key: 'violationType', width: '100px' },
  { title: '整改措施', key: 'rectifyMeasure', width: '150px' },
  { title: '整改中存在的突出问题', key: 'existingIssue', width: '180px' },
  { title: '整改后情况', key: 'rectifyStatus', width: '120px' }
]

// 表格数据
const tableData = ref<LendingRecord[]>([])
const loading = ref(false)
const selectedKeys = ref<string[]>([])

// 分页
const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 搜索参数
const searchParams = reactive<Partial<LendingQueryParams>>({})

// 计算选中的行数据
const selectedRows = computed(() => {
  return tableData.value.filter(item => selectedKeys.value.includes(item.id!))
})

// 计算分页显示范围
const paginationRange = computed(() => {
  if (pagination.total === 0) return '0'
  const start = (pagination.page - 1) * pagination.pageSize + 1
  const end = Math.min(pagination.page * pagination.pageSize, pagination.total)
  return `${start.toString().padStart(2, '0')}-${end.toString().padStart(2, '0')}`
})

// 编辑弹窗
const editModalVisible = ref(false)
const currentEditData = ref<LendingRecord | null>(null)

// 加载数据
const loadData = async () => {
  loading.value = true
  try {
    const params: LendingQueryParams = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchParams
    }
    const { data, code } = await getLendingList(params)
    if (code === 200) {
      tableData.value = data.list || []
      pagination.total = data.total || 0
    }
  } catch (error) {
    console.error('加载数据失败:', error)
  } finally {
    loading.value = false
  }
}

// 搜索
const handleSearch = (params: Partial<LendingQueryParams>) => {
  Object.assign(searchParams, params)
  pagination.page = 1
  loadData()
}

// 重置
const handleReset = () => {
  Object.keys(searchParams).forEach(key => {
    delete searchParams[key as keyof typeof searchParams]
  })
  pagination.page = 1
  loadData()
}

// 分页变化
const handlePageChange = (page: number) => {
  pagination.page = page
  loadData()
}

// 每页条数变化
const handleLimitChange = (limit: number) => {
  pagination.pageSize = limit
  pagination.page = 1
  loadData()
}

// 新增
const handleAdd = () => {
  currentEditData.value = null
  editModalVisible.value = true
}

// 编辑
const handleEdit = () => {
  if (selectedRows.value.length !== 1) {
    layer.msg('请选择一条数据进行编辑', { icon: 0 })
    return
  }
  currentEditData.value = { ...selectedRows.value[0] }
  editModalVisible.value = true
}

// 双击行进入编辑
const handleRowDouble = (row: LendingRecord) => {
  currentEditData.value = { ...row }
  editModalVisible.value = true
}

// 删除
const handleDelete = async () => {
  if (selectedRows.value.length === 0) {
    layer.msg('请选择要删除的数据', { icon: 0 })
    return
  }

  layer.confirm(
    `确定要删除选中的 ${selectedRows.value.length} 条数据吗？`,
    {
      icon: 3,
      title: '确认删除',
      yes: async (layerId: string) => {
        try {
          const ids = selectedRows.value.map(item => item.id!)
          const { code, msg } = await deleteLending(ids)
          if (code === 200) {
            layer.msg(msg || '删除成功', { icon: 1 })
            selectedKeys.value = []
            loadData()
          } else {
            layer.msg(msg || '删除失败', { icon: 2 })
          }
        } catch (error) {
          layer.msg('删除失败', { icon: 2 })
        }
        layer.close(layerId)
      }
    }
  )
}

// 导出Excel
const handleExport = async () => {
  // 优先导出已选行，无已选行则导出全部数据
  if (selectedRows.value.length > 0) {
    exportToExcel(selectedRows.value)
    return
  }

  // 获取所有数据（不分页）
  loading.value = true
  try {
    const params: LendingQueryParams = {
      page: 1,
      pageSize: 99999,
      ...searchParams
    }
    const { data, code } = await getLendingList(params)
    if (code === 200) {
      const list = data.list || []
      if (list.length === 0) {
        layer.msg('没有可导出的数据', { icon: 0 })
        return
      }
      exportToExcel(list)
    }
  } catch (error) {
    layer.msg('导出失败', { icon: 2 })
  } finally {
    loading.value = false
  }
}

// 导出Excel实现
const exportToExcel = (data: LendingRecord[]) => {
  // 定义表头映射
  const headers: Record<string, string> = {
    unitName: '单位名称',
    reportUnitId: '填报单位',
    unitType: '单位性质',
    building: '楼宇',
    address: '出租房产地址',
    owner: '产权人',
    certNo: '产权证号',
    rentArea: '出租面积',
    tenant: '承租人',
    startDate: '租赁开始时间',
    endDate: '租赁结束时间',
    approvalDept: '批准部门',
    violation: '是否违规',
    violationType: '违规类型',
    rectifyMeasure: '整改措施',
    existingIssue: '整改中存在的突出问题',
    rectifyStatus: '整改后情况'
  }

  // 转换数据格式
  const exportData = data.map(item => {
    const row: Record<string, any> = {}
    Object.keys(headers).forEach(key => {
      row[headers[key]] = item[key as keyof LendingRecord] ?? ''
    })
    return row
  })

  // 创建工作簿
  const worksheet = XLSX.utils.json_to_sheet(exportData)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, '出借台账')

  // 设置列宽
  const colWidths = Object.values(headers).map(h => ({ wch: Math.max(h.length * 2, 15) }))
  worksheet['!cols'] = colWidths

  // 导出文件
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
  const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const filename = `出借台账_${new Date().toLocaleDateString().replace(/\//g, '-')}.xlsx`
  saveAs(blob, filename)

  layer.msg('导出成功', { icon: 1 })
}

// 编辑成功回调
const handleEditSuccess = () => {
  selectedKeys.value = []
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.lending-ledger {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.action-bar {
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px;
  background: #fff;
  gap: 10px;
}

.table-container {
  flex: 1;
  padding: 0 20px;
  background: #fff;
  margin-top: 10px;
  overflow: hidden;
}

.table-container :deep(.layui-table-box) {
  height: 100%;
}

.pagination-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #fff;
  margin-top: 10px;
}

.pagination-info {
  font-size: 14px;
  color: #666;
}
</style>
