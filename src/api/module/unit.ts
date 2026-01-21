import Http from '../http'

// 组织架构树节点
export interface OrgTreeNode {
  id: string
  name: string
  type: 'province' | 'city' | 'district' | 'unit'
  children?: OrgTreeNode[]
}

// 人员编制结构
export interface StaffEstablishment {
  provincialLevel: number
  deputyProvincialLevel: number
  departmentLevel: number
  deputyDepartmentLevel: number
  divisionLevel: number
  deputyDivisionLevel: number
  belowDivisionLevel: number
}

// 实有人数结构
export interface ActualStaff {
  cityChief: number
  cityDeputy: number
  bureauLevel: number
  deputyBureauLevel: number
  belowBureauLevel: number
}

// 单位详情
export interface UnitDetail {
  id: string
  unitName: string
  unitLevel: string
  establishedCount: number
  actualCount: number
  supervisor: string
  legalPerson: string
  mobilePhone: string
  officePhone: string
  officeAddress: string
  panoramaPhoto?: string
  staffEstablishment: StaffEstablishment
  actualStaff: ActualStaff
  officeAreaByStaff: ActualStaff
}

// 面积核算明细项
export interface AreaCalculationItem {
  level: string
  count: number
  standard: number
  area: number
}

// 面积核算表数据
export interface AreaCalculationData {
  items: AreaCalculationItem[]
  totalCount: number
  totalArea: number
}

// 获取组织架构树
export function getOrgTree(keyword?: string) {
  return Http.post<OrgTreeNode[]>('/unit/org-tree', { keyword })
}

// 获取单位详情
export function getUnitDetail(id: string) {
  return Http.post<UnitDetail>('/unit/detail', { id })
}

// 获取面积核算表
export function getAreaCalculation(unitId: string) {
  return Http.post<AreaCalculationData>('/unit/area-calculation', { unitId })
}
