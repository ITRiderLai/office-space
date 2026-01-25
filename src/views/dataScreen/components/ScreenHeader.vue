<template>
  <div class="screen-header">
    <!-- 左侧日期时间 -->
    <div class="header-left">
      <span class="datetime">{{ currentDateTime }}</span>
    </div>

    <!-- 中间标题 -->
    <div class="header-center">
      <h1 class="main-title">红河哈尼彝族自治州党政机关办公用房</h1>
    </div>

    <!-- 右侧用户信息 -->
    <div class="header-right">
      <div class="user-info">
        <lay-icon type="layui-icon-username" />
        <span class="username">张小凡</span>
      </div>
      <div class="header-btn" @click="$emit('toggle-fullscreen')">
        <lay-icon :type="isFullscreen ? 'layui-icon-screen-restore' : 'layui-icon-screen-full'" />
        <span>{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
      </div>
      <div class="header-btn" @click="$emit('go-back')">
        <lay-icon type="layui-icon-return" />
        <span>返回</span>
      </div>
      <div class="header-btn" @click="$emit('logout')">
        <lay-icon type="layui-icon-logout" />
        <span>退出</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'

defineProps<{
  isFullscreen: boolean
}>()

defineEmits<{
  'toggle-fullscreen': []
  'go-back': []
  'logout': []
}>()

const currentDateTime = ref('')

const updateDateTime = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const weekDay = weekDays[now.getDay()]
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  currentDateTime.value = `${year}年${month}月${day}日 ${weekDay} ${hours}:${minutes}:${seconds}`
}

let timer: number

onMounted(() => {
  updateDateTime()
  timer = window.setInterval(updateDateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.screen-header {
  height: 80px;
  background-image: url('@/assets/dataScreen/bg-大标题.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  flex-shrink: 0;
}

.header-left {
  flex: 1;
}

.datetime {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.header-center {
  flex: 2;
  text-align: center;
}

.main-title {
  color: #fff;
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 4px;
  margin: 0;
  background: linear-gradient(180deg, #fff 0%, #00d4ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
}

.username {
  color: #fff;
}

.header-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.header-btn:hover {
  color: #00d4ff;
}
</style>
