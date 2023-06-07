import request from '@/utils/request'

// 气象站集合查询
export function stationInfoList(data) {
  return request({
    url: '/stationInfo/list',
    method: 'post',
    data
  })
}

// 气象站集合查询
export function batchDelete(data) {
  return request({
    url: '/stationInfo/delete',
    method: 'post',
    data
  })
}

// 气象站保存
export function save(data) {
  return request({
    url: '/stationInfo/save',
    method: 'post',
    data
  })
}


// 气象站更新
export function update(data) {
  return request({
    url: '/stationInfo/update',
    method: 'post',
    data
  })
}

// 气象数据统计报表
export function stationDataPage(data) {
  return request({
    url: '/stationData/page/list',
    method: 'post',
    data
  })
}
