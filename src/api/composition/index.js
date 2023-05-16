import request from '@/utils/request'

export function compositionPage(query) {
    return request({
        url: '/orderDetail/cutPageList',
        method: 'post',
        data: query
    })
}

export function cutListTotal(query) {
  return request({
      url: '/orderDetail/cutListTotal',
      method: 'post',
      data: query
  })
}
