<template>
  <lay-layer
    v-model="visible"
    :title="isEdit ? '编辑出借记录' : '新增出借记录'"
    :area="['800px', '600px']"
    :shadeClose="false"
  >
    <div class="edit-modal-content">
      <lay-form :model="formData" ref="formRef" :rules="rules">
        <!-- 基本信息 -->
        <div class="form-section">
          <div class="section-title">基本信息</div>
          <lay-row :space="16">
            <lay-col :md="12">
              <lay-form-item label="单位名称" prop="unitName" required label-width="100">
                <lay-input v-model="formData.unitName" placeholder="请输入单位名称" />
              </lay-form-item>
            </lay-col>
            <lay-col :md="12">
              <lay-form-item label="填报单位" prop="reportUnitId" required label-width="100">
                <lay-input v-model="formData.reportUnitId" placeholder="请输入填报单位" />
              </lay-form-item>
            </lay-col>
            <lay-col :md="12">
              <lay-form-item label="单位性质" prop="unitType" label-width="100">
                <lay-input v-model="formData.unitType" placeholder="请输入单位性质" />
              </lay-form-item>
            </lay-col>
            <lay-col :md="12">
              <lay-form-item label="楼宇" prop="building" label-width="100">
                <lay-input v-model="formData.building" placeholder="请输入楼宇" />
              </lay-form-item>
            </lay-col>
            <lay-col :md="24">
              <lay-form-item label="出租房产地址" prop="address" label-width="100">
                <lay-input v-model="formData.address" placeholder="请输入出租房产地址" />
              </lay-form-item>
            </lay-col>
          </lay-row>
        </div>

        <!-- 产权信息 -->
        <div class="form-section">
          <div class="section-title">产权信息</div>
          <lay-row :space="16">
            <lay-col :md="12">
              <lay-form-item label="产权人" prop="owner" label-width="100">
                <lay-input v-model="formData.owner" placeholder="请输入产权人" />
              </lay-form-item>
            </lay-col>
            <lay-col :md="12">
              <lay-form-item label="产权证号" prop="certNo" label-width="100">
                <lay-input v-model="formData.certNo" placeholder="请输入产权证号" />
              </lay-form-item>
            </lay-col>
            <lay-col :md="24">
              <lay-form-item label="出租面积(㎡)" prop="rentArea" label-width="100">
                <lay-input v-model.number="formData.rentArea" placeholder="请输入出租面积" />
              </lay-form-item>
            </lay-col>
          </lay-row>
        </div>

        <!-- 租赁信息 -->
        <div class="form-section">
          <div class="section-title">租赁信息</div>
          <lay-row :space="16">
            <lay-col :md="12">
              <lay-form-item label="承租人" prop="tenant" label-width="100">
                <lay-input v-model="formData.tenant" placeholder="请输入承租人" />
              </lay-form-item>
            </lay-col>
            <lay-col :md="12">
              <lay-form-item label="批准部门" prop="approvalDept" label-width="100">
                <lay-input v-model="formData.approvalDept" placeholder="请输入批准部门" />
              </lay-form-item>
            </lay-col>
            <lay-col :md="12">
              <lay-form-item label="租赁开始时间" prop="startDate" label-width="100">
                <lay-date-picker
                  v-model="formData.startDate"
                  placeholder="请选择"
                  style="width: 100%"
                />
              </lay-form-item>
            </lay-col>
            <lay-col :md="12">
              <lay-form-item label="租赁结束时间" prop="endDate" label-width="100">
                <lay-date-picker
                  v-model="formData.endDate"
                  placeholder="请选择"
                  style="width: 100%"
                />
              </lay-form-item>
            </lay-col>
          </lay-row>
        </div>

        <!-- 违规整改 -->
        <div class="form-section">
          <div class="section-title">违规整改</div>
          <lay-row :space="16">
            <lay-col :md="12">
              <lay-form-item label="是否违规" prop="violation" label-width="100">
                <lay-select v-model="formData.violation" placeholder="请选择">
                  <lay-select-option value="是" label="是" />
                  <lay-select-option value="否" label="否" />
                </lay-select>
              </lay-form-item>
            </lay-col>
            <lay-col :md="12" v-if="formData.violation === '是'">
              <lay-form-item label="违规类型" prop="violationType" label-width="100">
                <lay-input v-model="formData.violationType" placeholder="请输入违规类型" />
              </lay-form-item>
            </lay-col>
          </lay-row>
          <template v-if="formData.violation === '是'">
            <lay-row :space="16">
              <lay-col :md="24">
                <lay-form-item label="整改措施" prop="rectifyMeasure" label-width="100">
                  <lay-textarea
                    v-model="formData.rectifyMeasure"
                    placeholder="请输入整改措施"
                    :rows="3"
                  />
                </lay-form-item>
              </lay-col>
            </lay-row>
            <lay-row :space="16">
              <lay-col :md="24">
                <lay-form-item label="存在的问题" prop="existingIssue" label-width="100">
                  <lay-textarea
                    v-model="formData.existingIssue"
                    placeholder="请输入整改中存在的突出问题"
                    :rows="3"
                  />
                </lay-form-item>
              </lay-col>
            </lay-row>
            <lay-row :space="16">
              <lay-col :md="24">
                <lay-form-item label="整改后情况" prop="rectifyStatus" label-width="100">
                  <lay-textarea
                    v-model="formData.rectifyStatus"
                    placeholder="请输入整改后情况"
                    :rows="3"
                  />
                </lay-form-item>
              </lay-col>
            </lay-row>
          </template>
        </div>
      </lay-form>
    </div>
    <template #footer>
      <div class="modal-footer">
        <lay-button @click="handleCancel">取消</lay-button>
        <lay-button type="primary" @click="handleConfirm" :loading="loading">确定</lay-button>
      </div>
    </template>
  </lay-layer>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, computed } from 'vue'
import { saveLending, LendingRecord } from '@/api/module/ledger'
import { layer } from '@layui/layui-vue'

const props = defineProps<{
  modelValue: boolean
  editData?: LendingRecord | null
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const isEdit = computed(() => !!props.editData?.id)

const loading = ref(false)
const formRef = ref()

const initialFormData = (): LendingRecord => ({
  unitName: '',
  reportUnitId: '',
  unitType: '',
  building: '',
  address: '',
  owner: '',
  certNo: '',
  rentArea: 0,
  tenant: '',
  startDate: '',
  endDate: '',
  approvalDept: '',
  violation: '否',
  violationType: '',
  rectifyMeasure: '',
  existingIssue: '',
  rectifyStatus: ''
})

const formData = reactive<LendingRecord>(initialFormData())

const rules = {
  unitName: [{ required: true, message: '请输入单位名称' }],
  reportUnitId: [{ required: true, message: '请输入填报单位' }]
}

// 监听editData变化，回填数据
watch(() => props.editData, (newVal) => {
  if (newVal) {
    Object.assign(formData, newVal)
  } else {
    Object.assign(formData, initialFormData())
  }
}, { immediate: true })

// 监听弹窗关闭，重置表单
watch(visible, (val) => {
  if (!val) {
    Object.assign(formData, initialFormData())
  }
})

// 取消
const handleCancel = () => {
  visible.value = false
}

// 确定
const handleConfirm = async () => {
  // 简单验证
  if (!formData.unitName) {
    layer.msg('请输入单位名称', { icon: 2 })
    return
  }
  if (!formData.reportUnitId) {
    layer.msg('请输入填报单位', { icon: 2 })
    return
  }

  loading.value = true
  try {
    const { code, msg } = await saveLending(formData)
    if (code === 200) {
      layer.msg(msg || '保存成功', { icon: 1 })
      visible.value = false
      emit('success')
    } else {
      layer.msg(msg || '保存失败', { icon: 2 })
    }
  } catch (error) {
    layer.msg('保存失败', { icon: 2 })
  } finally {
    loading.value = false
  }
}
</script>

<style lang="scss" scoped>
.edit-modal-content {
  padding: 20px;
  max-height: 480px;
  overflow-y: auto;
}

.form-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  padding-bottom: 10px;
  margin-bottom: 15px;
  border-bottom: 1px solid #e6e6e6;
}

.form-section :deep(.layui-form-item) {
  margin-bottom: 15px;
  flex-wrap: nowrap;
}

.form-section :deep(.layui-form-label) {
  width: 100px;
  min-width: 100px;
  flex-shrink: 0;
}

.form-section :deep(.layui-form-label),
.form-section :deep(.layui-input),
.form-section :deep(.layui-select),
.form-section :deep(.layui-textarea) {
  font-size: 16px;
}

.modal-footer {
  @include flex(flex-end);
  gap: 10px;
  padding: 0 20px 20px 0;
}
</style>
