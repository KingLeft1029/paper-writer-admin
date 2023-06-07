import request from '@/utils/request'


//复位日志列表
export function resetPage(data) {
  return request({
    url: '/log/reset/pageList',
    method: 'post',
    data
  })
}


//复位日志删除
export function resetDelete(data) {
  return request({
    url: '/log/reset/deleteBatch',
    method: 'post',
    data
  })
}

//复位日志删除
export function trackerNames(data) {
  return request({
    url: '/log/reset/trackerNames',
    method: 'post',
    data
  })
}
