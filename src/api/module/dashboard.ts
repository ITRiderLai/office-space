import Http from '../http'

// 总体概况数据
export interface OverviewData {
  unitCount: number        // 单位数
  staffCount: number       // 编制人数
  courtyardCount: number   // 院落数
  buildingCount: number    // 楼宇数
  buildingArea: number     // 办公用房楼宇面积（万㎡）
  landArea: number         // 土地面积（万㎡）
}

// 机构类型数据
export interface OrgTypeData {
  name: string   // 类型名称
  value: number  // 数量
}

// 编制人数数据
export interface StaffLevelData {
  level: string  // 级别
  count: number  // 人数
}

// 使用情况数据
export interface UsageData {
  type: string    // 类型
  value: number   // 数量
}

// 办公用房面积数据
export interface RoomAreaData {
  type: string   // 类型
  area: number   // 面积
}

// 首页工作台数据响应
export interface DashboardResponse {
  overview: OverviewData
  orgTypes: OrgTypeData[]
  staffLevels: StaffLevelData[]
  usageData: UsageData[]
  roomAreas: RoomAreaData[]
}

// 获取首页工作台数据
export function getDashboardData() {
  return Http.get<DashboardResponse>('/dashboard/overview')
}
