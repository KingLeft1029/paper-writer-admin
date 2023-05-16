/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-12 14:51:31
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\userList\config.js
 * @Description: 文件说明
 */
export const tableEditList = [{
    name: '旧密码',
    prop: "oldPhonenumber",
  },
  {
    name: '新密码',
    prop: "newPhonenumber",
  },
  {
    name: '修改时间',
    prop: "createTime",
  },
]
export const tableList = [{
    name: '头像',
    prop: "avatar",
    type: 'image'
  },
  {
    name: '身份',
    prop: "innerFlag",
    options: [{
      value: '0',
      name: '普通用户'
    }, {
      value: '1',
      name: '集团员工'
    }, ]
  },

  {
    name: '姓名',
    prop: "realName",
  },
  {
    name: '昵称',
    prop: "nickName",
  },
  {
    name: '手机号',
    prop: "phonenumber",
  },
  // {
  //   name: '来源',
  //   prop: "registeredSource",
  //   options: [
  //     {
  //       value: '0',
  //       name: '后台添加'
  //     }, {
  //       value: '1',
  //       name: 'APP注册'
  //     }, {
  //       value: '2',
  //       name: 'WEB端注册'
  //     }]
  // },
  // {
  //   name: '公司名称',
  //   prop: "companyName",
  // },
  // {
  //   name: '邮箱',
  //   prop: "email",
  // },
  {
    name: '注册时间',
    prop: "createTime",
  },
]
export const formList = [{
    name: '身份',
    prop: "innerFlag",
    type: 'select',
    options: [{
      value: '0',
      name: '普通用户'
    }, {
      value: '1',
      name: '集团员工'
    }]
  },

  {
    name: '姓名',
    prop: "realName",
    type: 'input'
  },
  {
    name: '昵称',
    prop: "nickName",
    type: 'input'
  },
  {
    name: '手机号',
    prop: "phonenumber",
    type: 'intNumber'
  },

  // {
  //   name: '公司名称',
  //   prop: "companyName",
  //   type: 'input'
  // },
  // {
  //   name: '邮箱',
  //   prop: "email",
  //   type: 'input'
  // },
  {
    name: '注册时间',
    prop: "createTime",
    type: 'daterange',
    endTime: 'endTime',
    startTime: 'startTime'
  },
]
export const formEditList = [{
    name: '昵称',
    prop: "nickName",
    type: 'input'
  },
  {
    name: '姓名',
    prop: "realName",
    type: 'input'
  },
  {
    name: '手机号',
    prop: "phonenumber",
    type: 'intNumber'
  },
  {
    name: '来源',
    prop: "registeredSource",
    type: 'select',
    options: [{
      value: '0',
      name: '后台添加'
    }, {
      value: '1',
      name: 'APP注册'
    }, {
      value: '2',
      name: 'WEB端注册'
    }]
  },
  {
    name: '公司名称',
    prop: "companyName",
    type: 'input'
  },
  {
    name: '邮箱',
    prop: "email",
    type: 'input'
  },
  {
    name: '注册时间',
    prop: "createTime",
    type: 'datetime'
  },
]
