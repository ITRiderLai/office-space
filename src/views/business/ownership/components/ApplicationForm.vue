<template>
  <div class="application-form">
    <lay-form :model="formData" ref="layFormRef" :rules="rules">
      <!-- 业务类型 -->
      <lay-form-item label="业务类型" prop="businessType">
        <lay-input v-model="formData.businessType" disabled />
      </lay-form-item>

      <!-- 办理日期 -->
      <lay-form-item label="办理日期" prop="handleDate" required>
        <lay-date-picker
          v-model="formData.handleDate"
          placeholder="yyyy-MM-dd"
          style="width: 100%"
        />
      </lay-form-item>

      <!-- 来文标题 -->
      <lay-form-item label="来文标题" prop="documentTitle" required>
        <lay-input v-model="formData.documentTitle" placeholder="请输入来文标题" />
      </lay-form-item>

      <!-- 来文文号 -->
      <lay-form-item label="来文文号" prop="documentNumber" required>
        <lay-input v-model="formData.documentNumber" placeholder="请输入来文文号" />
      </lay-form-item>

      <!-- 申请单位 -->
      <lay-form-item label="申请单位" prop="applicantUnitId" required>
        <lay-input
          v-model="formData.applicantUnitName"
          placeholder="请选择申请单位"
          readonly
          @click="openUnitSelector"
        >
          <template #suffix>
            <lay-icon type="layui-icon-search" style="cursor: pointer" @click="openUnitSelector" />
          </template>
        </lay-input>
      </lay-form-item>

      <!-- 关联楼宇 -->
      <lay-form-item label="关联楼宇" prop="relatedBuildingId">
        <lay-input
          v-model="formData.relatedBuildingName"
          placeholder="请选择关联楼宇"
          readonly
          @click="openBuildingSelector"
        >
          <template #suffix>
            <lay-icon type="layui-icon-search" style="cursor: pointer" @click="openBuildingSelector" />
          </template>
        </lay-input>
      </lay-form-item>

      <!-- 联系人 -->
      <lay-form-item label="联系人" prop="contactPerson">
        <lay-input v-model="formData.contactPerson" placeholder="请输入联系人" />
      </lay-form-item>

      <!-- 主送单位 -->
      <lay-form-item label="主送单位" prop="mainRecipient">
        <lay-input v-model="formData.mainRecipient" placeholder="请输入主送单位" />
      </lay-form-item>

      <!-- 来文正文 -->
      <lay-form-item label="来文正文" prop="documentContent">
        <lay-upload
          :multiple="false"
          @done="handleContentUpload"
        >
          <template #preview>
            <span v-if="formData.documentContentName">{{ formData.documentContentName }}</span>
          </template>
        </lay-upload>
      </lay-form-item>

      <!-- 来文附件 -->
      <lay-form-item label="来文附件" prop="documentAttachment">
        <lay-upload
          :multiple="false"
          @done="handleAttachmentUpload"
        >
          <template #preview>
            <span v-if="formData.documentAttachmentName">{{ formData.documentAttachmentName }}</span>
          </template>
        </lay-upload>
      </lay-form-item>

      <!-- 保存按钮 -->
      <lay-form-item>
        <div class="form-actions">
          <lay-button type="primary" @click="handleSubmit">
            <lay-icon type="layui-icon-ok" /> 保存
          </lay-button>
        </div>
      </lay-form-item>
    </lay-form>

    <!-- 单位选择弹窗 -->
    <lay-layer
      v-model="unitSelectorVisible"
      title="选择申请单位"
      :area="['500px', '400px']"
    >
      <div class="selector-content">
        <lay-input
          v-model="unitKeyword"
          placeholder="请输入单位名称或编码搜索"
          @input="searchUnits"
        >
          <template #suffix>
            <lay-icon type="layui-icon-search" />
          </template>
        </lay-input>
        <div class="selector-list">
          <div v-if="unitLoading" class="selector-loading">
            <lay-icon type="layui-icon-loading-one" class="loading-icon" /> 加载中...
          </div>
          <template v-else>
            <div
              v-for="unit in unitList"
              :key="unit.id"
              class="selector-item"
              @click="selectUnit(unit)"
            >
              <div class="item-name">{{ unit.name }}</div>
              <div class="item-info">{{ unit.code }} | {{ unit.contact }}</div>
            </div>
            <div v-if="unitList.length === 0" class="selector-empty">
              暂无数据
            </div>
          </template>
        </div>
      </div>
    </lay-layer>

    <!-- 楼宇选择弹窗 -->
    <lay-layer
      v-model="buildingSelectorVisible"
      title="选择关联楼宇"
      :area="['500px', '400px']"
    >
      <div class="selector-content">
        <lay-input
          v-model="buildingKeyword"
          placeholder="请输入楼宇名称或地址搜索"
          @input="searchBuildings"
        >
          <template #suffix>
            <lay-icon type="layui-icon-search" />
          </template>
        </lay-input>
        <div class="selector-list">
          <div v-if="buildingLoading" class="selector-loading">
            <lay-icon type="layui-icon-loading-one" class="loading-icon" /> 加载中...
          </div>
          <template v-else>
            <div
              v-for="building in buildingList"
              :key="building.id"
              class="selector-item"
              @click="selectBuilding(building)"
            >
              <div class="item-name">{{ building.name }}</div>
              <div class="item-info">{{ building.address }}</div>
            </div>
            <div v-if="buildingList.length === 0" class="selector-empty">
              暂无数据
            </div>
          </template>
        </div>
      </div>
    </lay-layer>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'
import { getUnitList, getBuildingList } from '@/api/module/business'

const props = defineProps<{
  businessType: string
}>()

const emit = defineEmits(['save'])

// 表单数据
const formData = reactive({
  businessType: '权属管理',
  handleDate: '',
  documentTitle: '',
  documentNumber: '',
  applicantUnitId: '',
  applicantUnitName: '',
  relatedBuildingId: '',
  relatedBuildingName: '',
  contactPerson: '',
  mainRecipient: '',
  documentContent: null as File | null,
  documentContentName: '',
  documentAttachment: null as File | null,
  documentAttachmentName: ''
})

// 表单验证规则
const rules = {
  handleDate: [{ required: true, message: '请选择办理日期' }],
  documentTitle: [{ required: true, message: '请输入来文标题' }],
  documentNumber: [{ required: true, message: '请输入来文文号' }],
  applicantUnitId: [{ required: true, message: '请选择申请单位' }]
}

const layFormRef = ref()

// 单位选择器
const unitSelectorVisible = ref(false)
const unitKeyword = ref('')
const unitList = ref<any[]>([])
const unitLoading = ref(false)

// 楼宇选择器
const buildingSelectorVisible = ref(false)
const buildingKeyword = ref('')
const buildingList = ref<any[]>([])
const buildingLoading = ref(false)

// 打开单位选择器
const openUnitSelector = () => {
  unitKeyword.value = ''
  unitList.value = []
  unitSelectorVisible.value = true  // 先显示弹窗
  searchUnits()  // 再加载数据
}

// 搜索单位
const searchUnits = async () => {
  unitLoading.value = true
  try {
    const { data, code } = await getUnitList({ keyword: unitKeyword.value })
    if (code === 200) {
      unitList.value = data
    }
  } catch (error) {
    console.error('搜索单位失败:', error)
  } finally {
    unitLoading.value = false
  }
}

// 选择单位
const selectUnit = (unit: any) => {
  formData.applicantUnitId = unit.id
  formData.applicantUnitName = unit.name
  formData.contactPerson = unit.contact || ''
  unitSelectorVisible.value = false
}

// 打开楼宇选择器
const openBuildingSelector = () => {
  buildingKeyword.value = ''
  buildingList.value = []
  buildingSelectorVisible.value = true  // 先显示弹窗
  searchBuildings()  // 再加载数据
}

// 搜索楼宇
const searchBuildings = async () => {
  buildingLoading.value = true
  try {
    const { data, code } = await getBuildingList({
      keyword: buildingKeyword.value,
      unitId: formData.applicantUnitId
    })
    if (code === 200) {
      buildingList.value = data
    }
  } catch (error) {
    console.error('搜索楼宇失败:', error)
  } finally {
    buildingLoading.value = false
  }
}

// 选择楼宇
const selectBuilding = (building: any) => {
  formData.relatedBuildingId = building.id
  formData.relatedBuildingName = building.name
  buildingSelectorVisible.value = false
}

// 文件上传处理
const handleContentUpload = (result: any) => {
  if (result.file) {
    formData.documentContent = result.file
    formData.documentContentName = result.file.name
  }
}

const handleAttachmentUpload = (result: any) => {
  if (result.file) {
    formData.documentAttachment = result.file
    formData.documentAttachmentName = result.file.name
  }
}

// 提交表单
const handleSubmit = async () => {
  // 手动验证必填项
  if (!formData.handleDate) {
    return alert('请选择办理日期')
  }
  if (!formData.documentTitle) {
    return alert('请输入来文标题')
  }
  if (!formData.documentNumber) {
    return alert('请输入来文文号')
  }
  if (!formData.applicantUnitId) {
    return alert('请选择申请单位')
  }

  emit('save', { ...formData })
}

// 重置表单
const resetForm = () => {
  formData.handleDate = ''
  formData.documentTitle = ''
  formData.documentNumber = ''
  formData.applicantUnitId = ''
  formData.applicantUnitName = ''
  formData.relatedBuildingId = ''
  formData.relatedBuildingName = ''
  formData.contactPerson = ''
  formData.mainRecipient = ''
  formData.documentContent = null
  formData.documentContentName = ''
  formData.documentAttachment = null
  formData.documentAttachmentName = ''
}

// 暴露方法
defineExpose({
  resetForm
})
</script>

<style scoped>
.application-form {
  padding: 20px 40px;
  max-width: 800px;
  margin: 0 auto;
}

.application-form :deep(.layui-form-item) {
  margin-bottom: 15px;
}

.application-form :deep(.layui-form-label) {
  width: 100px;
  text-align: right;
}

.application-form :deep(.layui-input-block) {
  margin-left: 120px;
  max-width: 500px;
}

.form-actions {
  margin-left: 120px;
  padding-top: 10px;
}

/* 选择器弹窗样式 */
.selector-content {
  padding: 15px;
}

.selector-list {
  margin-top: 15px;
  max-height: 265px;
  overflow-y: auto;
}

.selector-item {
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s;
}

.selector-item:hover {
  background-color: #f5f5f5;
}

.selector-item .item-name {
  font-size: 14px;
  color: #333;
}

.selector-item .item-info {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}

.selector-empty {
  text-align: center;
  padding: 40px 0;
  color: #999;
}

.selector-loading {
  text-align: center;
  padding: 40px 0;
  color: #666;
}

.selector-loading .loading-icon {
  animation: rotating 1s linear infinite;
  margin-right: 5px;
}

@keyframes rotating {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
