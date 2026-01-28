<template>
  <div class="quick-tools">
    <!-- 工具内容 -->
    <div class="tools-content">
      <div class="tool-items">
        <div class="tool-item" @click="handleToolClick('calculator')">
          <div class="tool-icon">
            <img :src="calculatorIcon" alt="面积计算器" />
          </div>
          <div class="tool-name">办公用房面积计算器</div>
        </div>
        <div class="tool-item" @click="handleToolClick('manual')">
          <div class="tool-icon">
            <img :src="manualIcon" alt="用户手册" />
          </div>
          <div class="tool-name">用户手册</div>
        </div>
        <div class="tool-item" @click="handleToolClick('policy')">
          <div class="tool-icon">
            <img :src="policyIcon" alt="政策法规" />
          </div>
          <div class="tool-name">政策法规</div>
        </div>
        <div class="tool-item" @click="handleToolClick('notice')">
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
import calculatorIcon from '@/assets/dashboard/计算器.png'
import manualIcon from '@/assets/dashboard/用户手册.png'
import policyIcon from '@/assets/dashboard/政策法规.png'
import noticeIcon from '@/assets/dashboard/通知公告.png'

const handleToolClick = (type: string) => {
  console.log('点击工具:', type)
  // TODO: 实现工具跳转逻辑
}
</script>

<style scoped>
.quick-tools {
  display: flex;
  height: 100%;
}

.tools-content {
  flex: 1;
  display: flex;
  align-items: center;
}

.tool-items {
  display: flex;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.3s;
}

.tool-item:hover {
  transform: translateY(-3px);
}

.tool-icon {
  width: 72px;
  height: 72px;
  margin-bottom: 8px;
}

.tool-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.tool-name {
  color: #fff;
  font-size: 12px;
  text-align: center;
  white-space: nowrap;
}

/* 高度小于680px时图标缩小 */
@media screen and (max-height: 680px) {
  .tool-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 4px;
  }

  .tool-name {
    font-size: 11px;
  }

  .tool-item {
    padding: 10px 15px;
  }
}
</style>
