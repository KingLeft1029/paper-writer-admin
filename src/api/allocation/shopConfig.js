/*
 * @Author: wangzuo wangzuo@diandong.com
 * @Date: 2023-01-29 16:17:38
 * @LastEditors: wangzuo wangzuo@diandong.com
 * @LastEditTime: 2023-01-30 14:13:25
 * @FilePath: \age-look-pc\src\api\allocation\shopConfig.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: your name
 * @Date: 2022-04-07 16:46:39
 * @LastEditTime: 2023-01-30 11:09:56
 * @LastEditors: wangzuo wangzuo@diandong.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital-earth-PC\src\api\allocation\shopConfig.js
 */
import request from '@/utils/request'

// 查询配置列表
export function getShopConfig(data) {
  return request({
    url: '/shop/config/getShopConfig?type=' + data,
    method: 'get',
  })
}

// 保存配置列表
export function updateShopConfig(data) {
  return request({
    url: '/shop/config/editShopConfig',
    method: 'post',
    data
  })
}

// 功能开关
export function functionConfig() {
  return request({
    url: '/shop/config/function',
    method: 'GET',
  })
}
// type类型0启动页1引导页2关于我们3用户服务协议4系统版本5首页图片6订单基础配置7功能开关8数量配置9平台配置 10入驻配置11WEB用户端配置
// 获取启动页配置
export function startPage(type) {
  return request({
    url: `/shop/config/getShopConfig?type=${type}`,
    method: 'GET',
  })
}
// 获取引导页配置
export function guidePage() {
  return request({
    url: '/shop/config/guide_page',
    method: 'GET',
  })
}

// 订单基础配置
export function orderConfig() {
  return request({
    url: '/shop/config/order',
    method: 'GET',
  })
}
// web用户配置项查询
export function webUserConfig() {
  return request({
    url: '/shop/config/web_user_config',
    method: 'GET',
  })
}

// 数量配置项查询
export function quantityConfig() {
  return request({
    url: '/shop/config/quantity',
    method: 'GET',
  })
}

// 入驻配置项查询
export function marginConfig() {
  return request({
    url: '/shop/config/margin',
    method: 'GET',
  })
}
