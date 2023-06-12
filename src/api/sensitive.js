import request from '@/utils/request'

// 查
export function listApi(query) {
  return request({
    url: '/business/words/list',
    method: 'get',
    params: query
  })
}
// 增
export function addApi(data) {
  return request({
    url: '/business/words',
    method: 'post',
    data,
  })
}

// 删
export function delApi(ids) {
  return request({
    url: '/business/chart/' + ids,
    method: 'delete'
  })
}

// 修改
export function editApi(data) {
  return request({
    url: '/business/words',
    method: 'put',
    data: data
  })
}

// 详细信息
export function detailApi(id) {
  return request({
    url: '/business/words/'+id,
    method: 'get'
  })
}

