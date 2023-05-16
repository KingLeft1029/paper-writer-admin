
export const tableList = [{
  name: '订单编号',
  prop: "orderId",
},
{
  name: '商品名称',
  prop: "goodsName",
},
{
  name: '商家名称',
  prop: "shopName",
},
{
  name: '用户昵称',
  prop: "createName",
},
{
  name: '用户手机号',
  prop: "phonenumber",
},
{
  name: '审核状态',
  prop: "checkStatus",
  options: [{
    value: '0',
    name: '未审核'
  },
  {
    value: '1',
    name: '通过'
  }, {
    value: '2',
    name: '拒绝'
  }]
},
{
  name: '评论内容',
  prop: "evaDetail",
},

]
export const formList = [{
  name: '订单编号',
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
  name: '用户昵称',
  prop: "createName",
  type: 'input',

},
{
  name: '用户手机号',
  prop: "phonenumber",
  type: "intNumber",

},
{
  name: '审核状态',
  prop: "checkStatus",
  type: 'select',
  options: [{
    value: '0',
    name: '未审核'
  },
  {
    value: '1',
    name: '通过'
  }, {
    value: '2',
    name: '拒绝'
  }]
},
{
  name: '评论内容',
  prop: "evaDetail",
  type: 'input',
},
{
  name: '审批人',
  prop: "checkUserName",
  type: 'input',
},
{
  name: '审批时间',
  prop: "checkTime",
  type: 'date',
},
]
