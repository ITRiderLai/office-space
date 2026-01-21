import Http from '../http'

// 出借记录类型
export interface LendingRecord {
  id?: string
  unitName: string
  reportUnitId: string
  unitType: string
  building: string
  address: string
  owner: string
  certNo: string
  rentArea: number
  tenant: string
  startDate: string
  endDate: string
  approvalDept: string
  violation: string
  violationType?: string
  rectifyMeasure?: string
  existingIssue?: string
  rectifyStatus?: string
}

// 查询参数类型
export interface LendingQueryParams {
  page: number
  pageSize: number
  unitName?: string
  unitType?: string
  owner?: string
  certNo?: string
  tenant?: string
  nature?: string
  contractNo?: string
}

// 获取出借台账列表
export const getLendingList = function(params: LendingQueryParams) {
  return Http.post('/ledger/lending/list', params)
}

// 保存/更新出借记录
export const saveLending = function(data: LendingRecord) {
  return Http.post('/ledger/lending/save', data)
}

// 删除出借记录
export const deleteLending = function(ids: string[]) {
  return Http.post('/ledger/lending/delete', { ids })
}

// 获取性质下拉选项
export const getNatureOptions = function() {
  return Http.get('/ledger/nature/options')
}
