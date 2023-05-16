/*
 * @Author: mikeShn
 * @Date: 2022-04-24 17:02:35
 * @LastEditTime: 2022-04-24 17:02:35
 * @FilePath: \digital-earth-PC\src\views\order\orderList\config.js
 * @Description: 文件说明
 */
export const tableList = [
  {
    name: "下单时间",
    prop: "createTime",
  },
  {
    name: "订单金额",
    prop: "orderPrice",
  },
  {
    name: "可结算金额",
    prop: "orderPrice",
  },
  {
    name: "订单编号",
    prop: "orderId",
  },


]
export const formList = [
  {
    name: "下单时间",
    prop: "createTime",
    type: 'daterange',
    endTime: 'endTime',
    startTime: 'startTime'
  },
  {
    name: "订单金额",
    prop: "orderPrice",
    type: 'number'
  },
  {
    name: "订单编号",
    prop: "orderId",
    type:'intNumber'
  },
]
