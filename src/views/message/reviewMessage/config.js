/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-21 13:13:42
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\message\reviewMessage\config.js
 * @Description: 文件说明
 */
export const tableList = [{
  name: '消息类型',
  prop: "auditMessageType",
  options: [{
    name: '商品审核',
    value: '0'
  },
  {
    name: '评价审核',
    value: '1'
  },
  {
    name: '结算审核',
    value: '2'
  }, {
    name: '商家审核',
    value: '3'
  }
  ]
},
{
  name: '消息内容',
  prop: "detail",
},
{
  name: '发布时间',
  prop: "createTime",
},
{
  name: '状态',
  prop: "readFlag",
  options: [{
    name: '未读',
    value: '0'
  },
  {
    name: '已读',
    value: '1'
  }
  ]
},
]
export const formEditList = [{
  name: '消息类型',
  prop: "auditMessageType",
  type: 'select',
  options: [{
    name: '商品审核',
    value: '0'
  },
  {
    name: '评价审核',
    value: '1'
  },
  {
    name: '结算审核',
    value: '2'
  }, {
    name: '商家审核',
    value: '3'
  }
  ]
},
{
  name: '消息内容',
  prop: "detail",
  type: "textarea",
},
{
  name: '发布时间',
  prop: "createTime",
  type: 'datetime'
},
{
  name: '状态',
  prop: "readFlag",
  type: 'select',
  options: [{
    name: '未读',
    value: '0'
  },
  {
    name: '已读',
    value: '1'
  }
  ]
},
]
export const formList = [{
  name: '消息类型',
  prop: "auditMessageType",
  type: 'select',
  options: [{
    name: '商品审核',
    value: '0'
  },
  {
    name: '评价审核',
    value: '1'
  },
  {
    name: '结算审核',
    value: '2'
  }, {
    name: '商家审核',
    value: '3'
  }
  ]
},
{
  name: '消息内容',
  prop: "detail",
  type: "input",
},
{
  name: '发布时间',
  prop: "createTime",
  type: 'daterange',
  endTime: 'endTime',
  startTime: "startTime"
},
{
  name: '状态',
  prop: "readFlag",
  type: 'select',
  options: [{
    name: '未读',
    value: '0'
  },
  {
    name: '已读',
    value: '1'
  }
  ]
},
]
