import request from '@/utils/request'


// 区域集合查询
export function areaRunList(data) {
  return request({
    url: '/areaRun/list',
    method: 'post',
    data
  })
}

// 区域更新
export function areaRunUpdate(data) {
  return request({
    url: '/areaRun/update',
    method: 'post',
    data
  })
}
// 区域保存
export function areaRunSave(data) {
  return request({
    url: '/areaRun/save',
    method: 'post',
    data
  })
}
// 区域删除
export function areaRunDelete(data) {
  return request({
    url: '/areaRun/delete',
    method: 'post',
    data
  })
}

