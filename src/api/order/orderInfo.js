import request from "@/utils/request"

// 查询订单明细
export function getOrderDetail(id) {
  return request({
    // url: "/orderInfo/orderDetail/" + id,
    url: "/orderInfo/pc/getOrderDetail",
    method: "get",
    params: id
  })
}

// 可结算订单列表
export function canSettleList(data) {
  return request({
    url: "/orderInfo/canSettleList",
    method: "post",
    data
  })
}

