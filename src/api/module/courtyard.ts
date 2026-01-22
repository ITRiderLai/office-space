import Http from '../http'

// 院落目录树节点
export interface CourtyardTreeNode {
  id: string
  name: string
  type: 'province' | 'city' | 'district' | 'courtyard' | 'building' | 'floor'
  children?: CourtyardTreeNode[]
}

// 楼层信息
export interface FloorInfo {
  id: string
  name: string
  buildingName: string
  floorNumber: string
  buildingArea: string
  usableArea: string
  roomCount: number
  createTime: string
  updateTime: string
  remark: string
}

// 房间信息
export interface RoomItem {
  id: string
  roomNumber: string
  name: string
  buildingArea: number
  usableArea: number
  useType: string
  useUnit: string
  user: string
  status: string
}

// 房间列表响应
export interface FloorRoomsResponse {
  list: RoomItem[]
  total: number
}

// 获取院落目录树
export function getCourtyardTree(keyword?: string) {
  return Http.post<CourtyardTreeNode[]>('/courtyard/tree', { keyword })
}

// 获取楼层信息
export function getFloorInfo(floorId: string) {
  return Http.post<FloorInfo>('/courtyard/floor/info', { floorId })
}

// 获取楼层房屋列表
export function getFloorRooms(params: { floorId: string; page: number; pageSize: number }) {
  return Http.post<FloorRoomsResponse>('/courtyard/floor/rooms', params)
}
