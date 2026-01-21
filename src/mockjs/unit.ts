import { Result } from "../types/result"

// 组织架构树数据
const orgTreeData = [
  {
    id: 'yn',
    name: '云南省',
    type: 'province',
    children: [
      {
        id: 'km',
        name: '昆明市',
        type: 'city',
        children: [
          {
            id: 'km-sz',
            name: '市直',
            type: 'district',
            children: [
              { id: 'km-001', name: '昆明市人民政府办公室', type: 'unit' },
              { id: 'km-002', name: '昆明市发展和改革委员会', type: 'unit' },
            ]
          }
        ]
      },
      {
        id: 'qj',
        name: '曲靖市',
        type: 'city',
        children: [
          {
            id: 'qj-sz',
            name: '市直',
            type: 'district',
            children: [
              { id: 'qj-001', name: '曲靖市人民政府办公室', type: 'unit' },
            ]
          }
        ]
      },
      {
        id: 'yx',
        name: '玉溪市',
        type: 'city',
        children: []
      },
      {
        id: 'bs',
        name: '保山市',
        type: 'city',
        children: [
          {
            id: 'bs-sz',
            name: '市直',
            type: 'district',
            children: [
              { id: 'bs-001', name: '中国共产党保山市委员会', type: 'unit' },
              { id: 'bs-002', name: '中国共产党保山市纪律检查委员会', type: 'unit' },
              { id: 'bs-003', name: '保山市人民政府办公室', type: 'unit' },
              { id: 'bs-004', name: '保山市发展和改革委员会', type: 'unit' },
              { id: 'bs-005', name: '保山市工业和信息化局', type: 'unit' },
              { id: 'bs-006', name: '保山市教育局', type: 'unit' },
            ]
          },
          {
            id: 'bs-ld',
            name: '隆阳区',
            type: 'district',
            children: [
              { id: 'bs-ld-001', name: '隆阳区人民政府办公室', type: 'unit' },
            ]
          }
        ]
      }
    ]
  }
]

// 单位详情数据
const unitDetails: Record<string, any> = {
  'bs-001': {
    id: 'bs-001',
    unitName: '中国共产党保山市委员会',
    unitLevel: '正厅级',
    establishedCount: 896,
    actualCount: 1032,
    supervisor: '赵菊花',
    legalPerson: '---',
    mobilePhone: '0755-85632154',
    officePhone: '0755-83535000',
    officeAddress: '云南省保山市',
    panoramaPhoto: 'https://pic.imgdb.cn/item/679122a4d0e0a243d4e1b8a6.webp',
    staffEstablishment: {
      provincialLevel: 10,
      deputyProvincialLevel: 20,
      departmentLevel: 15,
      deputyDepartmentLevel: 10,
      divisionLevel: 14,
      deputyDivisionLevel: 30,
      belowDivisionLevel: 11
    },
    actualStaff: {
      cityChief: 10,
      cityDeputy: 20,
      bureauLevel: 15,
      deputyBureauLevel: 15,
      belowBureauLevel: 15
    },
    officeAreaByStaff: {
      cityChief: 10,
      cityDeputy: 20,
      bureauLevel: 15,
      deputyBureauLevel: 15,
      belowBureauLevel: 15
    }
  },
  'bs-002': {
    id: 'bs-002',
    unitName: '中国共产党保山市纪律检查委员会',
    unitLevel: '正处级',
    establishedCount: 256,
    actualCount: 280,
    supervisor: '李明',
    legalPerson: '王华',
    mobilePhone: '0755-85632200',
    officePhone: '0755-83535100',
    officeAddress: '云南省保山市隆阳区',
    panoramaPhoto: 'https://pic.imgdb.cn/item/679122a4d0e0a243d4e1b8a6.webp',
    staffEstablishment: {
      provincialLevel: 0,
      deputyProvincialLevel: 2,
      departmentLevel: 5,
      deputyDepartmentLevel: 8,
      divisionLevel: 20,
      deputyDivisionLevel: 35,
      belowDivisionLevel: 50
    },
    actualStaff: {
      cityChief: 2,
      cityDeputy: 5,
      bureauLevel: 10,
      deputyBureauLevel: 15,
      belowBureauLevel: 48
    },
    officeAreaByStaff: {
      cityChief: 2,
      cityDeputy: 5,
      bureauLevel: 10,
      deputyBureauLevel: 15,
      belowBureauLevel: 48
    }
  },
  'km-001': {
    id: 'km-001',
    unitName: '昆明市人民政府办公室',
    unitLevel: '正处级',
    establishedCount: 180,
    actualCount: 195,
    supervisor: '张三',
    legalPerson: '李四',
    mobilePhone: '0871-63100000',
    officePhone: '0871-63100001',
    officeAddress: '云南省昆明市五华区',
    panoramaPhoto: 'https://pic.imgdb.cn/item/679122a4d0e0a243d4e1b8a6.webp',
    staffEstablishment: {
      provincialLevel: 0,
      deputyProvincialLevel: 0,
      departmentLevel: 2,
      deputyDepartmentLevel: 5,
      divisionLevel: 15,
      deputyDivisionLevel: 28,
      belowDivisionLevel: 45
    },
    actualStaff: {
      cityChief: 1,
      cityDeputy: 3,
      bureauLevel: 8,
      deputyBureauLevel: 12,
      belowBureauLevel: 40
    },
    officeAreaByStaff: {
      cityChief: 1,
      cityDeputy: 3,
      bureauLevel: 8,
      deputyBureauLevel: 12,
      belowBureauLevel: 40
    }
  }
}

// 面积标准配置
const areaStandards: Record<string, number> = {
  provincialLevel: 54,
  deputyProvincialLevel: 42,
  departmentLevel: 30,
  deputyDepartmentLevel: 24,
  divisionLevel: 18,
  deputyDivisionLevel: 12,
  belowDivisionLevel: 9
}

const levelNames: Record<string, string> = {
  provincialLevel: '正省级',
  deputyProvincialLevel: '副省级',
  departmentLevel: '正厅级',
  deputyDepartmentLevel: '副厅级',
  divisionLevel: '正处级',
  deputyDivisionLevel: '副处级',
  belowDivisionLevel: '处级以下'
}

// 过滤树节点
const filterTree = (nodes: any[], keyword: string): any[] => {
  if (!keyword) return nodes

  return nodes.reduce((acc: any[], node) => {
    const children = node.children ? filterTree(node.children, keyword) : []
    if (node.name.includes(keyword) || children.length > 0) {
      acc.push({
        ...node,
        children: children.length > 0 ? children : node.children
      })
    }
    return acc
  }, [])
}

// 获取组织架构树
const getOrgTree = (req: any) => {
  let keyword = ''
  try {
    const body = JSON.parse(req.body)
    keyword = body?.keyword || ''
  } catch (e) {}

  const data = keyword ? filterTree(orgTreeData, keyword) : orgTreeData

  const result: Result = {
    code: 200,
    msg: '操作成功',
    data: data,
    success: true
  }
  return result
}

// 获取单位详情
const getUnitDetail = (req: any) => {
  let id = ''
  try {
    const body = JSON.parse(req.body)
    id = body?.id || ''
  } catch (e) {}

  const detail = unitDetails[id] || unitDetails['bs-001']

  const result: Result = {
    code: 200,
    msg: '操作成功',
    data: detail,
    success: true
  }
  return result
}

// 获取面积核算表
const getAreaCalculation = (req: any) => {
  let unitId = ''
  try {
    const body = JSON.parse(req.body)
    unitId = body?.unitId || ''
  } catch (e) {}

  const unit = unitDetails[unitId] || unitDetails['bs-001']
  const establishment = unit.staffEstablishment

  const items = Object.keys(areaStandards).map(key => ({
    level: levelNames[key],
    count: establishment[key] || 0,
    standard: areaStandards[key],
    area: (establishment[key] || 0) * areaStandards[key]
  }))

  const totalCount = items.reduce((sum, item) => sum + item.count, 0)
  const totalArea = items.reduce((sum, item) => sum + item.area, 0)

  const result: Result = {
    code: 200,
    msg: '操作成功',
    data: {
      items,
      totalCount,
      totalArea
    },
    success: true
  }
  return result
}

export default {
  getOrgTree,
  getUnitDetail,
  getAreaCalculation
}
