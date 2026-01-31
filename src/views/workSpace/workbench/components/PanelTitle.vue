<template>
  <div class="panel-title" :class="{ compact, absolute, 'no-bg': noBg }">
    <span class="title-text">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  title: string
  compact?: boolean
  absolute?: boolean
  noBg?: boolean
}>(), {
  compact: false,
  absolute: false,
  noBg: false
})
</script>

<style scoped>
.panel-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background-image: url('@/assets/dashboard/bg-title.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

.panel-title.compact {
  height: 28px;
}

.panel-title.absolute {
  position: absolute;
  top: -16px;
  left: 25px;
  right: 25px;
  z-index: 1;
}

.panel-title.no-bg {
  background-image: none;
}

.title-text {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
}

@media screen and (max-width: 1600px) {
  .title-text {
    letter-spacing: 0;
  }
}
</style>
