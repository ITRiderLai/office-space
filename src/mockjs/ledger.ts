import { Result } from "../types/result"

// 出借台账Mock数据
const lendingList = [
  {
    id: '1',
    unitName: '市财政局',
    reportUnitId: 'XX省XX市北京西路69号',
    unitType: '单位性质01',
    building: '三层',
    address: '江西省南昌市北京西路69号',
    owner: '张三',
    certNo: 'QS2024001',
    rentArea: 120.5,
    tenant: '李四',
    startDate: '2024-01-01',
    endDate: '2025-12-31',
    approvalDept: '市机关事务管理局',
    violation: '否',
    violationType: '',
    rectifyMeasure: '',
    existingIssue: '',
    rectifyStatus: ''
  },
  {
    id: '2',
    unitName: '市教育局',
    reportUnitId: 'XX省XX市XX区XX大道2888号',
    unitType: '单位性质02',
    building: '四层',
    address: '江西省南昌市北京西路69号',
    owner: '王五',
    certNo: 'QS2024002',
    rentArea: 85.0,
    tenant: '赵六',
    startDate: '2024-03-15',
    endDate: '2026-03-14',
    approvalDept: '市机关事务管理局',
    violation: '是',
    violationType: '超面积使用',
    rectifyMeasure: '限期腾退超出面积',
    existingIssue: '部分设备搬迁困难',
    rectifyStatus: '整改中'
  },
  {
    id: '3',
    unitName: '市卫健委',
    reportUnitId: 'XX省XX市XX区XX大道2888号',
    unitType: '单位性质03',
    building: '--',
    address: '江西省南昌市红谷滩区赣江南大道2888号',
    owner: '陈七',
    certNo: 'QS2024003',
    rentArea: 200.0,
    tenant: '周八',
    startDate: '2023-06-01',
    endDate: '2025-05-31',
    approvalDept: '市机关事务管理局',
    violation: '否',
    violationType: '',
    rectifyMeasure: '',
    existingIssue: '',
    rectifyStatus: ''
  },
  {
    id: '4',
    unitName: '市人社局',
    reportUnitId: 'XX省XX市XX路183号江旅国际大厦',
    unitType: '单位性质01',
    building: '一层',
    address: '江西省南昌市福州路183号江旅国际大厦',
    owner: '吴九',
    certNo: 'QS2024004',
    rentArea: 150.0,
    tenant: '郑十',
    startDate: '2024-02-01',
    endDate: '2026-01-31',
    approvalDept: '市机关事务管理局',
    violation: '否',
    violationType: '',
    rectifyMeasure: '',
    existingIssue: '',
    rectifyStatus: ''
  },
  {
    id: '5',
    unitName: '市交通局',
    reportUnitId: 'XX省XX市XX路183号江旅国际大厦',
    unitType: '单位性质02',
    building: '三层',
    address: '江西省南昌市北京西路69号',
    owner: '孙一',
    certNo: 'QS2024005',
    rentArea: 180.0,
    tenant: '钱二',
    startDate: '2023-09-01',
    endDate: '2025-08-31',
    approvalDept: '市机关事务管理局',
    violation: '是',
    violationType: '擅自转借',
    rectifyMeasure: '收回转借房产',
    existingIssue: '涉及第三方合同纠纷',
    rectifyStatus: '已整改'
  },
  {
    id: '6',
    unitName: '市住建局',
    reportUnitId: 'XX省XX市XX区XX大道2888号',
    unitType: '单位性质03',
    building: '四层',
    address: '江西省南昌市北京西路69号',
    owner: '李明',
    certNo: 'QS2024006',
    rentArea: 95.0,
    tenant: '王芳',
    startDate: '2024-05-01',
    endDate: '2026-04-30',
    approvalDept: '市机关事务管理局',
    violation: '否',
    violationType: '',
    rectifyMeasure: '',
    existingIssue: '',
    rectifyStatus: ''
  },
  {
    id: '7',
    unitName: '市水利局',
    reportUnitId: 'XX省XX市XX路183号江旅国际大厦',
    unitType: '单位性质01',
    building: '--',
    address: '江西省南昌市红谷滩区赣江南大道2888号',
    owner: '张伟',
    certNo: 'QS2024007',
    rentArea: 110.0,
    tenant: '刘洋',
    startDate: '2023-12-01',
    endDate: '2025-11-30',
    approvalDept: '市机关事务管理局',
    violation: '否',
    violationType: '',
    rectifyMeasure: '',
    existingIssue: '',
    rectifyStatus: ''
  },
  {
    id: '8',
    unitName: '市生态环境局',
    reportUnitId: 'XX省XX市XX路183号江旅国际大厦',
    unitType: '单位性质02',
    building: '一层',
    address: '江西省南昌市福州路183号江旅国际大厦',
    owner: '赵敏',
    certNo: 'QS2024008',
    rentArea: 75.0,
    tenant: '钱进',
    startDate: '2024-04-01',
    endDate: '2025-03-31',
    approvalDept: '市机关事务管理局',
    violation: '否',
    violationType: '',
    rectifyMeasure: '',
    existingIssue: '',
    rectifyStatus: ''
  },
  {
    id: '9',
    unitName: '市自然资源局',
    reportUnitId: 'XX省XX市北京西路69号',
    unitType: '单位性质03',
    building: '--',
    address: '江西省南昌市红谷滩区赣江南大道2888号',
    owner: '周杰',
    certNo: 'QS2024009',
    rentArea: 220.0,
    tenant: '吴昊',
    startDate: '2023-08-01',
    endDate: '2025-07-31',
    approvalDept: '市机关事务管理局',
    violation: '是',
    violationType: '改变用途',
    rectifyMeasure: '恢复原有用途',
    existingIssue: '需要重新装修',
    rectifyStatus: '整改中'
  },
  {
    id: '10',
    unitName: '市市场监管局',
    reportUnitId: 'XX省XX市北京西路69号',
    unitType: '单位性质03',
    building: '一层',
    address: '江西省南昌市福州路183号江旅国际大厦',
    owner: '郑强',
    certNo: 'QS2024010',
    rentArea: 130.0,
    tenant: '孙丽',
    startDate: '2024-06-01',
    endDate: '2026-05-31',
    approvalDept: '市机关事务管理局',
    violation: '否',
    violationType: '',
    rectifyMeasure: '',
    existingIssue: '',
    rectifyStatus: ''
  },
]

// 性质下拉选项
const natureOptions = [
  { value: '1', label: '临时出借' },
  { value: '2', label: '长期出借' },
  { value: '3', label: '有偿出借' },
  { value: '4', label: '无偿出借' }
]

// 获取出借台账列表
const getLendingList = (req: any) => {
  let params: any = {}
  try {
    params = JSON.parse(req.body) || {}
  } catch {
    params = {}
  }

  const { page = 1, pageSize = 10, unitName, unitType, owner, certNo, tenant, nature, contractNo } = params

  // 筛选数据
  let filteredList = [...lendingList]

  if (unitName) {
    filteredList = filteredList.filter(item => item.unitName.includes(unitName))
  }
  if (unitType) {
    filteredList = filteredList.filter(item => item.unitType.includes(unitType))
  }
  if (owner) {
    filteredList = filteredList.filter(item => item.owner.includes(owner))
  }
  if (certNo) {
    filteredList = filteredList.filter(item => item.certNo.includes(certNo))
  }
  if (tenant) {
    filteredList = filteredList.filter(item => item.tenant.includes(tenant))
  }

  const total = filteredList.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = filteredList.slice(start, end)

  const result: Result = {
    code: 200,
    msg: "操作成功",
    data: {
      list,
      total,
      page,
      pageSize
    },
    success: true
  }
  return result
}

// 保存/更新出借记录
const saveLending = (req: any) => {
  let data: any = {}
  try {
    data = JSON.parse(req.body) || {}
  } catch {
    data = {}
  }

  if (data.id) {
    // 更新
    const index = lendingList.findIndex(item => item.id === data.id)
    if (index > -1) {
      lendingList[index] = { ...lendingList[index], ...data }
    }
  } else {
    // 新增
    data.id = String(Date.now())
    lendingList.unshift(data)
  }

  const result: Result = {
    code: 200,
    msg: "保存成功",
    success: true
  }
  return result
}

// 删除出借记录
const deleteLending = (req: any) => {
  let params: any = {}
  try {
    params = JSON.parse(req.body) || {}
  } catch {
    params = {}
  }

  const { ids = [] } = params

  // 模拟删除：从列表中移除所选数据
  ids.forEach((id: string) => {
    const index = lendingList.findIndex(item => item.id === id)
    if (index > -1) {
      lendingList.splice(index, 1) // 模拟删除：实际从数组中移除该条数据
    }
  })

  const result: Result = {
    code: 200,
    msg: "删除成功",
    success: true
  }
  return result
}

// 获取性质下拉选项
const getNatureOptions = () => {
  const result: Result = {
    code: 200,
    msg: "操作成功",
    data: natureOptions,
    success: true
  }
  return result
}

export default {
  getLendingList,
  saveLending,
  deleteLending,
  getNatureOptions
}
