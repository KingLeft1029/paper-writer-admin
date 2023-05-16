/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-19 15:31:57
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\message\orderMessage\config.js
 * @Description: 文件说明
 */
export const tableList = [{
  name: '消息类型',
  prop: "messageType",
  options: [{
    value: '0',
    name: '等待发货'
  }, {
    value: '1',
    name: '等待审批退款'
  },
  {
    value: '2',
    name: '等待审批退货'
  }]
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
export const formList = [{
  name: '消息类型：',
  prop: "messageType",
  type: 'select',
  options: [{
    name: '等待发货',
    value: '0'
  },
  {
    name: '等待审批退款',
    value: '1'
  },
  {
    name: '等待审批退货',
    value: '2'
  }
  ]
},
{
  name: '消息内容：',
  prop: "detail",
  type: "input",
},
{
  name: '发布时间：',
  prop: "createTime",
  type: 'daterange',
  endTime: 'endTime',
  startTime: 'startTime'
},
{
  name: '状态：',
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
export const formEditList = [{
  name: '消息类型：',
  prop: "messageType",
  type: 'select',
  options: [{
    name: '等待发货',
    value: '0'
  },
  {
    name: '等待审批退款',
    value: '1'
  },
  {
    name: '等待审批退货',
    value: '2'
  }
  ]
},
{
  name: '消息内容：',
  prop: "detail",
  type: "textarea",
},
{
  name: '发布时间：',
  prop: "createTime",
  type: 'datetime',
},
{
  name: '状态：',
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
