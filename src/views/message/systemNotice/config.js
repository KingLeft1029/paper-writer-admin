/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-05-02 14:20:15
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\message\orderMessage\config.js
 * @Description: 文件说明
 */
export const tableList = [{
  name: '系统消息标题',
  prop: "title",
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
  name: '系统消息标题',
  prop: "title",
  type: 'input',
},
{
  name: '发布时间',
  prop: "createTime",
  type: 'daterange',
  endTime: 'endTime',
  startTime: 'startTime'
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

export const formEditList = [{
  name: '系统消息标题',
  prop: "noticeTitle",
  type: 'input',
  required: true
},
{
  name: '系统消息详情',
  prop: "noticeContent",
  type: 'editor',
  required: true
},
]

