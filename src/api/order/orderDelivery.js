import request from "@/utils/request";

// 运单信息填写
export function orderDeliveryShip(data) {
  return request({
    url: "/orderDelivery/ship",
    method: "post",
    data: data,
  });
}
