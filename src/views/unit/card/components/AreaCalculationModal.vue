<template>
  <lay-layer
    v-model="visible"
    title="面积核算表"
    :area="['700px', 'auto']"
    :shadeClose="true"
  >
    <div class="calculation-content">
      <div class="calculation-desc">
        根据单位人员编制数据和各级别办公面积标准，自动计算该单位应有的办公面积配额。
      </div>

      <table class="calculation-table" v-if="calculationData">
        <thead>
          <tr>
            <th>级别</th>
            <th>人数</th>
            <th>面积标准（㎡/人）</th>
            <th>应有面积（㎡）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in calculationData.items" :key="item.level">
            <td>{{ item.level }}</td>
            <td>{{ item.count }}</td>
            <td>{{ item.standard }}</td>
            <td>{{ item.area }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="total-row">
            <td><strong>合计</strong></td>
            <td><strong>{{ calculationData.totalCount }}</strong></td>
            <td>-</td>
            <td><strong>{{ calculationData.totalArea }}</strong></td>
          </tr>
        </tfoot>
      </table>

      <div class="calculation-loading" v-else-if="loading">
        <lay-icon type="layui-icon-loading" class="layui-anim layui-anim-rotate layui-anim-loop" />
        <span>加载中...</span>
      </div>
    </div>
  </lay-layer>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { getAreaCalculation, AreaCalculationData } from '@/api/module/unit'

interface Props {
  modelValue: boolean
  unitId: string
}

const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const visible = ref(false)
const loading = ref(false)
const calculationData = ref<AreaCalculationData | null>(null)

// 监听modelValue变化
watch(() => props.modelValue, (newVal) => {
  visible.value = newVal
  if (newVal && props.unitId) {
    loadCalculationData()
  }
})

// 监听visible变化，同步到父组件
watch(visible, (newVal) => {
  emit('update:modelValue', newVal)
})

// 加载面积核算数据
const loadCalculationData = async () => {
  loading.value = true
  try {
    const { data, code } = await getAreaCalculation(props.unitId)
    if (code === 200) {
      calculationData.value = data
    }
  } catch (error) {
    console.error('加载面积核算表失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.calculation-content {
  padding: 20px;
}

.calculation-desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
  padding: 10px 15px;
  background: #f5f5f5;
  border-radius: 4px;
}

.calculation-table {
  width: 100%;
  border-collapse: collapse;
}

.calculation-table th,
.calculation-table td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #e8e8e8;
  font-size: 16px;
}

.calculation-table th {
  background: var(--global-primary-color);
  color: #fff;
  font-weight: normal;
}

.calculation-table td {
  color: #333;
}

.calculation-table tbody tr:nth-child(even) {
  background: #fafafa;
}

.calculation-table .total-row {
  background: #f5f5f5;
}

.calculation-table .total-row td {
  color: #202020;
}

.calculation-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 40px;
  color: #666;
}

.calculation-loading .layui-icon {
  font-size: 24px;
  color: #1890ff;
}
</style>
