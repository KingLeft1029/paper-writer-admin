/*
 * @Author: your name
 * @Date: 2022-04-07 08:59:17
 * @LastEditTime: 2022-04-22 15:11:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\sysRegion\index.js
 */
import request from "@/utils/request";

// 商品统计
export function goods(query) {
  return request({
    url: "/statisticalAnalysis/goods",
    method: "post",
    data: query,
  });
}

export function shop(query) {
  return request({
    url: "/statisticalAnalysis/shop",
    method: "post",
    data: query,
  });
}

export function order(query) {
  return request({
    url: "/statisticalAnalysis/order",
    method: "post",
    data: query,
  });
}

export function user(query) {
  return request({
    url: "/statisticalAnalysis/user",
    method: "post",
    data: query,
  });
}
