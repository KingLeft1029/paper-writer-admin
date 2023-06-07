import request from '@/utils/request'


export function charData() {
  return request({
    url: '/chart/charData',
    method: 'get',
  })
}


