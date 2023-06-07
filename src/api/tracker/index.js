import request from '@/utils/request'

// 跟踪器数据采集信息集合查询
export function trackerDataList(data) {
  return request({
    url: '/trackerData/list',
    method: 'post',
    data
  })
}
// 追踪器集合查询
export function trackerInfoList(data) {
  return request({
    url: '/trackerInfo/list',
    method: 'post',
    data
  })
}


// 追踪器根据条件全部复位
export function trackerResetALL(data) {
  return request({
    url: '/trackerInfo/trackerResetALL',
    method: 'post',
    data
  })
}
// 追踪器批量复位
export function trackerReset(ids) {
  return request({
    url: '/trackerInfo/trackerReset',
    method: 'post',
    data:ids
  })
}

// 追踪器集合分页查询
export function trackerInfoPage(data) {
  return request({
    url: '/trackerInfo/page/list',
    method: 'post',
    data
  })
}

export function batchDelete(data) {
  return request({
    url: '/trackerData/delete',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/trackerData/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/trackerData/update',
    method: 'post',
    data
  })
}

export function trackerDataPage(data) {
  return request({
    url: '/trackerData/page/list',
    method: 'post',
    data
  })
}

