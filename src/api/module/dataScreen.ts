import Http from '../http'

// 数据大屏统计数据
export interface StatsData {
  unitCount: number        // 单位总数
  courtyardCount: number   // 院落总数
  buildingCount: number    // 楼宇总数
  buildingArea: number     // 房屋面积总数
  landArea: number         // 土地面积总数
  staffCount: number       // 编制人数
  workCount: number        // 办公人数
}

// 编制人数/办公人数数据
export interface StaffData {
  category: string      // 级别类型
  staffCount: number    // 编制人数
  workCount: number     // 办公人数
}

// 管理范围数据
export interface ManagementData {
  category: string  // 类别
  value: number     // 数量
  color: string     // 颜色1
  color2: string    // 颜色2
}

// 区域数据
export interface RegionData {
  name: string      // 区域名称
  value: number     // 相关数值
}

// 房屋面积分布数据
export interface AreaDistribution {
  region: string   // 区域名称
  area: number     // 面积（平方米）
}

// 房屋使用情况数据
export interface UsageData {
  name: string   // 使用类型
  value: number  // 占比或数量
  color: string  // 颜色
}

// 房屋面积类型数据
export interface AreaTypeData {
  name: string   // 面积类型
  value: number  // 占比或数量
  color: string  // 颜色
}

// 数据大屏响应数据
export interface DataScreenResponse {
  stats: StatsData
  staffData: StaffData[]
  managementData: ManagementData[]
  regionData: RegionData[]
  areaDistribution: AreaDistribution[]
  usageData: UsageData[]
  areaTypeData: AreaTypeData[]
}

// 获取数据大屏数据
export function getDataScreenData() {
  return Http.post<DataScreenResponse>('/dataScreen/getData', {})
}
