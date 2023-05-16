/*
 * @Author: mikeShn
 * @Date: 2022-04-12 20:44:21
 * @LastEditTime: 2022-04-27 10:04:56
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\invoice\config.js
 * @Description: 文件说明
 */
export const tableList = [{
    name: '订单号',
    prop: "orderId",
  },
  {
    name: '用户昵称',
    prop: "nickName",
  },
  {
    name: '用户手机号',
    prop: "userPhonenumber",
  },
  {
    name: '发票类型',
    prop: "invoiceType",
    options: [{
        value: '0',
        name: '电子发票'
      },
      {
        value: '1',
        name: '纸质普通发票'
      },
      {
        value: '2',
        name: '纸质专用发票'
      },
      {
        value: '3',
        name: '增值税专用发票'
      },
      {
        value: '4',
        name: '增值税普通发票'
      },
    ]
  },
  {
    name: '抬头类型',
    prop: "payeeType",
    options: [{
        value: '0',
        name: '个人'
      },
      {
        value: '1',
        name: '企业'
      }
    ]
  },
  {
    name: '发票抬头',
    prop: "payeeName",
  },
  {
    name: '开票状态',
    prop: "state",
    options: [{
        value: '0',
        name: '待开票'
      },
      {
        value: '1',
        name: '已开票'
      },
      {
        value: '3',
        name: '撤销'
      },
      {
        value: '4',
        name: '超时'
      },
      {
        value: '5',
        name: '已废弃'
      }
    ]
  },
  {
    name: '申请时间',
    prop: "applyTime",
  },
  {
    name: '订单金额',
    prop: "orderPrice",
  },

]
export const formEditList = [{
    name: '订单号',
    prop: "orderId",
    type: 'number',
    isInt: true
  },
  {
    name: '昵称',
    prop: "userName",
    type: 'input',
  },
  {
    name: '手机号',
    prop: "userPhonenumber",
    type: 'number',
    isInt: true
  },
  {
    name: '发票类型',
    prop: "invoiceType",
    type: 'select',
    options: [{
        value: '0',
        name: '电子发票'
      },
      {
        value: '1',
        name: '纸质普通发票'
      },
      {
        value: '2',
        name: '纸质专用发票'
      },
      {
        value: '3',
        name: '增值税专用发票'
      },
      {
        value: '4',
        name: '增值税普通发票'
      },
    ]
  },
  {
    name: '抬头类型',
    prop: "payeeType",
    type: 'select',
    options: [{
        value: '0',
        name: '个人'
      },
      {
        value: '1',
        name: '企业'
      }
    ]
  },
  {
    name: '发票抬头',
    prop: "payeeName",
    type: 'input',
  },
  {
    name: '开票状态',
    prop: "state",
    type: 'select',
    options: [{
        value: '0',
        name: '待开票'
      },
      {
        value: '1',
        name: '已开票'
      },
      {
        value: '3',
        name: '撤销'
      },
      {
        value: '4',
        name: '超时'
      },
      {
        value: '5',
        name: '已废弃'
      }
    ]
  },
  {
    name: '申请时间',
    prop: "applyTime",
    type: 'datetime',
  },
]
export const formList = [{
    name: '订单号',
    prop: "orderId",
    type: 'number',
    isInt: true
  },
  {
    name: '用户昵称',
    prop: "nickName",
    type: 'input',
  },
  {
    name: '用户手机号',
    prop: "userPhonenumber",
    type: 'number',
    isInt: true
  },
  {
    name: '发票类型',
    prop: "invoiceType",
    type: 'select',
    options: [{
        value: '0',
        name: '电子发票'
      },
      {
        value: '1',
        name: '纸质普通发票'
      },
      {
        value: '2',
        name: '纸质专用发票'
      },
      {
        value: '3',
        name: '增值税专用发票'
      },
      {
        value: '4',
        name: '增值税普通发票'
      },
    ]
  },
  {
    name: '抬头类型',
    prop: "payeeType",
    type: 'select',
    options: [{
        value: '0',
        name: '个人'
      },
      {
        value: '1',
        name: '企业'
      }
    ]
  },
  {
    name: '发票抬头',
    prop: "payeeName",
    type: 'input',
  },
  {
    name: '开票状态',
    prop: "state",
    type: 'select',
    options: [{
        value: '0',
        name: '待开票'
      },
      {
        value: '1',
        name: '已开票'
      },
      {
        value: '3',
        name: '撤销'
      },
      {
        value: '4',
        name: '超时'
      },
      {
        value: '5',
        name: '已废弃'
      }
    ]
  },
  {
    name: '申请时间',
    prop: "applyTime",
    type: 'daterange',
    endTime: 'endTime',
    startTime: 'startTime'
  },
]
