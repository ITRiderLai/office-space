<template>
  <div class="overview-card">
    <PanelTitle title="总 体 概 况" compact noBg />
    <div class="overview-content">
      <div class="overview-item">
        <div class="item-icon">
          <img :src="iconUnit" alt="单位数" />
        </div>
        <div class="item-info">
          <div class="item-value">{{ data.unitCount }}</div>
          <div class="item-label">单位数（个）</div>
        </div>
      </div>

      <div class="overview-item">
        <div class="item-icon">
          <img :src="iconStaff" alt="编制人数" />
        </div>
        <div class="item-info">
          <div class="item-value">{{ data.staffCount }}</div>
          <div class="item-label">编制人数（人）</div>
        </div>
      </div>

      <div class="overview-item">
        <div class="item-icon">
          <img :src="iconCourtyard" alt="院落" />
        </div>
        <div class="item-info">
          <div class="item-value">{{ data.courtyardCount }}/{{ data.buildingCount }}</div>
          <div class="item-label">院落/楼宇（个）</div>
        </div>
      </div>

      <div class="overview-item">
        <div class="item-icon">
          <img :src="iconArea" alt="办公用房面积" />
        </div>
        <div class="item-info">
          <div class="item-value">{{ data.buildingArea }}</div>
          <div class="item-label">办公用房楼宇<br/>面积（万㎡）</div>
        </div>
      </div>

      <div class="overview-item">
        <div class="item-icon">
          <img :src="iconLand" alt="土地面积" />
        </div>
        <div class="item-info">
          <div class="item-value">{{ data.landArea }}</div>
          <div class="item-label">土地面积（万㎡）</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import PanelTitle from './PanelTitle.vue'
import iconUnit from '@/assets/dashboard/图标-单位数.png'
import iconStaff from '@/assets/dashboard/图标-编制人数.png'
import iconCourtyard from '@/assets/dashboard/图标-院落.png'
import iconArea from '@/assets/dashboard/图标-办公用房楼宇面积.png'
import iconLand from '@/assets/dashboard/图标-土地面积.png'

interface OverviewData {
  unitCount: number
  staffCount: number
  courtyardCount: number
  buildingCount: number
  buildingArea: number
  landArea: number
}

defineProps<{
  data: OverviewData
}>()
</script>

<style scoped>
.overview-card {
  background-image: url('@/assets/dashboard/bg-总体概况.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  padding-bottom: 15px;
}

.overview-content {
  display: flex;
  justify-content: space-around;
  padding: 10px 20px;
}

.overview-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.item-icon {
  width: 60px;
  height: 60px;
  flex-shrink: 0;
}

.item-icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.item-info {
  text-align: left;
}

.item-value {
  font-family: DINPro, DINPro;
  font-weight: 500;
  font-size: 22px;
  color: #FFFFFF;
}

.item-label {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #FFFFFF;
  line-height: 20px;
}

@media screen and (max-width: 1600px) {
  .item-icon {
    width: 40px;
    height: 40px;
  }

  .item-value {
    font-size: 18px;
  }

  .item-label {
    font-size: 12px;
  }
}
</style>
