import Http from '../http'

// 获取业务初始化信息
export const getBusinessInit = function() {
  return Http.get('/business/ownership/init')
}

// 查询单位列表
export const getUnitList = function(params: { keyword?: string }) {
  return Http.post('/unit/list', params)
}

// 查询楼宇列表
export const getBuildingList = function(params: { keyword?: string, unitId?: string }) {
  return Http.post('/building/list', params)
}

// 保存权属申请
export const saveOwnershipApplication = function(data: any) {
  return Http.post('/business/ownership/save', data)
}
