<template>
  <div class="card-section">
    <div class="section-header">
      <div class="section-title">
        <span class="title-bar"></span>
        人员编制（单位按照编制人数）
      </div>
      <lay-button size="sm" type="primary" @click="$emit('open-calculation')">
        <SvgIcon name="area-calculation" size="14px" />面积核算表
      </lay-button>
    </div>
    <div class="section-content">
      <table class="staff-table">
        <tbody>
          <tr>
            <td>
              <span class="staff-label">正省级</span>
              <span class="staff-value">{{ data.provincialLevel }}</span>
            </td>
            <td>
              <span class="staff-label">副省级</span>
              <span class="staff-value">{{ data.deputyProvincialLevel }}</span>
            </td>
            <td>
              <span class="staff-label">正厅级</span>
              <span class="staff-value">{{ data.departmentLevel }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="staff-label">副厅级</span>
              <span class="staff-value">{{ data.deputyDepartmentLevel }}</span>
            </td>
            <td>
              <span class="staff-label">正处级</span>
              <span class="staff-value">{{ data.divisionLevel }}</span>
            </td>
            <td>
              <span class="staff-label">副处级</span>
              <span class="staff-value">{{ data.deputyDivisionLevel }}</span>
            </td>
          </tr>
          <tr>
            <td>
              <span class="staff-label">处级以下</span>
              <span class="staff-value">{{ data.belowDivisionLevel }}</span>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StaffEstablishment } from '@/api/module/unit'
import SvgIcon from '@/components/SvgIcon.vue'

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
  background: #EBF3FB;
  border-radius: 2px 2px 2px 2px;
}

.section-header :deep(.layui-btn) {
  height: 36px;
  font-size: 14px;
  padding: 0 16px;
}

.section-header :deep(.layui-btn .svg-icon) {
  margin-right: 7px;
  transform: translateY(-1px);
}

.section-title {
  display: flex;
  align-items: center;
  font-family: PingFang SC, PingFang SC;
  font-weight: 600;
  font-size: 18px;
  color: #404A6F;
  line-height: 14px;
}

.title-bar {
  width: 3px;
  height: 16px;
  background: #1890ff;
  margin-right: 10px;
}

.section-content {
  padding: 15px 0;
}

.staff-table {
  width: 100%;
  border-collapse: collapse;
}

.staff-table td {
  border: 1px solid #E9E9E9;
  padding: 0;
  font-size: 16px;
}

.staff-table td:empty {
  border: none;
}

.staff-label {
  display: inline-block;
  width: 80px;
  padding: 10px 15px;
  background: #EBF3FB;
  color: #333;
  font-size: 16px;
  border-right: 1px solid #E9E9E9;
  text-align: center;
}

.staff-value {
  display: inline-block;
  width: calc(100% - 141px);
  padding: 10px 15px;
  color: #333;
  font-size: 16px;
  text-align: center;
}
</style>
