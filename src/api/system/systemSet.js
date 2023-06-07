import request from '@/utils/request'


//配置项保存
export function editConfig(data) {
  return request({
    url: '/systemConfig/editConfig',
    method: 'PUT',
    data
  })
}

//配置项查询
export function getConfig(data) {
  return request({
    url: '/systemConfig/getConfig',
    method: 'get',
    data
  })
}

