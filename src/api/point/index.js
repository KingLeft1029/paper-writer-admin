import request from '@/utils/request'

export function trackerInfoList(data) {
  return request({
    url: '/trackerInfo/list',
    method: 'post',
    data
  })
}

export function importData(data) {
  return request({
    url: '/controllerInfo/position/importData',
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}