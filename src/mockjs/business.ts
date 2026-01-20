import { Result } from "../types/result"

// 业务编号序列
let businessNoSeq = 1

// 单位数据
const unitList = [
  { id: '1', name: '市财政局', code: 'CZJ', contact: '张三', phone: '0591-88888881' },
  { id: '2', name: '市发改委', code: 'FGW', contact: '李四', phone: '0591-88888882' },
  { id: '3', name: '市教育局', code: 'JYJ', contact: '王五', phone: '0591-88888883' },
  { id: '4', name: '市人社局', code: 'RSJ', contact: '赵六', phone: '0591-88888884' },
  { id: '5', name: '市住建局', code: 'ZJJ', contact: '钱七', phone: '0591-88888885' },
  { id: '6', name: '市自然资源局', code: 'ZRZ', contact: '孙八', phone: '0591-88888886' },
  { id: '7', name: '市生态环境局', code: 'STH', contact: '周九', phone: '0591-88888887' },
  { id: '8', name: '市交通运输局', code: 'JTY', contact: '吴十', phone: '0591-88888888' },
]

// 楼宇数据
const buildingList = [
  { id: '1', name: '行政中心A栋', address: '市府路1号', unitId: '1' },
  { id: '2', name: '行政中心B栋', address: '市府路1号', unitId: '1' },
  { id: '3', name: '财政综合楼', address: '鼓楼路88号', unitId: '1' },
  { id: '4', name: '发改委办公楼', address: '华林路100号', unitId: '2' },
  { id: '5', name: '教育大厦', address: '五四路200号', unitId: '3' },
  { id: '6', name: '人才服务中心', address: '东街150号', unitId: '4' },
  { id: '7', name: '住建综合楼', address: '湖东路50号', unitId: '5' },
  { id: '8', name: '自然资源大厦', address: '北环路66号', unitId: '6' },
]

// 获取业务信息（页面初始化）
const getBusinessInit = (req: any, res: any) => {
  const date = new Date()
  const dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
  const businessNo = `${dateStr}${String(businessNoSeq++).padStart(5, '0')}`

  let result: Result = {
    code: 200,
    msg: '操作成功',
    data: {
      businessType: '办公用房-权属申请',
      businessNo: businessNo,
      handler: '曾启松',
      currentStep: '申请'
    },
    success: true
  }
  return result
}

// 查询单位列表
const getUnitList = (req: any, res: any) => {
  let keyword = ''
  try {
    const body = JSON.parse(req.body || '{}')
    keyword = body.keyword || ''
  } catch (e) {}

  let result = unitList
  if (keyword) {
    result = unitList.filter(item =>
      item.name.includes(keyword) || item.code.toLowerCase().includes(keyword.toLowerCase())
    )
  }

  return {
    code: 200,
    msg: '操作成功',
    data: result,
    success: true
  }
}

// 查询楼宇列表
const getBuildingList = (req: any, res: any) => {
  let keyword = ''
  let unitId = ''
  try {
    const body = JSON.parse(req.body || '{}')
    keyword = body.keyword || ''
    unitId = body.unitId || ''
  } catch (e) {}

  let result = buildingList
  if (unitId) {
    result = result.filter(item => item.unitId === unitId)
  }
  if (keyword) {
    result = result.filter(item =>
      item.name.includes(keyword) || item.address.includes(keyword)
    )
  }

  return {
    code: 200,
    msg: '操作成功',
    data: result,
    success: true
  }
}

// 保存申请表单
const saveApplication = (req: any, res: any) => {
  let data = {}
  try {
    data = JSON.parse(req.body)
  } catch (e) {}
  console.log('保存申请数据:', data)

  return {
    code: 200,
    msg: '保存成功，已提交到下一个环节',
    data: { id: Date.now().toString() },
    success: true
  }
}

export default {
  getBusinessInit,
  getUnitList,
  getBuildingList,
  saveApplication
}
