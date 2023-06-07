import request from '@/utils/request'

// 平单轴集合查询
export function list(data) {
  return request({
    url: '/controllerInfo/list',
    method: 'post',
    data
  })
}

export function batchDelete(data) {
  return request({
    url: '/controllerInfo/delete',
    method: 'post',
    data
  })
}

export function save(data) {
  return request({
    url: '/controllerInfo/save',
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: '/controllerInfo/update',
    method: 'post',
    data
  })
}