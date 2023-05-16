/*
 * @Author: your name
 * @Date: 2022-04-07 08:59:17
 * @LastEditTime: 2022-04-29 17:19:50
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\shopInfo\index.js
 */
import request from '@/utils/request'

// 商家分页查询
export function shopInfoPage(query) {
  return request({
    url: '/shopInfo/page/list',
    method: 'post',
    data: query
  })
}

// 商家集合查询
export function shopInfoList(query) {
  return request({
    url: '/shopInfo/list',
    method: 'post',
    data: query
  })
}
// 商家同意or驳回
export function shopInfoChoice(query) {
  return request({
    url: '/shopInfo/checkShop',
    method: 'post',
    data: query
  })
}



//商品审核分页查询
export function commodityAuditPage(query) {
  return request({
    url: '/goodsInfo/page/list',
    method: 'post',
    data: query
  })
}

//商品审核同意or驳回
export function commodityAuditChoice(query) {
  return request({
    url: '/goodsInfo/goodsCheck/batchDeal',
    method: 'post',
    data: query
  })
}

