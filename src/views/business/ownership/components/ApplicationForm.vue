<template>
  <div class="application-form">
    <lay-form :model="formData" ref="layFormRef">
      <!-- 首行两列：业务类型 + 办理日期 -->
      <div class="form-row two-columns">
        <lay-form-item label="业务类型" prop="businessType">
          <lay-input v-model="formData.businessType" disabled />
        </lay-form-item>
        <lay-form-item label="办理日期" prop="handleDate" required>
          <lay-date-picker
            v-model="formData.handleDate"
            placeholder="请选择"
            style="width: 100%"
          />
        </lay-form-item>
      </div>

      <!-- 来文标题 -->
      <lay-form-item label="来文标题" prop="documentTitle" required>
        <lay-input v-model="formData.documentTitle" placeholder="请输入" />
      </lay-form-item>

      <!-- 来文文号 -->
      <lay-form-item label="来文文号" prop="documentNumber" required>
        <lay-input v-model="formData.documentNumber" placeholder="请输入" />
      </lay-form-item>

      <!-- 申请单位 -->
      <lay-form-item label="申请单位" prop="applicantUnitId" required>
        <div class="input-with-buttons">
          <lay-input
            v-model="formData.applicantUnitName"
            placeholder="请输入"
            readonly
          />
          <lay-button type="primary" size="sm" @click="openUnitSelector">选择</lay-button>
          <lay-button size="sm" @click="clearUnit">清除</lay-button>
        </div>
      </lay-form-item>

      <!-- 关联楼宇 -->
      <lay-form-item label="关联楼宇" prop="relatedBuildingId">
        <div class="input-with-buttons">
          <lay-input
            v-model="formData.relatedBuildingName"
            placeholder="请输入"
            readonly
          />
          <lay-button type="primary" size="sm" @click="openBuildingSelector">选择</lay-button>
          <lay-button size="sm" @click="clearBuilding">清除</lay-button>
        </div>
      </lay-form-item>

      <!-- 联系人 -->
      <lay-form-item label="联系人" prop="contactPerson">
        <lay-input v-model="formData.contactPerson" placeholder="请输入" />
      </lay-form-item>

      <!-- 主送单位 -->
      <lay-form-item label="主送单位" prop="mainRecipient">
        <lay-input v-model="formData.mainRecipient" placeholder="请输入" />
      </lay-form-item>

      <!-- 来文正文 -->
      <lay-form-item label="来文正文" prop="documentContent">
        <div class="upload-wrapper">
          <lay-upload
            :multiple="false"
            accept=".pdf"
            @done="handleContentUpload"
          >
            <lay-button size="sm">
              <lay-icon type="layui-icon-upload" /> 上传文件
            </lay-button>
          </lay-upload>
          <span class="upload-hint">（上传文件格式为pdf）</span>
          <span v-if="formData.documentContentName" class="upload-filename">
            {{ formData.documentContentName }}
          </span>
        </div>
      </lay-form-item>

      <!-- 来文附件 -->
      <lay-form-item label="来文附件" prop="documentAttachment">
        <div class="upload-wrapper">
          <lay-upload
            :multiple="true"
            accept=".pdf"
            @done="handleAttachmentUpload"
          >
            <lay-button size="sm">
              <lay-icon type="layui-icon-upload" /> 上传文件
            </lay-button>
          </lay-upload>
          <span class="upload-hint">（上传文件格式为pdf）</span>
        </div>
        <!-- 附件列表 -->
        <AttachmentTable :attachments="attachmentList" />
      </lay-form-item>
    </lay-form>

    <!-- 单位选择弹窗 -->
    <lay-layer
      v-model="unitSelectorVisible"
      title="选择申请单位"
      :area="[pxToRem(500), pxToRem(400)]"
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
      :area="[pxToRem(500), pxToRem(400)]"
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
import { ref, reactive } from 'vue'
import { pxToRem } from '@/utils/flexible'
import { getUnitList, getBuildingList } from '@/api/module/business'
import AttachmentTable, { AttachmentFile } from './AttachmentTable.vue'

const props = defineProps<{
  businessType: string
}>()

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
  documentContentName: ''
})

// 附件列表
const attachmentList = ref<AttachmentFile[]>([])

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
  unitSelectorVisible.value = true
  searchUnits()
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

// 清除单位
const clearUnit = () => {
  formData.applicantUnitId = ''
  formData.applicantUnitName = ''
}

// 打开楼宇选择器
const openBuildingSelector = () => {
  buildingKeyword.value = ''
  buildingList.value = []
  buildingSelectorVisible.value = true
  searchBuildings()
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

// 清除楼宇
const clearBuilding = () => {
  formData.relatedBuildingId = ''
  formData.relatedBuildingName = ''
}

// 来文正文上传处理
const handleContentUpload = (result: any) => {
  if (result.file) {
    formData.documentContent = result.file
    formData.documentContentName = result.file.name
  }
}

// 来文附件上传处理
const handleAttachmentUpload = (result: any) => {
  if (result.file) {
    const file = result.file
    const now = new Date()
    const uploadTime = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`

    attachmentList.value.push({
      id: String(Date.now()),
      name: file.name,
      uploadTime: uploadTime,
      size: file.size,
      url: URL.createObjectURL(file)
    })
  }
}

// 获取表单数据
const getFormData = () => {
  return {
    ...formData,
    attachments: attachmentList.value
  }
}

// 验证表单
const validate = (): string | null => {
  if (!formData.handleDate) return '请选择办理日期'
  if (!formData.documentTitle) return '请输入来文标题'
  if (!formData.documentNumber) return '请输入来文文号'
  if (!formData.applicantUnitId) return '请选择申请单位'
  return null
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
  attachmentList.value = []
}

// 暴露方法
defineExpose({
  getFormData,
  validate,
  resetForm
})
</script>

<style lang="scss" scoped>
.application-form {
  padding: 20px;
}

.application-form :deep(.layui-form-item) {
  margin-bottom: 15px;
}

.application-form :deep(.layui-form-label) {
  width: 80px;
  text-align: right;
  font-size: 14px;
}

.application-form :deep(.layui-input input) {
  font-size: 14px;
}

/* 首行两列布局 */
.form-row.two-columns {
  @include flex();
  gap: 40px;
}

.form-row.two-columns :deep(.layui-form-item) {
  flex: 1;
  margin-bottom: 15px;
}

/* 输入框带按钮 */
.input-with-buttons {
  @include flex(flex-start, center);
  gap: 8px;
}

.input-with-buttons :deep(.layui-input-wrapper) {
  flex: 1;
}

.input-with-buttons :deep(.layui-btn+.layui-btn) {
  margin-left: 0;
}

/* 输入框placeholder颜色 */
:deep(.layui-input-wrapper input::placeholder) {
  color: #9199AE;
}

/* 禁用输入框背景色 */
:deep(.layui-input-wrapper.layui-input-disabled) {
  background: #F1F5FA;
}

/* 文件上传 */
.upload-wrapper {
  @include flex(flex-start, center);
  gap: 10px;
  flex-wrap: wrap;
}

.upload-hint {
  color: #999;
  font-size: 12px;
}

.upload-filename {
  color: #1890ff;
  font-size: 14px;
}

/* 选择器弹窗样式 */
.selector-content {
  padding: 15px;
  height: 348px;
  @include flex(flex-start, stretch, column);
  box-sizing: border-box;
}

.selector-list {
  margin-top: 15px;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
}

.selector-item {
  padding: 10px  15px;
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
