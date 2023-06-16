import request from '@/utils/request'

// 查
export function listApi(query) {
  return request({
    url: '/business/book/list',
    method: 'get',
    params: query
  })
}



// 导出
export function exportApi(query) {
  return request({
    url: '/business/book/export',
    method: 'get',
    params: query
  })
}
// 详细信息
export function detailApi(id) {
  return request({
    url: '/business/book/'+id,
    method: 'get'
  })
}

