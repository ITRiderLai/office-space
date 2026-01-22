<template>
  <div class="step-nav">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step-item"
      :class="{ active: index === current }"
    >
      <span class="step-bar"></span>
      <span class="step-title">{{ step.title }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Step {
  title: string
}

defineProps<{
  current: number
  steps: Step[]
}>()
</script>

<style scoped>
.step-nav {
  width: 140px;
  background: #fff;
  border-radius: var(--global-border-radius);
  overflow: hidden;
}

.step-item {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.step-item:hover {
  background-color: #f5f5f5;
}

.step-bar {
  display: none;
  width: 3px;
  height: 16px;
  background: #1890ff;
  margin-right: 10px;
}

.step-item.active {
  color: #1890ff;
  font-weight: bold;
  background-color: transparent;
}

.step-item.active .step-bar {
  display: block;
}

.step-title {
  flex: 1;
}
</style>
