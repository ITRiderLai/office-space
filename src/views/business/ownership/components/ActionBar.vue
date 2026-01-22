<template>
  <div class="action-bar">
    <lay-button type="primary" @click="$emit('save')">
      <lay-icon type="layui-icon-ok" /> 保存
    </lay-button>
    <lay-button @click="$emit('close')">
      <lay-icon type="layui-icon-close" /> 关闭
    </lay-button>
  </div>
</template>

<script lang="ts" setup>
defineEmits(['save', 'close'])
</script>

<style scoped>
.action-bar {
  display: flex;
  gap: 10px;
  padding: 15px 20px;
  background: #fff;
}
</style>
