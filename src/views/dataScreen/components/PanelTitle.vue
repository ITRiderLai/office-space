<template>
  <div class="panel-title" :class="{ absolute }">
    <span class="title-text">{{ title }}</span>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  title: string
  absolute?: boolean
}>(), {
  absolute: false
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

.panel-title.absolute {
  position: absolute;
  top: -16px;
  left: 25px;
  right: 25px;
  z-index: 1;
}

.title-text {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 2px;
}

@media screen and (max-width: 1600px) {
  .title-text {
    font-size: 14px;
    letter-spacing: 1px;
  }
}

@media screen and (max-width: 1300px) {
  .title-text {
    font-size: 12px;
    letter-spacing: 0;
  }
}
</style>
