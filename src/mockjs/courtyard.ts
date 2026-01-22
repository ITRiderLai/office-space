import { Result } from "../types/result"

// 院落目录树数据
const courtyardTreeData = [
  {
    id: 'yn',
    name: '云南省',
    type: 'province',
    children: [
      {
        id: 'km',
        name: '昆明市',
        type: 'city',
        children: []
      },
      {
        id: 'qj',
        name: '曲靖市',
        type: 'city',
        children: []
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
            name: '市区',
            type: 'district',
            children: [
              {
                id: 'yl-swdy',
                name: '[院落]市委大院',
                type: 'courtyard',
                children: [
                  {
                    id: 'ld-zbgl',
                    name: '[楼栋]主办公楼',
                    type: 'building',
                    children: [
                      { id: 'floor-1', name: '1层', type: 'floor' },
                      { id: 'floor-2', name: '2层', type: 'floor' },
                      { id: 'floor-3', name: '3层', type: 'floor' },
                      { id: 'floor-4', name: '4层', type: 'floor' },
                      { id: 'floor-5', name: '5层', type: 'floor' },
                      { id: 'floor-6', name: '6层', type: 'floor' },
                      { id: 'floor-7', name: '7层', type: 'floor' }
                    ]
                  },
                  {
                    id: 'ld-nfl',
                    name: '[楼栋]南附楼',
                    type: 'building',
                    children: [
                      { id: 'floor-nfl-1', name: '1层', type: 'floor' },
                      { id: 'floor-nfl-2', name: '2层', type: 'floor' },
                      { id: 'floor-nfl-3', name: '3层', type: 'floor' }
                    ]
                  },
                  {
                    id: 'ld-bfl',
                    name: '[楼栋]北附楼',
                    type: 'building',
                    children: [
                      { id: 'floor-bfl-1', name: '1层', type: 'floor' },
                      { id: 'floor-bfl-2', name: '2层', type: 'floor' }
                    ]
                  },
                  {
                    id: 'ld-st',
                    name: '[楼栋]食堂',
                    type: 'building',
                    children: [
                      { id: 'floor-st-1', name: '1层', type: 'floor' },
                      { id: 'floor-st-2', name: '2层', type: 'floor' }
                    ]
                  },
                  {
                    id: 'ld-fwl',
                    name: '[楼栋]服务楼',
                    type: 'building',
                    children: [
                      { id: 'floor-fwl-1', name: '1层', type: 'floor' },
                      { id: 'floor-fwl-2', name: '2层', type: 'floor' },
                      { id: 'floor-fwl-3', name: '3层', type: 'floor' }
                    ]
                  }
                ]
              },
              {
                id: 'yl-sjw',
                name: '[院落]市纪委',
                type: 'courtyard',
                children: []
              },
              {
                id: 'yl-srd',
                name: '[院落]市人大',
                type: 'courtyard',
                children: []
              },
              {
                id: 'yl-zfdy',
                name: '[院落]政府大院',
                type: 'courtyard',
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]

// 楼层信息数据
const floorInfoData: Record<string, any> = {
  'floor-1': {
    id: 'floor-1',
    name: '1层',
    buildingName: '主办公楼',
    floorNumber: '1',
    buildingArea: '1256.50',
    usableArea: '1024.30',
    roomCount: 25,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-06-20 14:25:00',
    remark: '主办公楼一层，包含大厅、接待室等'
  },
  'floor-2': {
    id: 'floor-2',
    name: '2层',
    buildingName: '主办公楼',
    floorNumber: '2',
    buildingArea: '1180.00',
    usableArea: '980.50',
    roomCount: 22,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-06-18 09:15:00',
    remark: ''
  },
  'floor-3': {
    id: 'floor-3',
    name: '3层',
    buildingName: '主办公楼',
    floorNumber: '3',
    buildingArea: '1180.00',
    usableArea: '985.20',
    roomCount: 24,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-05-10 16:40:00',
    remark: ''
  },
  'floor-4': {
    id: 'floor-4',
    name: '4层',
    buildingName: '主办公楼',
    floorNumber: '4',
    buildingArea: '1180.00',
    usableArea: '978.60',
    roomCount: 20,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-04-22 11:30:00',
    remark: '领导办公区域'
  },
  'floor-5': {
    id: 'floor-5',
    name: '5层',
    buildingName: '主办公楼',
    floorNumber: '5',
    buildingArea: '1180.00',
    usableArea: '965.40',
    roomCount: 18,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-03-15 08:45:00',
    remark: '会议室集中区域'
  },
  'floor-6': {
    id: 'floor-6',
    name: '6层',
    buildingName: '主办公楼',
    floorNumber: '6',
    buildingArea: '1150.00',
    usableArea: '945.80',
    roomCount: 16,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-02-28 15:20:00',
    remark: ''
  },
  'floor-7': {
    id: 'floor-7',
    name: '7层',
    buildingName: '主办公楼',
    floorNumber: '7',
    buildingArea: '1100.00',
    usableArea: '890.20',
    roomCount: 14,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-01-20 10:00:00',
    remark: '设备层及档案室'
  },
  'floor-nfl-1': {
    id: 'floor-nfl-1',
    name: '1层',
    buildingName: '南附楼',
    floorNumber: '1',
    buildingArea: '680.00',
    usableArea: '560.50',
    roomCount: 12,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-05-08 14:30:00',
    remark: ''
  },
  'floor-nfl-2': {
    id: 'floor-nfl-2',
    name: '2层',
    buildingName: '南附楼',
    floorNumber: '2',
    buildingArea: '680.00',
    usableArea: '558.20',
    roomCount: 10,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-04-12 09:15:00',
    remark: ''
  },
  'floor-bfl-1': {
    id: 'floor-bfl-1',
    name: '1层',
    buildingName: '北附楼',
    floorNumber: '1',
    buildingArea: '520.00',
    usableArea: '430.80',
    roomCount: 8,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-06-01 16:40:00',
    remark: ''
  },
  'floor-st-1': {
    id: 'floor-st-1',
    name: '1层',
    buildingName: '食堂',
    floorNumber: '1',
    buildingArea: '850.00',
    usableArea: '720.50',
    roomCount: 6,
    createTime: '2024-01-15 10:30:00',
    updateTime: '2024-05-20 11:25:00',
    remark: '餐厅及厨房区域'
  }
}

// 房间数据
const roomsData: Record<string, any[]> = {
  'floor-1': [
    { id: 'r-101', roomNumber: '101', name: '大厅', buildingArea: 120.5, usableArea: 110.2, useType: '公共区域', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-102', roomNumber: '102', name: '接待室', buildingArea: 45.8, usableArea: 42.0, useType: '办公用房', useUnit: '办公室', user: '张三', status: '使用中' },
    { id: 'r-103', roomNumber: '103', name: '会议室A', buildingArea: 68.2, usableArea: 62.5, useType: '会议室', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-104', roomNumber: '104', name: '档案室', buildingArea: 35.0, usableArea: 32.0, useType: '服务用房', useUnit: '档案科', user: '李四', status: '使用中' },
    { id: 'r-105', roomNumber: '105', name: '值班室', buildingArea: 28.5, usableArea: 25.8, useType: '服务用房', useUnit: '保卫科', user: '王五', status: '使用中' },
    { id: 'r-106', roomNumber: '106', name: '办公室106', buildingArea: 21.65, usableArea: 18.5, useType: '办公用房', useUnit: '综合科', user: '赵六', status: '使用中' },
    { id: 'r-107', roomNumber: '107', name: '办公室107', buildingArea: 21.65, usableArea: 18.5, useType: '办公用房', useUnit: '综合科', user: '钱七', status: '使用中' },
    { id: 'r-108', roomNumber: '108', name: '办公室108', buildingArea: 21.65, usableArea: 18.5, useType: '办公用房', useUnit: '财务科', user: '孙八', status: '使用中' },
    { id: 'r-109', roomNumber: '109', name: '办公室109', buildingArea: 21.65, usableArea: 18.5, useType: '办公用房', useUnit: '财务科', user: '周九', status: '使用中' },
    { id: 'r-110', roomNumber: '110', name: '办公室110', buildingArea: 16.7, usableArea: 14.2, useType: '办公用房', useUnit: '人事科', user: '吴十', status: '使用中' },
    { id: 'r-111', roomNumber: '111', name: '办公室111', buildingArea: 16.7, usableArea: 14.2, useType: '办公用房', useUnit: '人事科', user: '-', status: '空闲' },
    { id: 'r-112', roomNumber: '112', name: '办公室112', buildingArea: 16.7, usableArea: 14.2, useType: '办公用房', useUnit: '-', user: '-', status: '空闲' },
    { id: 'r-113', roomNumber: '113', name: '储藏室', buildingArea: 12.0, usableArea: 10.5, useType: '服务用房', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-113a', roomNumber: '113A', name: '配电间', buildingArea: 8.5, usableArea: 7.2, useType: '设备用房', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-114', roomNumber: '114', name: '办公室114', buildingArea: 18.81, usableArea: 16.0, useType: '办公用房', useUnit: '宣传科', user: '郑十一', status: '使用中' },
    { id: 'r-115', roomNumber: '115', name: '办公室115', buildingArea: 15.23, usableArea: 13.0, useType: '办公用房', useUnit: '宣传科', user: '-', status: '空闲' },
    { id: 'r-116', roomNumber: '116', name: '办公室116', buildingArea: 14.13, usableArea: 12.0, useType: '办公用房', useUnit: '-', user: '-', status: '空闲' },
    { id: 'r-116a', roomNumber: '116A', name: '卫生间', buildingArea: 25.0, usableArea: 22.0, useType: '公共区域', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-117', roomNumber: '117', name: '办公室117', buildingArea: 14.13, usableArea: 12.0, useType: '办公用房', useUnit: '信息科', user: '王十二', status: '使用中' },
    { id: 'r-118', roomNumber: '118', name: '办公室118', buildingArea: 13.19, usableArea: 11.2, useType: '办公用房', useUnit: '信息科', user: '李十三', status: '使用中' },
    { id: 'r-119', roomNumber: '119', name: '办公室119', buildingArea: 18.81, usableArea: 16.0, useType: '办公用房', useUnit: '-', user: '-', status: '空闲' },
    { id: 'r-120', roomNumber: '120', name: '办公室120', buildingArea: 18.81, usableArea: 16.0, useType: '办公用房', useUnit: '-', user: '-', status: '空闲' },
    { id: 'r-121', roomNumber: '121', name: '办公室121', buildingArea: 18.81, usableArea: 16.0, useType: '办公用房', useUnit: '法规科', user: '张十四', status: '使用中' },
    { id: 'r-101-102', roomNumber: '101/102', name: '多功能厅', buildingArea: 34.55, usableArea: 30.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-543', roomNumber: '543543', name: '测试房间', buildingArea: 15.23, usableArea: 13.0, useType: '办公用房', useUnit: '测试', user: '-', status: '空闲' }
  ],
  'floor-2': [
    { id: 'r-201', roomNumber: '201', name: '办公室201', buildingArea: 25.5, usableArea: 22.0, useType: '办公用房', useUnit: '发展科', user: '刘一', status: '使用中' },
    { id: 'r-202', roomNumber: '202', name: '办公室202', buildingArea: 25.5, usableArea: 22.0, useType: '办公用房', useUnit: '发展科', user: '陈二', status: '使用中' },
    { id: 'r-203', roomNumber: '203', name: '会议室B', buildingArea: 55.0, usableArea: 50.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-204', roomNumber: '204', name: '办公室204', buildingArea: 20.0, usableArea: 17.5, useType: '办公用房', useUnit: '规划科', user: '林三', status: '使用中' },
    { id: 'r-205', roomNumber: '205', name: '办公室205', buildingArea: 20.0, usableArea: 17.5, useType: '办公用房', useUnit: '规划科', user: '-', status: '空闲' }
  ],
  'floor-3': [
    { id: 'r-301', roomNumber: '301', name: '领导办公室', buildingArea: 45.0, usableArea: 40.0, useType: '办公用房', useUnit: '领导', user: '王局长', status: '使用中' },
    { id: 'r-302', roomNumber: '302', name: '副领导办公室', buildingArea: 35.0, usableArea: 30.0, useType: '办公用房', useUnit: '领导', user: '李副局长', status: '使用中' },
    { id: 'r-303', roomNumber: '303', name: '秘书室', buildingArea: 25.0, usableArea: 22.0, useType: '办公用房', useUnit: '办公室', user: '张秘书', status: '使用中' }
  ],
  'floor-4': [
    { id: 'r-401', roomNumber: '401', name: '主任办公室', buildingArea: 42.0, usableArea: 38.0, useType: '办公用房', useUnit: '办公室', user: '刘主任', status: '使用中' },
    { id: 'r-402', roomNumber: '402', name: '副主任办公室', buildingArea: 32.0, usableArea: 28.0, useType: '办公用房', useUnit: '办公室', user: '陈副主任', status: '使用中' },
    { id: 'r-403', roomNumber: '403', name: '办公室403', buildingArea: 24.0, usableArea: 20.5, useType: '办公用房', useUnit: '政策法规科', user: '孙科长', status: '使用中' },
    { id: 'r-404', roomNumber: '404', name: '办公室404', buildingArea: 24.0, usableArea: 20.5, useType: '办公用房', useUnit: '政策法规科', user: '周副科长', status: '使用中' },
    { id: 'r-405', roomNumber: '405', name: '办公室405', buildingArea: 18.5, usableArea: 16.0, useType: '办公用房', useUnit: '审计科', user: '吴一', status: '使用中' },
    { id: 'r-406', roomNumber: '406', name: '办公室406', buildingArea: 18.5, usableArea: 16.0, useType: '办公用房', useUnit: '审计科', user: '郑二', status: '使用中' },
    { id: 'r-407', roomNumber: '407', name: '小会议室', buildingArea: 35.0, usableArea: 30.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' }
  ],
  'floor-5': [
    { id: 'r-501', roomNumber: '501', name: '大会议室', buildingArea: 120.0, usableArea: 105.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-502', roomNumber: '502', name: '中会议室A', buildingArea: 65.0, usableArea: 58.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-503', roomNumber: '503', name: '中会议室B', buildingArea: 65.0, usableArea: 58.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-504', roomNumber: '504', name: '小会议室A', buildingArea: 35.0, usableArea: 30.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-505', roomNumber: '505', name: '小会议室B', buildingArea: 35.0, usableArea: 30.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-506', roomNumber: '506', name: '培训室', buildingArea: 80.0, usableArea: 72.0, useType: '会议室', useUnit: '-', user: '-', status: '使用中' }
  ],
  'floor-6': [
    { id: 'r-601', roomNumber: '601', name: '办公室601', buildingArea: 22.0, usableArea: 18.5, useType: '办公用房', useUnit: '监察室', user: '钱三', status: '使用中' },
    { id: 'r-602', roomNumber: '602', name: '办公室602', buildingArea: 22.0, usableArea: 18.5, useType: '办公用房', useUnit: '监察室', user: '赵四', status: '使用中' },
    { id: 'r-603', roomNumber: '603', name: '办公室603', buildingArea: 22.0, usableArea: 18.5, useType: '办公用房', useUnit: '纪检组', user: '李五', status: '使用中' },
    { id: 'r-604', roomNumber: '604', name: '办公室604', buildingArea: 22.0, usableArea: 18.5, useType: '办公用房', useUnit: '-', user: '-', status: '空闲' },
    { id: 'r-605', roomNumber: '605', name: '办公室605', buildingArea: 22.0, usableArea: 18.5, useType: '办公用房', useUnit: '-', user: '-', status: '空闲' }
  ],
  'floor-7': [
    { id: 'r-701', roomNumber: '701', name: '档案室A', buildingArea: 85.0, usableArea: 78.0, useType: '服务用房', useUnit: '档案科', user: '-', status: '使用中' },
    { id: 'r-702', roomNumber: '702', name: '档案室B', buildingArea: 85.0, usableArea: 78.0, useType: '服务用房', useUnit: '档案科', user: '-', status: '使用中' },
    { id: 'r-703', roomNumber: '703', name: '设备间', buildingArea: 45.0, usableArea: 40.0, useType: '设备用房', useUnit: '-', user: '-', status: '使用中' },
    { id: 'r-704', roomNumber: '704', name: '机房', buildingArea: 60.0, usableArea: 52.0, useType: '设备用房', useUnit: '信息科', user: '-', status: '使用中' }
  ],
  'floor-nfl-1': [
    { id: 'r-n101', roomNumber: 'N101', name: '办公室N101', buildingArea: 28.0, usableArea: 24.0, useType: '办公用房', useUnit: '后勤科', user: '王一', status: '使用中' },
    { id: 'r-n102', roomNumber: 'N102', name: '办公室N102', buildingArea: 28.0, usableArea: 24.0, useType: '办公用房', useUnit: '后勤科', user: '张二', status: '使用中' },
    { id: 'r-n103', roomNumber: 'N103', name: '仓库A', buildingArea: 45.0, usableArea: 40.0, useType: '服务用房', useUnit: '后勤科', user: '-', status: '使用中' },
    { id: 'r-n104', roomNumber: 'N104', name: '仓库B', buildingArea: 45.0, usableArea: 40.0, useType: '服务用房', useUnit: '后勤科', user: '-', status: '使用中' }
  ],
  'floor-nfl-2': [
    { id: 'r-n201', roomNumber: 'N201', name: '办公室N201', buildingArea: 26.0, usableArea: 22.0, useType: '办公用房', useUnit: '基建科', user: '李三', status: '使用中' },
    { id: 'r-n202', roomNumber: 'N202', name: '办公室N202', buildingArea: 26.0, usableArea: 22.0, useType: '办公用房', useUnit: '基建科', user: '赵四', status: '使用中' },
    { id: 'r-n203', roomNumber: 'N203', name: '办公室N203', buildingArea: 26.0, usableArea: 22.0, useType: '办公用房', useUnit: '-', user: '-', status: '空闲' }
  ],
  'floor-bfl-1': [
    { id: 'r-b101', roomNumber: 'B101', name: '值班室', buildingArea: 32.0, usableArea: 28.0, useType: '服务用房', useUnit: '保卫科', user: '值班人员', status: '使用中' },
    { id: 'r-b102', roomNumber: 'B102', name: '监控室', buildingArea: 40.0, usableArea: 35.0, useType: '设备用房', useUnit: '保卫科', user: '-', status: '使用中' },
    { id: 'r-b103', roomNumber: 'B103', name: '器材室', buildingArea: 25.0, usableArea: 22.0, useType: '服务用房', useUnit: '保卫科', user: '-', status: '使用中' }
  ],
  'floor-st-1': [
    { id: 'r-s101', roomNumber: 'S101', name: '餐厅', buildingArea: 320.0, usableArea: 280.0, useType: '服务用房', useUnit: '后勤科', user: '-', status: '使用中' },
    { id: 'r-s102', roomNumber: 'S102', name: '厨房', buildingArea: 150.0, usableArea: 130.0, useType: '服务用房', useUnit: '后勤科', user: '-', status: '使用中' },
    { id: 'r-s103', roomNumber: 'S103', name: '储藏间', buildingArea: 45.0, usableArea: 40.0, useType: '服务用房', useUnit: '后勤科', user: '-', status: '使用中' },
    { id: 'r-s104', roomNumber: 'S104', name: '配餐间', buildingArea: 35.0, usableArea: 30.0, useType: '服务用房', useUnit: '后勤科', user: '-', status: '使用中' }
  ]
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

// 获取院落目录树
const getCourtyardTree = (req: any) => {
  let keyword = ''
  try {
    const body = JSON.parse(req.body)
    keyword = body?.keyword || ''
  } catch (e) {}

  const data = keyword ? filterTree(courtyardTreeData, keyword) : courtyardTreeData

  const result: Result = {
    code: 200,
    msg: '操作成功',
    data: data,
    success: true
  }
  return result
}

// 获取楼层信息
const getFloorInfo = (req: any) => {
  let floorId = ''
  try {
    const body = JSON.parse(req.body)
    floorId = body?.floorId || ''
  } catch (e) {}

  const info = floorInfoData[floorId] || {
    id: floorId,
    name: '未知楼层',
    buildingName: '-',
    floorNumber: '-',
    buildingArea: '0',
    usableArea: '0',
    roomCount: 0,
    createTime: '-',
    updateTime: '-',
    remark: ''
  }

  const result: Result = {
    code: 200,
    msg: '操作成功',
    data: info,
    success: true
  }
  return result
}

// 获取楼层房屋列表
const getFloorRooms = (req: any) => {
  let floorId = ''
  let page = 1
  let pageSize = 10

  try {
    const body = JSON.parse(req.body)
    floorId = body?.floorId || ''
    page = body?.page || 1
    pageSize = body?.pageSize || 10
  } catch (e) {}

  const allRooms = roomsData[floorId] || []
  const total = allRooms.length
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = allRooms.slice(start, end)

  const result: Result = {
    code: 200,
    msg: '操作成功',
    data: {
      list,
      total
    },
    success: true
  }
  return result
}

export default {
  getCourtyardTree,
  getFloorInfo,
  getFloorRooms
}
