<template>
  <div class="quick-tools">
    <!-- 左侧Tab菜单 -->
    <div class="tools-tabs">
      <div
        class="tab-item tab-title"
        :class="{ active: activeTab === 'tools' }"
        @click="activeTab = 'tools'"
      >
        常用工具
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'policy' }"
        @click="activeTab = 'policy'"
      >
        政策法规
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'notice' }"
        @click="activeTab = 'notice'"
      >
        通知公告
      </div>
    </div>

    <!-- 右侧内容 -->
    <div class="tools-content">
      <!-- 常用工具Tab内容 -->
      <template v-if="activeTab === 'tools'">
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
      </template>

      <!-- 政策法规Tab内容 -->
      <template v-else-if="activeTab === 'policy'">
        <div class="list-content">
          <div class="list-item" v-for="(item, index) in policyList" :key="index">
            <span class="item-dot"></span>
            <span class="item-title">{{ item.title }}</span>
            <span class="item-date">{{ item.date }}</span>
          </div>
        </div>
      </template>

      <!-- 通知公告Tab内容 -->
      <template v-else-if="activeTab === 'notice'">
        <div class="list-content">
          <div class="list-item" v-for="(item, index) in noticeList" :key="index">
            <span class="item-dot"></span>
            <span class="item-title">{{ item.title }}</span>
            <span class="item-date">{{ item.date }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import calculatorIcon from '@/assets/dashboard/计算器.png'
import manualIcon from '@/assets/dashboard/用户手册.png'
import policyIcon from '@/assets/dashboard/政策法规.png'
import noticeIcon from '@/assets/dashboard/通知公告.png'

const activeTab = ref('tools')

// 政策法规列表
const policyList = ref([
  { title: '党政机关办公用房管理办法', date: '2024-01-15' },
  { title: '办公用房维修管理暂行办法', date: '2024-01-10' },
  { title: '关于规范办公用房使用的通知', date: '2024-01-05' },
])

// 通知公告列表
const noticeList = ref([
  { title: '关于开展办公用房专项清查的通知', date: '2024-01-20' },
  { title: '2024年度办公用房统计工作安排', date: '2024-01-18' },
  { title: '办公用房管理系统升级公告', date: '2024-01-12' },
])

const handleToolClick = (type: string) => {
  console.log('点击工具:', type)
  // TODO: 实现工具跳转逻辑
}
</script>

<style scoped>
.quick-tools {
  background-image: url('@/assets/dashboard/bg-工具.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  display: flex;
}

.tools-tabs {
  width: 100px;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
}

.tab-item {
  color: rgba(255, 255, 255, 0.7);
  font-size: 13px;
  padding: 8px 15px;
  cursor: pointer;
  transition: all 0.3s;
  border-left: 3px solid transparent;
}

.tab-item:hover {
  color: #fff;
}

.tab-item.active {
  color: #1890ff;
  border-left-color: #1890ff;
  background: rgba(24, 144, 255, 0.1);
}

.tab-item.tab-title {
  font-weight: 500;
}

.tools-content {
  flex: 1;
  padding: 15px 20px;
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
  width: 56px;
  height: 56px;
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

.list-content {
  width: 100%;
}

.list-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

.list-item:last-child {
  border-bottom: none;
}

.item-dot {
  width: 6px;
  height: 6px;
  background: #1890ff;
  border-radius: 50%;
  margin-right: 10px;
  flex-shrink: 0;
}

.item-title {
  flex: 1;
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}

.item-title:hover {
  color: #1890ff;
}

.item-date {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
  margin-left: 15px;
  flex-shrink: 0;
}
</style>
