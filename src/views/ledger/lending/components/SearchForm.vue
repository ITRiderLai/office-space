<template>
  <div class="search-form">
    <lay-form :model="searchForm" size="sm">
      <lay-row :space="16">
        <lay-col :md="6">
          <lay-form-item label="单位名称" label-width="80">
            <lay-input v-model="searchForm.unitName" placeholder="请输入" />
          </lay-form-item>
        </lay-col>
        <lay-col :md="6">
          <lay-form-item label="单位性质" label-width="80">
            <lay-input v-model="searchForm.unitType" placeholder="请输入" />
          </lay-form-item>
        </lay-col>
        <lay-col :md="6">
          <lay-form-item label="产权人" label-width="80">
            <lay-input v-model="searchForm.owner" placeholder="请输入" />
          </lay-form-item>
        </lay-col>
        <lay-col :md="6">
          <lay-form-item label="产权证号" label-width="80">
            <lay-input v-model="searchForm.certNo" placeholder="请输入" />
          </lay-form-item>
        </lay-col>
        <lay-col :md="6">
          <lay-form-item label="承租人" label-width="80">
            <lay-input v-model="searchForm.tenant" placeholder="请输入" />
          </lay-form-item>
        </lay-col>
        <lay-col :md="6">
          <lay-form-item label="性质" label-width="80">
            <lay-select v-model="searchForm.nature" placeholder="请选择" allow-clear>
              <lay-select-option
                v-for="item in natureOptions"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </lay-select>
          </lay-form-item>
        </lay-col>
        <lay-col :md="6">
          <lay-form-item label="合同编号" label-width="80">
            <lay-input v-model="searchForm.contractNo" placeholder="请输入" />
          </lay-form-item>
        </lay-col>
        <lay-col :md="6">
          <lay-form-item label-width="80" class="search-btns">
            <lay-button type="primary" @click="handleSearch">
              <lay-icon type="layui-icon-search" /> 搜索
            </lay-button>
            <lay-button @click="handleReset">
              <lay-icon type="layui-icon-refresh" /> 重置
            </lay-button>
          </lay-form-item>
        </lay-col>
      </lay-row>
    </lay-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { getNatureOptions } from '@/api/module/ledger'

const emit = defineEmits(['search', 'reset'])

const searchForm = reactive({
  unitName: '',
  unitType: '',
  owner: '',
  certNo: '',
  tenant: '',
  nature: '',
  contractNo: ''
})

const natureOptions = ref<{ value: string; label: string }[]>([])

// 获取性质下拉选项
const loadNatureOptions = async () => {
  try {
    const { data, code } = await getNatureOptions()
    if (code === 200) {
      natureOptions.value = data
    }
  } catch (error) {
    console.error('获取性质选项失败:', error)
  }
}

// 搜索
const handleSearch = () => {
  emit('search', { ...searchForm })
}

// 重置
const handleReset = () => {
  searchForm.unitName = ''
  searchForm.unitType = ''
  searchForm.owner = ''
  searchForm.certNo = ''
  searchForm.tenant = ''
  searchForm.nature = ''
  searchForm.contractNo = ''
  emit('reset')
}

onMounted(() => {
  loadNatureOptions()
})
</script>

<style scoped>
.search-form {
  padding: 10px;
  background: #EBF3FB;
}

.search-form :deep(.layui-form-item) {
  margin-bottom: 8px;
  flex-wrap: nowrap;
}

.search-form :deep(.layui-form-label) {
  width: 80px;
  min-width: 80px;
  flex-shrink: 0;
}

.search-form :deep(.search-btns) {
  padding-left: 30px;
}

.search-form :deep(.layui-form-label) {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #202020;
}

.search-form :deep(.layui-input),
.search-form :deep(.layui-select) {
  font-size: 16px;
}

.search-form :deep(.layui-input),
.search-form :deep(.layui-select) {
  height: 34px;
}

.search-form :deep(.layui-select.has-clear) {
  width: 100%;
}
</style>
