<template>
  <div class="stats-card">
    <div class="stat-item" v-for="item in statItems" :key="item.key">
      <div class="stat-label">{{ item.label }}</div>
      <div class="stat-value">
        <span class="value">{{ formatValue(data[item.key]) }}</span>
        <span class="unit">{{ item.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface StatsData {
  unitCount: number
  courtyardCount: number
  buildingCount: number
  buildingArea: number
  landArea: number
  staffCount: number
  workCount: number
}

defineProps<{
  data: StatsData
}>()

const statItems = [
  { key: 'unitCount', label: '单位总数', unit: '个' },
  { key: 'courtyardCount', label: '院落总数', unit: '个' },
  { key: 'buildingCount', label: '楼宇总数', unit: '幢' },
  { key: 'buildingArea', label: '房屋面积总数', unit: 'm²' },
  { key: 'landArea', label: '土地面积总数', unit: 'm²' },
  { key: 'staffCount', label: '编制人数', unit: '人' },
  { key: 'workCount', label: '办公人数', unit: '人' }
]

const formatValue = (value: number) => {
  if (!value) return '0'
  if (value >= 10000) {
    return value.toLocaleString('zh-CN', { maximumFractionDigits: 2 })
  }
  return value.toLocaleString('zh-CN')
}
</script>

<style scoped>
.stats-card {
  background-image: url('@/assets/dataScreen/bg-数据卡片.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  justify-content: space-around;
  padding: 15px 20px;
  flex-shrink: 0;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
  margin-bottom: 8px;
  position: relative;
  padding-bottom: 8px;
}

.stat-label::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(289deg, rgba(216,216,216,0) 0%, #00D9FC 49.79%, rgba(216,216,216,0) 100%);
}

.stat-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.stat-value .value {
  color: #00d4ff;
  font-size: 20px;
  font-weight: 700;
}

.stat-value .unit {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
}

@media screen and (max-width: 1600px) {
  .stat-value .value {
    font-size: 16px;
  }
}

@media screen and (max-width: 1300px) {
  .stat-value .value {
    font-size: 12px;
  }
}
</style>
