import request from '@/utils/request'

// 查
export function listApi(query) {
  return request({
    url: '/test/user/list',
    method: 'get',
    params: query
  })
}
// 增
export function addApi(data) {
  return request({
    url: '/test/user/save',
    method: 'post',
    data,
  })
}

// 删
export function delApi(ids) {
  return request({
    url: '/test/user/' + ids,
    method: 'delete'
  })
}

// 修改
export function editApi(data) {
  return request({
    url: '/test/user/update',
    method: 'put',
    data: data
  })
}
// 导出
export function exportApi(query) {
  return request({
    url: '/business/chart/export',
    method: 'get',
    params: query
  })
}
// 详细信息
export function detailApi(id) {
  return request({
    url: '/test/user/'+id,
    method: 'get'
  })
}

