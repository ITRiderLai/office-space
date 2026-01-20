<template>
  <div class="step-nav">
    <div
      v-for="(step, index) in steps"
      :key="index"
      class="step-item"
      :class="{ active: index === current }"
    >
      {{ step.title }}
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
  padding: 15px 20px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.step-item:hover {
  background-color: #f5f5f5;
}

.step-item.active {
  background-color: var(--global-checked-color);
  color: #fff;
}
</style>
