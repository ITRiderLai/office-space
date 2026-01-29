<template>
  <svg
    class="svg-icon"
    :class="className"
    :style="{ width: size, height: size, color: color }"
    aria-hidden="true"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: string
  color?: string
  className?: string
}>(), {
  size: '16px',
  color: 'currentColor',
  className: ''
})

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style scoped>
.svg-icon {
  fill: currentColor;
  vertical-align: middle;
  display: inline-block;
}
</style>
