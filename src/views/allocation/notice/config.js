/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-05-02 14:20:15
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\message\orderMessage\config.js
 * @Description: 文件说明
 */
export const tableList = [{
    name: '系统消息标题',
    prop: "noticeTitle",
  },
  // {
  //   name: '发送角色',
  //   prop: "sendType",
  //   options: [{
  //     value: '0',
  //     name: '全部'
  //   },
  //   {
  //     value: '1',
  //     name: '用户'
  //   }, {
  //     value: '2',
  //     name: '商家'
  //   }]
  // },
  {
    name: '发布人',
    prop: "createBy",
  },
  {
    name: '发布时间',
    prop: "createTime",
  },
]
export const formList = [{
    name: '系统消息标题',
    prop: "noticeTitle",
    type: 'input',
  },
  {
    name: '发布时间',
    prop: "createTime",
    type: 'daterange',
    endTime: 'endTime',
    startTime: 'startTime'
  },
  // {
  //   name: '发送角色',
  //   prop: "sendType",
  //   type: 'select',
  //   options: [{
  //     value: '0',
  //     name: '全部'
  //   },
  //   {
  //     value: '1',
  //     name: '用户'
  //   }, {
  //     value: '2',
  //     name: '商家'
  //   }]
  // },
  {
    name: '发布人',
    prop: "createBy",
    type: 'input'
  },
]

export const formEditList = [{
    name: '系统消息标题',
    prop: "noticeTitle",
    type: 'input',
    required: true
  },
  // {
  //   name: '发送角色',
  //   prop: "sendType",
  //   type: 'select',
  //   required: true,
  //   options: [{
  //     value: '0',
  //     name: '全部'
  //   },
  //   {
  //     value: '1',
  //     name: '用户'
  //   }, {
  //     value: '2',
  //     name: '商家'
  //   }]
  // },
  {
    name: '系统消息详情',
    prop: "noticeContent",
    type: 'editor',
    required: true
  },
]

export const formLookList = [{
    name: '系统消息标题',
    prop: "noticeTitle",
    type: 'input',
    required: true
  },
  // {
  //   name: '发布人',
  //   prop: "createBy",
  //   type: 'input'
  // },
  // {
  //   name: '发布时间',
  //   prop: "createTime",
  //   type: 'datetime',
  // },
  // {
  //   name: '发送角色',
  //   prop: "sendType",
  //   type: 'select',
  //   required: true,
  //   options: [{
  //     value: '0',
  //     name: '全部'
  //   },
  //   {
  //     value: '1',
  //     name: '用户'
  //   }, {
  //     value: '2',
  //     name: '商家'
  //   }]
  // },
  {
    name: '系统消息详情',
    prop: "noticeContent",
    type: 'editor',
    required: true
  },
]
