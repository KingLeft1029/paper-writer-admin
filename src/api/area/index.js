import request from '@/utils/request'


// 区域集合查询
export function areaInfoList(data) {
  return request({
    url: '/areaInfo/list',
    method: 'post',
    data
  })
}
export function areaQueryById(id) {
  return request({
    url: '/areaInfo/queryById/' + id,
    method: 'get',
  })
}
// 区域更新
export function areaInfoUpdate(data) {
  return request({
    url: '/areaInfo/update',
    method: 'post',
    data
  })
}
// 区域保存
export function areaInfoSave(data) {
  return request({
    url: '/areaInfo/save',
    method: 'post',
    data
  })
}
// 区域删除
export function areaInfoDelete(data) {
  return request({
    url: '/areaInfo/delete',
    method: 'post',
    data
  })
}

// 区域删除
export function uploadList(data) {
  return request({
    url: '/areaInfo/importData',
    method: 'post',
    data
  })
}

