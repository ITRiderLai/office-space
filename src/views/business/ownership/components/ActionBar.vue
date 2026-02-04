<template>
  <div class="action-bar">
    <lay-button type="primary" @click="$emit('save')">
      <SvgIcon name="save" :size="pxToRem(14)" />保存
    </lay-button>
    <lay-button @click="$emit('close')">
      <SvgIcon name="close" :size="pxToRem(14)" />关闭
    </lay-button>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'

import { pxToRem } from '@/utils/flexible'

defineEmits(['save', 'close'])
</script>

<style lang="scss" scoped>
.action-bar {
  @include flex();
  gap: 8px;
  padding-bottom: 15px;
  background: #fff;
}

.action-bar :deep(.layui-btn-primary) {
  width: 87px;
  height: 36px;
  line-height: 36px;
  padding: 0;
  background: #0061CE;
  border-radius: 4px;
  border: none;
}

.action-bar :deep(.layui-btn:not(.layui-btn-primary)) {
  width: 87px;
  height: 36px;
  line-height: 34px; // 减去上下各1px的边框
  padding: 0;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #0061CE;
  color: #0061CE;
  margin-left: 0;
}

.action-bar :deep(.layui-btn) {
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.action-bar :deep(.layui-btn .svg-icon) {
  margin-right: 7px;
  transform: translateY(px2rem(-1));
}
</style>
