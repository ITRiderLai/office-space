<template>
  <div class="unit-header" :class="{ 'show-bg': appStore.theme !== 'dark' }">
    <!-- 左侧图片 -->
    <div class="unit-photo">
      <img :src="defaultUnitPhoto" alt="单位照片" @click="handlePreviewPhoto" />
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
          <SvgIcon name="panorama" size="14px" />查看全景照片
        </lay-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { layer } from '@layui/layui-vue'
import { UnitDetail } from '@/api/module/unit'
import { useAppStore } from '@/store/app'
import SvgIcon from '@/components/SvgIcon.vue'
import defaultUnitPhoto from '@/assets/unitCard/unit-photo.png'

const appStore = useAppStore()

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
  border-radius: 4px;
  margin-bottom: 15px;
}

.unit-header.show-bg {
  background-image: url('@/assets/unitCard/unit-header-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
}

.unit-photo {
  flex: 1;
  max-width: 427px;
  height: 240px;
}

.unit-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
}

.unit-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-row {
  display: flex;
  gap: 40px;
}

.info-item {
  flex: 1;
  display: flex;
  align-items: baseline;
  padding: 4px 0;
}

.info-item.full {
  flex: none;
  width: 100%;
}

.info-label {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #777777;
  line-height: 24px;
  white-space: nowrap;
  margin-right: 16px;
}

.info-value {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #202020;
  line-height: 24px;
}

.info-value.highlight {
  color: #1890ff;
  font-weight: bold;
}

.info-actions {
  margin-top: 5px;
}

.info-actions :deep(.layui-btn) {
  height: 36px;
  font-size: 14px;
  padding: 0 16px;
}

.info-actions :deep(.layui-btn .svg-icon) {
  margin-right: 7px;
  transform: translateY(-1px);
}
</style>
