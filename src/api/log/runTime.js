import request from '@/utils/request'


//运行日志列表
export function elapsedPage(data) {
  return request({
    url: '/log/elapsed/pageList',
    method: 'post',
    data
  })
}


//运行日志删除
export function elapsedDelete(data) {
  return request({
    url: '/log/elapsed/deleteBatch',
    method: 'post',
    data
  })
}

