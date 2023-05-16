import request from '@/utils/request'

export function getDeliveryMap(query) {
  return request({
    url: '/kuaidi100/getDeliveryMapView',
    method: 'get',
    params: query
  })
}
