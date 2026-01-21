<template>
  <div class="card-section">
    <div class="section-header">
      <div class="section-title">
        <span class="title-bar"></span>
        人员编制（单位按照编制人数）
      </div>
      <lay-button size="sm" type="primary" @click="$emit('open-calculation')">
        <lay-icon type="layui-icon-table" /> 面积核算表
      </lay-button>
    </div>
    <div class="section-content">
      <div class="staff-grid">
        <div class="staff-item">
          <span class="staff-label">正省级</span>
          <span class="staff-value">{{ data.provincialLevel }}</span>
        </div>
        <div class="staff-item">
          <span class="staff-label">副省级</span>
          <span class="staff-value">{{ data.deputyProvincialLevel }}</span>
        </div>
        <div class="staff-item">
          <span class="staff-label">正厅级</span>
          <span class="staff-value">{{ data.departmentLevel }}</span>
        </div>
        <div class="staff-item">
          <span class="staff-label">副厅级</span>
          <span class="staff-value">{{ data.deputyDepartmentLevel }}</span>
        </div>
        <div class="staff-item">
          <span class="staff-label">正处级</span>
          <span class="staff-value">{{ data.divisionLevel }}</span>
        </div>
        <div class="staff-item">
          <span class="staff-label">副处级</span>
          <span class="staff-value">{{ data.deputyDivisionLevel }}</span>
        </div>
        <div class="staff-item">
          <span class="staff-label">处级以下</span>
          <span class="staff-value">{{ data.belowDivisionLevel }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StaffEstablishment } from '@/api/module/unit'

interface Props {
  data: StaffEstablishment
}

defineProps<Props>()
defineEmits(['open-calculation'])
</script>

<style scoped>
.card-section {
  background: #fff;
  border-radius: 4px;
  margin-bottom: 15px;
  overflow: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px;
  background: linear-gradient(to right, #e6f7ff, #ffffff);
}

.section-title {
  display: flex;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  color: #333;
}

.title-bar {
  width: 3px;
  height: 16px;
  background: #1890ff;
  margin-right: 10px;
}

.section-content {
  padding: 15px;
}

.staff-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 40px;
}

.staff-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
}

.staff-label {
  color: #666;
  font-size: 14px;
  min-width: 60px;
}

.staff-value {
  color: #333;
  font-size: 14px;
  font-weight: 500;
}
</style>
