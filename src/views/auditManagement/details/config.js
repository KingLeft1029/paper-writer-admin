
export const tableList1 = [{
  name: '订单编号',
  prop: "orderId",
},
{
  name: '商家名称',
  prop: "shopName",
},
{
  name: '商品图片',
  prop: "goodsPic",
  type: 'image'
},
{
  name: '商品名称',
  prop: "goodsName",
},
{
  name: '审核状态',
  prop: "checkStatus",
  options: [{
    value: '0',
    name: '未提交'
  },
  {
    value: '1',
    name: '审核中'
  }, {
    value: '2',
    name: '通过'
  }]
},
{
  name: '审批人',
  prop: "checkUserName",
},
{
  name: '审批时间',
  prop: "checkTime",
},
]
export const tableList2 = [{
  name: '用户头像',
  prop: "userAvl",
  type: 'image',
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
  name: '是否匿名',
  prop: "anonymousFlag",
  options: [{
    value: '1',
    name: '是'
  },
  {
    value: '0',
    name: '否'
  }]

},
{
  name: '评论时间',
  prop: "createTime",
},
]
export const tableList3 = [{
  name: '商品名称',
  prop: "goodsName",
},
{
  name: '评论时间',
  prop: "createTime",
},

{
  name: '是否匿名',
  prop: "anonymousFlag",
  options: [{
    value: '1',
    name: '是'
  },
  {
    value: '0',
    name: '否'
  }]

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
  name: '审批人',
  prop: "checkUserName",
},
{
  name: '审批时间',
  prop: "checkTime",
},
]