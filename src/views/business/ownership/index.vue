<template>
  <div class="ownership-page">
    <!-- 顶部操作栏 -->
    <ActionBar @save="handleSave" @close="handleClose" />

    <!-- 业务信息栏 -->
    <BusinessHeader :info="businessInfo" />

    <!-- 主体内容 -->
    <div class="ownership-content">
      <!-- 步骤导航 -->
      <StepNav :current="currentStep" :steps="steps" />

      <!-- 表单区域 -->
      <div class="ownership-form-wrapper">
        <lay-scroll height="100%">
          <ApplicationForm
            ref="formRef"
            :business-type="businessInfo.businessType"
          />
        </lay-scroll>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { layer } from '@layui/layui-vue'
import { getBusinessInit, saveOwnershipApplication } from '@/api/module/business'
import ActionBar from './components/ActionBar.vue'
import BusinessHeader from './components/BusinessHeader.vue'
import StepNav from './components/StepNav.vue'
import ApplicationForm from './components/ApplicationForm.vue'

const router = useRouter()

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
  { title: '申请信息' },
  { title: '其他目录' },
  { title: '其他目录' }
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
const handleSave = async () => {
  // 验证表单
  const error = formRef.value?.validate()
  if (error) {
    layer.msg(error, { icon: 0 })
    return
  }

  // 获取表单数据
  const formData = formRef.value?.getFormData()

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

// 关闭处理
const handleClose = () => {
  // 关闭当前标签页，返回上一页
  router.back()
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
  background-color: #fff;
  padding: 16px;
}

.ownership-content {
  flex: 1;
  display: flex;
  gap: 10px;
  margin-top: 8px;
  border: 1px solid #E9E9E9;
  overflow: hidden;
}

.ownership-form-wrapper {
  flex: 1;
  background: #fff;
  border-radius: var(--global-border-radius);
  overflow: hidden;
}
</style>
