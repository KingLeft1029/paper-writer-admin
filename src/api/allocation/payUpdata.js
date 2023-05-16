/*
 * @Author: your name
 * @Date: 2022-04-24 14:25:39
 * @LastEditTime: 2022-04-24 11:31:29
 * @LastEditors: Please set LastEditors
 * @Description:支付方式
 */

import request from "@/utils/request"
//状态更新
export function updata(data) {
  return request({
    url: "/paymentConfig/update",
    method: "POST",
    data,
  })
}

//状态列表查询
export function payList(data) {
  return request({
    url: "/paymentConfig/page/list",
    method: "post",
    data,
  })
}

export function payAll() {
  return request({
    url: "/paymentConfig/list",
    method: "get",
  })
}
