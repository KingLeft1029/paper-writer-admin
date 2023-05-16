
/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-29 19:57:57
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\business\postage\config.js
 * @Description: 文件说明
 */
export const tableList = [
  {
    name: '商家名称',
    prop: "shopName",
  },
  {
    name: '申请结算时间',
    prop: "applyTime",
  },
  {
    name: '结算金额（元）',
    prop: "settlePrice",
  },
  {
    name: '申请状态',
    prop: "state",
    options: [{
      name: '失败',
      value: '0'
    },
    {
      name: '已申请',
      value: '1'
    },
    {
      name: '成功',
      value: '2'
    }
    ]
  },

]
export const formList = [
  {
    name: '商家名称',
    prop: "shopName",
    type: 'input',

  },
  {
    name: '申请结算时间',
    prop: 'applyTime',
    type: 'daterange',
    endTime: 'endTime',
    startTime: 'startTime'
  },
  {
    name: '结算金额（元）',
    prop: "settlePrice",
    type: "number",

  },
  {
    name: '申请状态',
    prop: "state",
    type: 'select',
    options: [{
      name: '失败',
      value: '0'
    },
    {
      name: '已申请',
      value: '1'
    },
    {
      name: '成功',
      value: '2'
    }
    ]
  },
]

export const orderTableList = [{
  name: '订单编号',
  prop: 'orderId'
}, {
  name: '订单金额',
  prop: 'orderPrice'
}, {
  name: '下单时间',
  prop: 'createTime'
}, {
  name: '可结算金额',
  prop: 'settlePrice'
}]
export const orderFormList = [{
  name: '订单编号',
  prop: 'orderId',
  type: 'intNumber'
}, {
  name: '金额',
  prop: 'orderPrice',
  type: 'number'
}, {
  name: '下单时间',
  prop: 'createTime',
  type: 'daterange',
  endTime: 'endTime',
  startTime: 'startTime'
}]

export const addSettlementForm = [{
  name: '发票类型',
  prop: 'invoiceType',
  type: 'select',
  options: [{
    value: '0',
    name: '电子发票'
  },
  {
    value: '1',
    name: '纸质普通发票'
  },
  {
    value: '2',
    name: '纸质专用发票'
  },
  {
    value: '3',
    name: '增值税专用发票'
  },
  {
    value: '4',
    name: '增值税普通发票'
  }],

}, {
  name: '发票图片',
  prop: 'invoicePic',
  type: 'uploadImg'
}, {
  name: '快递公司',
  prop: 'deliveryCompanyId',
  type: 'select',
  options: [],
  label: 'companyName',
  value: 'companyId',

}, {
  name: '快递单号',
  prop: 'sendCode',
  type: 'intNumber'
}]

