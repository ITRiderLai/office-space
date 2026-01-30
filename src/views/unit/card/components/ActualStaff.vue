<template>
  <div class="card-section">
    <div class="section-header">
      <div class="section-title">
        <span class="title-bar"></span>
        实有人数（人数）
      </div>
    </div>
    <div class="section-content">
      <table class="staff-table">
        <thead>
          <tr>
            <th>市级正职</th>
            <th>市级副职</th>
            <th>正局（处）级</th>
            <th>副局（处）级</th>
            <th>局（处）级以下</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ data.cityChief }}</td>
            <td>{{ data.cityDeputy }}</td>
            <td>{{ data.bureauLevel }}</td>
            <td>{{ data.deputyBureauLevel }}</td>
            <td>{{ data.belowBureauLevel }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ActualStaff } from '@/api/module/unit'

interface Props {
  data: ActualStaff
}

defineProps<Props>()
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

.section-header :deep(.layui-btn .layui-icon) {
  margin-right: 7px;
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

.staff-table th,
.staff-table td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #E9E9E9;
  font-size: 16px;
}

.staff-table th {
  background: #EBF3FB;
  color: #666;
  font-weight: normal;
}

.staff-table td {
  color: #333;
}
</style>
