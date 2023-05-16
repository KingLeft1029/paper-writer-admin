/*
 * @Author: your name
 * @Date: 2022-04-06 17:58:27
 * @LastEditTime: 2022-04-06 18:02:42
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\business\deliveryCompanyManage.js
 */
import request from '@/utils/request'

// 查询快递公司集合
export function deliveryCompanyManageList(data) {
  return request({
    url: '/deliveryCompanyManage/list',
    method: 'post',
    data: data
  })
}

// 查询快递公司列表
export function listDeliveryCompanyManage(data) {
  return request({
    url: '/deliveryCompanyManage/page/list',
    method: 'post',
    data: data
  })
}

// 查询快递公司详细
export function getDeliveryCompanyManage(companyId) {
  return request({
    url: '/deliveryCompanyManage/queryById/' + companyId,
    method: 'get'
  })
}

// 新增快递公司
export function addDeliveryCompanyManage(data) {
  return request({
    url: '/deliveryCompanyManage/save',
    method: 'post',
    data: data
  })
}

// 修改快递公司
export function updateDeliveryCompanyManage(data) {
  return request({
    url: '/deliveryCompanyManage/update',
    method: 'post',
    data: data
  })
}

// 删除快递公司
export function delDeliveryCompanyManage(companyId) {
  return request({
    url: '/deliveryCompanyManage/delete/' + companyId,
    method: 'delete'
  })
}

// 导出快递公司
export function exportDeliveryCompanyManage(query) {
  return request({
    url: '/deliveryCompanyManage/export',
    method: 'get',
    params: query
  })
}
