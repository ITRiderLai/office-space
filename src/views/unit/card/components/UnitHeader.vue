<template>
  <div class="unit-header">
    <!-- 左侧图片 -->
    <div class="unit-photo">
      <img :src="unitDetail.panoramaPhoto" alt="单位照片" @click="handlePreviewPhoto" />
    </div>

    <!-- 右侧信息 -->
    <div class="unit-info">
      <div class="info-row">
        <div class="info-item">
          <span class="info-label">单位名称：</span>
          <span class="info-value">{{ unitDetail.unitName }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">单位级别：</span>
          <span class="info-value">{{ unitDetail.unitLevel }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-item">
          <span class="info-label">编制人数：</span>
          <span class="info-value">{{ unitDetail.establishedCount }} 人</span>
        </div>
        <div class="info-item">
          <span class="info-label">实有人数：</span>
          <span class="info-value">{{ unitDetail.actualCount }} 人</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-item">
          <span class="info-label">分管领导：</span>
          <span class="info-value">{{ unitDetail.supervisor }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">单位法人：</span>
          <span class="info-value">{{ unitDetail.legalPerson }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-item">
          <span class="info-label">移动电话：</span>
          <span class="info-value">{{ unitDetail.mobilePhone }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">办公电话：</span>
          <span class="info-value">{{ unitDetail.officePhone }}</span>
        </div>
      </div>
      <div class="info-row">
        <div class="info-item full">
          <span class="info-label">办公地址：</span>
          <span class="info-value">{{ unitDetail.officeAddress }}</span>
        </div>
      </div>
      <div class="info-actions">
        <lay-button size="sm" type="primary" @click="handlePreviewPhoto">
          <lay-icon type="layui-icon-picture" /> 查看全景照片
        </lay-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { layer } from '@layui/layui-vue'
import { UnitDetail } from '@/api/module/unit'

interface Props {
  unitDetail: UnitDetail
}

const props = defineProps<Props>()

// 预览照片
const handlePreviewPhoto = () => {
  if (props.unitDetail.panoramaPhoto) {
    layer.photos({
      imgList: [{ src: props.unitDetail.panoramaPhoto, alt: props.unitDetail.unitName }],
      startIndex: 0
    })
  }
}
</script>

<style scoped>
.unit-header {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #fff;
  background-image: url('@/assets/unitCard/unit-header-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 4px;
  margin-bottom: 15px;
}

.unit-photo {
  flex-shrink: 0;
}

.unit-photo img {
  width: 427px;
  height: 240px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
}

.unit-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  gap: 40px;
}

.info-item {
  flex: 1;
  display: flex;
  align-items: baseline;
}

.info-item.full {
  flex: none;
  width: 100%;
}

.info-label {
  color: #666;
  font-size: 14px;
  white-space: nowrap;
}

.info-value {
  color: #333;
  font-size: 14px;
}

.info-value.highlight {
  color: #1890ff;
  font-weight: bold;
}

.info-actions {
  margin-top: 5px;
}
</style>
