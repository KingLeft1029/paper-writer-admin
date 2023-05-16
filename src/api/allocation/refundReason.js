/*
 * @Author: your name
 * @Date: 2022-04-07 14:00:54
 * @LastEditTime: 2022-04-07 14:02:25
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\allocation\refundReason.js
 */
import request from '@/utils/request'

// 查询退货/退款原因列表
export function listRefundReason(data) {
  return request({
    url: '/refundReason/page/list',
    method: 'post',
    data: data
  })
}

// 查询退货/退款原因详细
export function getRefundReason(reasonId) {
  return request({
    url: '/refundReason/queryById/' + reasonId,
    method: 'get'
  })
}

// 新增退货/退款原因
export function addRefundReason(data) {
  return request({
    url: '/refundReason/save',
    method: 'post',
    data: data
  })
}

// 修改退货/退款原因
export function updateRefundReason(data) {
  return request({
    url: '/refundReason/update',
    method: 'post',
    data: data
  })
}

// 删除退货/退款原因
export function delRefundReason(reasonId) {
  return request({
    url: '/refundReason/delete/' + reasonId,
    method: 'delete'
  })
}

// 导出退货/退款原因
export function exportRefundReason(query) {
  return request({
    url: '/refundReason/export',
    method: 'get',
    params: query
  })
}
