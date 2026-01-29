<template>
  <div class="action-bar">
    <lay-button type="primary" @click="$emit('save')">
      <SvgIcon name="save" size="14px" /> 保存
    </lay-button>
    <lay-button @click="$emit('close')">
      <SvgIcon name="close" size="14px" /> 关闭
    </lay-button>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'

defineEmits(['save', 'close'])
</script>

<style scoped>
.action-bar {
  display: flex;
  gap: 8px;
  padding-bottom: 15px;
  background: #fff;
}

.action-bar :deep(.layui-btn-primary) {
  width: 87px;
  height: 36px;
  background: #0061CE;
  border-radius: 4px;
  border: none;
}

.action-bar :deep(.layui-btn:not(.layui-btn-primary)) {
  width: 87px;
  height: 36px;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #0061CE;
  color: #0061CE;
  margin-left: 0;
}

.action-bar :deep(.layui-btn .svg-icon) {
  margin-right: 4px;
  transform: translateY(-1px);
}
</style>
