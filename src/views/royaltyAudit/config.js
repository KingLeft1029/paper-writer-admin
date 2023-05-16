export const tableList = [{
  name: '订单号',
  prop: "orderId",
},
{
  name: "运营方",
  prop: "operator",
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
},
{
  name: '商品名称',
  prop: "goodsName",
},
{
  name: '商品数量',
  prop: "goodsNum",
},
{
  name: '商品价格',
  prop: "totalGoodsPrice",
},
{
  name: '抽成价格',
  prop: "cutPrice",
},
{
  name: '抽成比例',
  prop: "cutNum",
  unit: '%'
},
]

export const formList = [{
  name: '订单号',
  prop: "orderId",
  type: 'intNumber',
},
{
  name: '商品名称',
  prop: "goodsName",
  type: "input",
},
{
  name: '商家名称',
  prop: "shopName",
  type: 'input'
},
{
  name: "运营方",
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
  name: '价格',
  prop: "goodsPrice",
  type: "intNumber",
}
]