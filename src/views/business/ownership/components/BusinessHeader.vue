<template>
  <div class="business-header">
    <div class="header-item">
      <span class="label">业务类型：</span>
      <span class="value">{{ info.businessType }}</span>
    </div>
    <div class="header-item">
      <span class="label">业务编号：</span>
      <span class="value">{{ info.businessNo }}</span>
    </div>
    <div class="header-item">
      <span class="label">受理人员：</span>
      <span class="value">{{ info.handler }}</span>
    </div>
    <div class="header-item">
      <span class="label">当前环节：</span>
      <span class="value">{{ info.currentStep }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface BusinessInfo {
  businessType: string
  businessNo: string
  handler: string
  currentStep: string
}

defineProps<{
  info: BusinessInfo
}>()
</script>

<style scoped>
.business-header {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background-color: #EBF3FB;
  border-bottom: 1px solid #e6e6e6;
}

.header-item {
  margin-right: 40px;
  font-size: 14px;
}

.header-item .label {
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  color: #404A6F;
  line-height: 22px;
}

.header-item .value {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  color: #202020;
  line-height: 22px;
}
</style>
