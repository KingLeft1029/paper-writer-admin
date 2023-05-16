/*
 * @Author: your name
 * @Date: 2022-04-08 11:03:39
 * @LastEditTime: 2022-04-08 11:47:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\merchant\platform.js
 */
import request from '@/utils/request'

// 查询商家管理平台端列表
export function listShopInfo(data) {
  return request({
    url: '/shopInfo/page/list',
    method: 'post',
    data: data
  })
}

// 查询商家管理平台端详细
export function getShopInfo(shopId) {
  return request({
    url: '/shopInfo/queryById/' + shopId,
    method: 'get'
  })
}

// 新增商家管理平台端
export function addShopInfo(data) {
  return request({
    url: '/shopInfo/save',
    method: 'post',
    data: data
  })
}

// 修改商家管理平台端
export function updateShopInfo(data) {
  return request({
    url: '/shopInfo/update',
    method: 'post',
    data: data
  })
}

// 删除商家管理平台端
export function delShopInfo(shopId) {
  return request({
    url: '/shopInfo/delete/' + shopId,
    method: 'delete'
  })
}

// 导出商家管理平台端
export function exportShopInfo(query) {
  return request({
    url: '/shopInfo/export',
    method: 'get',
    params: query
  })
}

// 商家管理平台端修改密码
export function updatePwd(query) {
  return request({
    url: '/shopInfo/updatePwd/' + query,
    method: 'put',
  })
}