<template>
  <div class="quick-tools">
    <!-- 工具内容 -->
    <div class="tools-content">
      <div class="tool-items">
        <div
          class="tool-item"
          :class="{ active: activeTool === 'calculator' }"
          @click="handleToolClick('calculator')"
        >
          <div class="tool-icon">
            <img :src="calculatorIcon" alt="面积计算器" />
          </div>
          <div class="tool-name">办公用房面积计算器</div>
        </div>
        <div
          class="tool-item"
          :class="{ active: activeTool === 'manual' }"
          @click="handleToolClick('manual')"
        >
          <div class="tool-icon">
            <img :src="manualIcon" alt="用户手册" />
          </div>
          <div class="tool-name">用户手册</div>
        </div>
        <div
          class="tool-item"
          :class="{ active: activeTool === 'policy' }"
          @click="handleToolClick('policy')"
        >
          <div class="tool-icon">
            <img :src="policyIcon" alt="政策法规" />
          </div>
          <div class="tool-name">政策法规</div>
        </div>
        <div
          class="tool-item"
          :class="{ active: activeTool === 'notice' }"
          @click="handleToolClick('notice')"
        >
          <div class="tool-icon">
            <img :src="noticeIcon" alt="通知公告" />
          </div>
          <div class="tool-name">通知公告</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import calculatorIcon from '@/assets/dashboard/计算器.png'
import manualIcon from '@/assets/dashboard/用户手册.png'
import policyIcon from '@/assets/dashboard/政策法规.png'
import noticeIcon from '@/assets/dashboard/通知公告.png'
import toolsActiveBg from '@/assets/dashboard/bg-tools-active.png'

// 当前激活的工具
const activeTool = ref('')

// 预加载高亮背景图
onMounted(() => {
  const img = new Image()
  img.src = toolsActiveBg
})

const handleToolClick = (type: string) => {
  activeTool.value = type
  console.log('点击工具:', type)
  // TODO: 实现工具跳转逻辑
}
</script>

<style lang="scss" scoped>
.quick-tools {
  display: flex;
  height: 100%;
}

.tools-content {
  flex: 1;
  @include flex(flex-start, center);
}

.tool-items {
  @include flex();
  gap: 20px;
  width: 100%;
  height: 100%;
}

.tool-item {
  flex: 1;
  height: 100%;
  background-image: url('@/assets/dashboard/bg-工具项.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 15px 25px;
  box-sizing: border-box;
  @include flex(center, center, column);
  cursor: pointer;
  transition: transform 0.3s;
}

.tool-item:hover {
  transform: translateY(px2rem(-3));
}

.tool-item.active {
  background-image: url('@/assets/dashboard/bg-tools-active.png');
}

.tool-icon {
  width: 80px;
  height: 80px;
}

.tool-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tool-name {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 22px;
  text-align: center;
  white-space: nowrap;
}
</style>
