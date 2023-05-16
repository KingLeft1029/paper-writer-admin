

export const tableList = [{
  name: '运营方',
  prop: "operatorStr",
},
{
  name: '商家名称',
  prop: "shopName",
},
{
  name: '退款/退货时间',
  prop: "refundApplyTime",
},
{
  name: '出账金额（元）',
  prop: "refundAmount",
},
{
  name: '订单编号',
  prop: "orderId",
},
{
  name: '商品名称',
  prop: "goodsName",
},
{
  name: '数量',
  prop: "goodsNum",
},
{
  name: '状态',
  prop: "refundClass",
  options: [
    {
      name: "申请退货",
      value: '1'
    },
    {
      name: "退款中",
      value: '2'
    },
    {
      name: "退货中",
      value: '3'
    },
    {
      name: "撤销退款",
      value: '4'
    },
    {
      name: "撤销退货",
      value: '5'
    },
    {
      name: "退款成功",
      value: '6'
    },
    {
      name: "退货成功",
      value: '7'
    },
    {
      name: "退款失败",
      value: '8'
    },
    {
      name: "退货失败",
      value: '9'
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
  name: '退款/退货时间',
  prop: "refundApplyTime",
  type: 'daterange',
  endTime: 'endTime',
  startTime: 'startTime'
},
{
  name: '出账金额（元）',
  prop: "refundAmount",
  type: 'number',
},
{
  name: '订单编号',
  prop: "orderId",
  type: 'intNumber',
},
{
  name: '商品名称',
  prop: "goodsName",
  type: 'input',
},
{
  name: '状态',
  prop: "refundClass",
  type: 'select',
  options: [
    {
      name: "申请退货",
      value: '1'
    },
    {
      name: "退款中",
      value: '2'
    },
    {
      name: "退货中",
      value: '3'
    },
    {
      name: "撤销退款",
      value: '4'
    },
    {
      name: "撤销退货",
      value: '5'
    },
    {
      name: "退款成功",
      value: '6'
    },
    {
      name: "退货成功",
      value: '7'
    },
    {
      name: "退款失败",
      value: '8'
    },
    {
      name: "退货失败",
      value: '9'
    }]
},
]