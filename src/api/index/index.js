
import request from '@/utils/request'

// 待办事项
export function backlog() {
  return request({
    url: '/business/index/backlog',
    method: 'GET',
  })
}

// 订单概览
export function order() {
  return request({
    url: '/business/index/order',
    method: 'GET',
  })
}

// 商品概览
export function goods() {
  return request({
    url: '/business/index/goods',
    method: 'GET',
  })
}

// 平台总概览
export function platform() {
  return request({
    url: '/business/index/platform',
    method: 'GET',
  })
}

// 交易趋势
export function orderStatistics(data) {
  return request({
    url: '/business/index/orderStatistics',
    method: 'POST',
    data
  })
}

// PC后台-获取消息数量
export function getTotalNoticeCount() {
  return request({
    url: '/userNotice/getTotalNoticeCount',
    method: 'get',
  })
}
