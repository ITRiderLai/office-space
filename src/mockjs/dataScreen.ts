import { Result } from "../types/result";

const getDataScreenData = () => {
  const result: Result = {
    code: 200,
    msg: "操作成功",
    data: {
      // 顶部统计数据
      stats: {
        unitCount: 1589,
        courtyardCount: 1142,
        buildingCount: 1854,
        buildingArea: 1454128.95,
        landArea: 3246132.94,
        staffCount: 46545,
        workCount: 52326
      },
      // 编制人数/办公人数数据
      staffData: [
        { category: '市级正职', staffCount: 4, workCount: 4 },
        { category: '市级副职', staffCount: 29, workCount: 31 },
        { category: '正局(处)级', staffCount: 169, workCount: 199 },
        { category: '副局(处)级', staffCount: 510, workCount: 610 },
        { category: '局(处)级以下', staffCount: 6083, workCount: 4189 }
      ],
      // 管理范围数据
      managementData: [
        { category: '党政', value: 1130, color: '#0DA4F6', color2: '#0D69F6' },
        { category: '参公', value: 91, color: '#C87BFF', color2: '#8C33CB' },
        { category: '事业', value: 188, color: '#FF9392', color2: '#D43D3A' },
        { category: '其他', value: 180, color: '#FFC692', color2: '#C45920' }
      ],
      // 地图区域数据
      regionData: [
        { name: '个旧市', value: 131373 },
        { name: '开远市', value: 87621 },
        { name: '蒙自市', value: 300883 },
        { name: '弥勒市', value: 164300 },
        { name: '屏边苗族自治县', value: 77454 },
        { name: '建水县', value: 141599 },
        { name: '石屏县', value: 94048 },
        { name: '泸西县', value: 87905 },
        { name: '元阳县', value: 78667 },
        { name: '红河县', value: 97928 },
        { name: '金平苗族瑶族傣族自治县', value: 82667 },
        { name: '绿春县', value: 67601 },
        { name: '河口瑶族自治县', value: 52000 }
      ],
      // 房屋面积分布数据
      areaDistribution: [
        { region: '个旧市', area: 131373.62 },
        { region: '开远市', area: 87621 },
        { region: '蒙自市', area: 300883.34 },
        { region: '弥勒市', area: 164300.2 },
        { region: '屏边苗族自治县', area: 77454.01 },
        { region: '建水县', area: 141599.19 },
        { region: '石屏县', area: 94048.77 },
        { region: '泸西县', area: 87905.12 },
        { region: '元阳县', area: 78667.32 },
        { region: '红河县', area: 97928.19 },
        { region: '金平苗族瑶族傣族自治县', area: 82667.4 },
        { region: '绿春县', area: 67601.66 },
        { region: '河口瑶族自治县', area: 52000 }
      ],
      // 房屋使用情况数据（环形图）
      usageData: [
        { name: '自用', value: 60, color: '#2C80FF' },
        { name: '闲置', value: 15, color: '#5C6BED' },
        { name: '出租', value: 10, color: '#D1933C' },
        { name: '出借', value: 5, color: '#12B5AE' }
      ],
      // 房屋面积类型数据（饼图）
      areaTypeData: [
        { name: '办公用房', value: 30, color: '#DF8A81' },
        { name: '服务用房', value: 30, color: '#3E83E8' },
        { name: '设备用房', value: 20, color: '#40BEFF' },
        { name: '附属用房', value: 10, color: '#DAD17E' },
        { name: '技术业务用房', value: 10, color: '#6AE5B2' }
      ]
    },
    success: true
  };
  return result;
}

export default {
  getDataScreenData
}
