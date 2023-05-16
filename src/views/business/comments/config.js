
export const tableList = [
  {
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
      value: '0',
      name: '否'
    }, {
      value: '1',
      name: '是'
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
]
export const formList = [{
  name: '商品名称',
  prop: "goodsName",
  type: 'input'
},
{
  name: '评论时间',
  type: 'daterange',
  prop: 'createTime',
  endTime: 'endTime',
  startTime: 'startTime'
},
{
  name: '是否匿名',
  prop: "anonymousFlag",
  type: 'select',
  options: [{
    value: '0',
    name: '否'
  }, {
    value: '1',
    name: '是'
  }]
},
{
  name: '用户昵称',
  prop: "createName",
  type: 'input'
},
{
  name: '用户手机号',
  prop: "phonenumber",
  type: 'intNumber'
},
]
