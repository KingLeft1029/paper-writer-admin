/*
 * @Author: your name
 * @Date: 2022-04-25 21:09:22
 * @LastEditTime: 2022-04-27 16:28:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital_earth_PC\src\views\finance\transaction\makeDetail\config.js
 */

export const tableList = [{
  name: '运营方',
  prop: "operatorStr",
},
{
  name: '商家名称',
  prop: "shopName",
},
{
  name: '下单时间',
  prop: "payTime",
},
{
  name: '进账金额（元）',
  prop: "payMoney",
},
{
  name: '订单编号',
  prop: "orderId",
},
{
  name: '订单类型',
  prop: "preSaleFlag",
  options: [{
    value: '0',
    name: '普通订单'
  }, {
    value: '1',
    name: '预售订单'
  }]
},

]
export const formList = [{
  name: '运营方',
  prop: "operator",
  type: 'select',
  options: [{
    name: '自营',
    value: '0'
  },
  {
    name: '商家',
    value: '1'
  },
  ]
},
{
  name: '商家名称',
  prop: "shopName",
  type: 'input'
},
{
  name: '下单时间',
  prop: "payTime",
  type: 'daterange',
  endTime: 'payEndTime',
  startTime: 'payStartTime'

},
{
  name: '进账金额（元）',
  prop: "payMoney",
  type: "number",
},
{
  name: '订单编号',
  prop: "orderId",
  type: 'intNumber'
},
// {
//   name: '订单状态',
//   prop: "orderType",
//   type: 'select',
//   options: [
//     {
//       name: '待发货',
//       value: '1'
//     },
//     {
//       name: '待收货',
//       value: '2'
//     },
//     {
//       name: '已完成',
//       value: '3'
//     },
//   ]
// },
{
  name: "订单类型",
  prop: "preSaleFlag",
  type: "select",
  options: [{
    value: '0',
    name: '普通订单'
  }, {
    value: '1',
    name: '预售订单'
  }]
}
]
