/*
 * @Author: your name
 * @Date: 2022-04-11 14:58:07
 * @LastEditTime: 2022-04-24 17:06:02
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital-earth-PC\src\api\order\orderList.js
 */
/*
 * @Author: your name
 * @Date: 2022-04-07 08:59:17
 * @LastEditTime: 2022-04-08 17:35:59
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\business\goodsInfo.js
 */
import request from "@/utils/request"

// 查询订单列表
export function listOrderInfo(data) {
  return request({
    url: "/orderInfo/page/list",
    method: "post",
    data: data,
  })
}
// 查询退单列表
export function refundList(data) {
  return request({
    url: "/orderInfo/refundList",
    method: "post",
    data: data,
  })
}
// 订单保存
export function orderAdd(data) {
  return request({
    url: "/orderInfo/save",
    method: "post",
    data: data,
  })
}

// 退款审核 参数为退款单id和审核结果0不通过1通过
export function CheckRefundOrder(data) {
  return request({
    url: "/orderInfo/refund_review",
    method: "post",
    data: data,
  })
}
// 订单 更新备注
export function orderInfoUpdate(data) {
  return request({
    url: "/orderInfo/update?",
    method: "post",
    data: data
  })
}
