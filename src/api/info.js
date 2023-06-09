import request from '@/utils/request'

// 查
export function listApi(query) {
  return request({
    url: '/business/management/list',
    method: 'get',
    params: query
  })
}


// 修改
export function editApi(data) {
  return request({
    url: '/business/management',
    method: 'put',
    data: data
  })
}

// 详细信息
export function detailApi(id) {
  return request({
    url: '/business/management/'+id,
    method: 'get'
  })
}

