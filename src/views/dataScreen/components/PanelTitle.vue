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

<style lang="scss" scoped>
.panel-title {
  @include flex(center, center);
  height: 40px;
  background-image: url('@/assets/dashboard/bg-title.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  flex-shrink: 0;
}

.panel-title.absolute {
  position: absolute;
  top: px2rem(-16);
  left: 25px;
  right: 25px;
  z-index: 1;
}

.title-text {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}
</style>
