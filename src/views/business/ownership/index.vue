<template>
  <div class="ownership-page">
    <!-- 业务信息栏 -->
    <BusinessHeader :info="businessInfo" />

    <!-- 主体内容 -->
    <div class="ownership-content">
      <!-- 步骤导航 -->
      <StepNav :current="currentStep" :steps="steps" />

      <!-- 表单区域 -->
      <div class="ownership-form-wrapper">
        <ApplicationForm
          ref="formRef"
          :business-type="businessInfo.businessType"
          @save="handleSave"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { layer } from '@layui/layer-vue'
import { getBusinessInit, saveOwnershipApplication } from '@/api/module/business'
import BusinessHeader from './components/BusinessHeader.vue'
import StepNav from './components/StepNav.vue'
import ApplicationForm from './components/ApplicationForm.vue'

// 业务信息
const businessInfo = reactive({
  businessType: '',
  businessNo: '',
  handler: '',
  currentStep: ''
})

// 步骤配置
const currentStep = ref(0)
const steps = [
  { title: '申请信息' }
]

// 表单引用
const formRef = ref()

// 初始化页面
const initPage = async () => {
  try {
    const { data, code } = await getBusinessInit()
    if (code === 200) {
      businessInfo.businessType = data.businessType
      businessInfo.businessNo = data.businessNo
      businessInfo.handler = data.handler
      businessInfo.currentStep = data.currentStep
    }
  } catch (error) {
    console.error('获取业务信息失败:', error)
  }
}

// 保存处理
const handleSave = async (formData: any) => {
  try {
    const { code, msg } = await saveOwnershipApplication(formData)
    if (code === 200) {
      layer.msg(msg, { icon: 1 }, () => {
        // 重新初始化页面
        initPage()
        // 重置表单
        formRef.value?.resetForm()
      })
    } else {
      layer.msg(msg || '保存失败', { icon: 2 })
    }
  } catch (error) {
    layer.msg('保存失败，请稍后重试', { icon: 2 })
  }
}

onMounted(() => {
  initPage()
})
</script>

<style scoped>
.ownership-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.ownership-content {
  flex: 1;
  display: flex;
  padding: 10px;
  gap: 10px;
  overflow: hidden;
}

.ownership-form-wrapper {
  flex: 1;
  background: #fff;
  border-radius: var(--global-border-radius);
  overflow: auto;
}
</style>
