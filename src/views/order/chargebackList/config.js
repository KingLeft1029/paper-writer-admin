/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-22 16:45:27
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\order\chargebackList\config.js
 * @Description: 文件说明
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
    name: '订单编号',
    prop: "orderId",
    width: '200'
  },
  {
    name: '收货人',
    prop: "receiverName",
  },
  {
    name: '收货人手机号',
    prop: "receiverPhone",
  },
  {
    name: '退款金额(元)',
    prop: "refundAmount",
  },
  {
    name: '下单时间',
    prop: "createTime",

  },
  {
    name: '状态',
    prop: "refundClass",
    options: [{
        name: '申请退货',
        value: '1'
      },
      {
        name: '退款中',
        value: '2'
      },
      {
        name: '退货中',
        value: '3'
      },
      {
        name: '撤销退款',
        value: '4'
      },
      {
        name: '撤销退货',
        value: '5'
      },
      {
        name: '退款成功',
        value: '6'
      },
      {
        name: '退货成功',
        value: '7'
      },
      {
        name: '退款失败',
        value: '8'
      },
      {
        name: '退货失败',
        value: '9'
      }
    ]
  },
  {
    name: "订单类型",
    prop: "preSaleFlag",
    options: [{
        value: '0',
        name: '普通订单'
      },
      {
        value: '1',
        name: '预售订单'
      }
    ]
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
    type: "input"
  },
  {
    name: '订单编号',
    prop: "orderId",
    type: "input"
  },
  {
    name: '收货人',
    prop: "receiverName",
    type: "input"
  },
  {
    name: '收货人手机号',
    prop: "receiverPhone",
    type: "intNumber",
  },
  {
    name: '退款金额',
    prop: "refundPrice",
    type: "number",
  },
  {
    name: '下单时间',
    prop: "createTime",
    type: "daterange",
    endTime: 'endTime',
    startTime: 'startTime'
  },
  {
    name: '状态',
    prop: "refundClass",
    type: "select",
    options: [{
        name: '申请退货',
        value: '1'
      },
      {
        name: '退款中',
        value: '2'
      },
      {
        name: '退货中',
        value: '3'
      },
      {
        name: '撤销退款',
        value: '4'
      },
      {
        name: '撤销退货',
        value: '5'
      },
      {
        name: '退款成功',
        value: '6'
      },
      {
        name: '退货成功',
        value: '7'
      },
      {
        name: '退款失败',
        value: '8'
      },
      {
        name: '退货失败',
        value: '9'
      }
    ]

  },
  {
    name: "订单类型",
    prop: "preSaleFlag",
    type: 'select',
    options: [{
        value: '0',
        name: '普通订单'
      },
      {
        value: '1',
        name: '预售订单'
      }
    ]
  },
]
