<template>
  <div class="floor-info">
    <lay-form v-if="floorData" :model="floorData" label-width="100">
      <div class="info-section">
        <div class="section-title">基本信息</div>
        <div class="form-grid">
          <lay-form-item label="楼层名称">
            <lay-input v-model="floorData.name" disabled />
          </lay-form-item>
          <lay-form-item label="所属楼栋">
            <lay-input v-model="floorData.buildingName" disabled />
          </lay-form-item>
          <lay-form-item label="楼层编号">
            <lay-input v-model="floorData.floorNumber" disabled />
          </lay-form-item>
          <lay-form-item label="建筑面积">
            <lay-input v-model="floorData.buildingArea" disabled>
              <template #suffix>m²</template>
            </lay-input>
          </lay-form-item>
          <lay-form-item label="使用面积">
            <lay-input v-model="floorData.usableArea" disabled>
              <template #suffix>m²</template>
            </lay-input>
          </lay-form-item>
          <lay-form-item label="房间数量">
            <lay-input v-model="floorData.roomCount" disabled>
              <template #suffix>间</template>
            </lay-input>
          </lay-form-item>
        </div>
      </div>

      <div class="info-section">
        <div class="section-title">其他信息</div>
        <div class="form-grid">
          <lay-form-item label="创建时间">
            <lay-input v-model="floorData.createTime" disabled />
          </lay-form-item>
          <lay-form-item label="更新时间">
            <lay-input v-model="floorData.updateTime" disabled />
          </lay-form-item>
          <lay-form-item label="备注" class="full-width">
            <lay-textarea v-model="floorData.remark" disabled />
          </lay-form-item>
        </div>
      </div>
    </lay-form>

    <lay-empty v-else description="请从左侧目录选择楼层" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getFloorInfo, FloorInfo as FloorInfoType } from '@/api/module/courtyard'

const props = defineProps<{
  floorId: string
}>()

const floorData = ref<FloorInfoType | null>(null)

// 加载楼层信息
const loadFloorInfo = async () => {
  if (!props.floorId) {
    floorData.value = null
    return
  }

  try {
    const { data, code } = await getFloorInfo(props.floorId)
    if (code === 200) {
      floorData.value = data
    }
  } catch (error) {
    console.error('加载楼层信息失败:', error)
  }
}

// 监听楼层ID变化
watch(() => props.floorId, () => {
  loadFloorInfo()
}, { immediate: true })
</script>

<style scoped>
.floor-info {
  padding: 20px;
  height: 100%;
}

.info-section {
  margin-bottom: 20px;
}

.section-title {
  font-size: 15px;
  font-weight: bold;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
  margin-bottom: 15px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 40px;
}

.form-grid .full-width {
  grid-column: span 2;
}

.floor-info :deep(.layui-form-item) {
  margin-bottom: 15px;
}

.floor-info :deep(.layui-form-label) {
  width: 80px;
  text-align: right;
}

.floor-info :deep(.layui-empty) {
  padding-top: 100px;
}
</style>
