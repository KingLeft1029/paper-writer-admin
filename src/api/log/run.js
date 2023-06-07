import request from '@/utils/request'


//运行日志列表
export function runPage(data) {
  return request({
    url: '/log/run/pageList',
    method: 'post',
    data
  })
}


//运行日志删除
export function runDelete(data) {
  return request({
    url: '/log/run/deleteBatch',
    method: 'post',
    data
  })
}

