// 首页工作台 Mock 数据

// 获取首页概览数据
const getDashboardOverview = () => {
  return {
    code: 200,
    msg: '操作成功',
    data: {
      // 总体概况
      overview: {
        unitCount: 76,
        staffCount: 2065,
        courtyardCount: 18,
        buildingCount: 56,
        buildingArea: 145.36,
        landArea: 465.24
      },
      // 机构类型
      orgTypes: [
        { name: '行政', value: 1130 },
        { name: '参公', value: 998 },
        { name: '事业', value: 66 },
        { name: '其他', value: 280 }
      ],
      // 编制人数
      staffLevels: [
        { level: '正省级', count: 2000 },
        { level: '副省级', count: 2000 },
        { level: '正厅级', count: 6256 },
        { level: '副厅级', count: 3462 },
        { level: '副处级', count: 16235 },
        { level: '处级以下', count: 3866 }
      ],
      // 使用情况
      usageData: [
        { type: '自用', value: 600 },
        { type: '闲置', value: 50 },
        { type: '出租', value: 100 },
        { type: '出借', value: 150 }
      ],
      // 办公用房面积
      roomAreas: [
        { type: '办公室', area: 2000 },
        { type: '服务用房', area: 2000 },
        { type: '设备用房', area: 3256 },
        { type: '附属用房', area: 3462 },
        { type: '技术业务用房', area: 16235 },
        { type: '其他', area: 3866 }
      ]
    },
    success: true
  }
}

export default {
  getDashboardOverview
}
