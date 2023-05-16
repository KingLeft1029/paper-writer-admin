/*
 * @Author: your name
 * @Date: 2022-04-06 18:18:00
 * @LastEditTime: 2022-04-08 16:32:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\expressage\expressage.js
 */
import request from '@/utils/request'

// 平台端审核商家是否通过
export function checkShop(data) {
  return request({
    url: '/shopInfo/checkShop',
    method: 'post',
    data: data
  })
}

// 查询自己的商户信息
export function queryMyById() {
  return request({
    url: '/shopInfo/queryById',
    method: 'get',
  })
}
// 查询自己的商户信息
export function queryById(id) {
  return request({
    url: '/shopInfo/' + id,
    method: 'get',
  })
}


// 商家保存
export function shopSave(data) {
  return request({
    url: '/shopInfo/shopSave',
    method: 'post',
    data: data
  })
}
// 商家提审/重新提审
export function submitCheck(data) {
  return request({
    url: '/shopInfo/submitCheck',
    method: 'post',
    data: data
  })
}
