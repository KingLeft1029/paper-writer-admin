/*
 * @Author: mikeShn
 * @Date: 2022-04-24 17:02:35
 * @LastEditTime: 2022-04-24 17:02:35
 * @FilePath: \digital-earth-PC\src\views\order\orderList\config.js
 * @Description: 文件说明
 */
/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-19 19:28:34
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\order\orderList\order\config.js
 * @Description: 文件说明
 */

export const tableList1 = [{
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
    prop: 'shopName'
  },
  {
    name: "订单编号",
    prop: "orderId",
    align: "center",
    width: 200
  },
  {
    name: "收货人",
    prop: "receiverName",
  },
  {
    name: "收货人手机号",
    prop: "receiverPhone",
  },
  {
    name: "订单金额（元）",
    prop: "orderPrice",
  },
  {
    name: "邮费（元）",
    prop: "postagePrice",
  },
  {
    name: "下单时间",
    prop: "createTime",
    width: 120
  },
  {
    name: "订单状态",
    prop: "orderType",
    options: [{
        name: "待付款",
        value: "0",
      },
      {
        name: "待发货",
        value: "1",
      },
      {
        name: "待收货",
        value: "2",
      },
      {
        name: '已完成',
        value: '3'
      },
    ],
  },
  {
    name: "订单类型",
    prop: "preSaleFlag",
    options: [{
      value: '0',
      name: '普通订单'
    }, {
      value: '1',
      name: '预售订单'
    }]
  },
  {
    name: "商品数量",
    prop: "goodsNum",
  },
]
export const tableList2 = [{
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
    prop: 'shopName'
  },
  {
    name: "订单编号",
    prop: "orderId",
    align: "center",
    width: 200
  },
  {
    name: "收货人",
    prop: "receiverName",
  },
  {
    name: "收货人手机号",
    prop: "receiverPhone",
  },
  {
    name: "定金（元）",
    prop: "orderPrice",
  },
  {
    name: "邮费（元）",
    prop: "postagePrice",
  },
  {
    name: "下单时间",
    prop: "createTime",
    width: 120
  },
  {
    name: "订单状态",
    prop: "orderType",
    options: [{
        name: "已预订",
        value: "5",
      },
      {
        name: "已开售",
        value: "6",
      },
      {
        name: "已过时",
        value: "7",
      },

    ],
  },
  {
    name: "商品数量",
    prop: "goodsNum",
  },
]
export const formList1 = [{
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
    name: '商家名称',
    prop: 'shopName',
    type: 'input'
  },
  {
    name: "订单编号",
    prop: "orderId",
    type: "input",
  },
  {
    name: "收货人",
    prop: "receiverName",
    type: "input",
  },
  {
    name: "收货人手机号",
    prop: "receiverPhone",
    type: "input",
  },
  {
    name: "订单金额",
    prop: "orderPrice",
    type: "number",
  },
  {
    name: '下单时间',
    prop: "createTime",
    type: "daterange",
    endTime: 'endTime',
    startTime: 'startTime'
  },
  {
    name: "订单状态",
    prop: "orderType",
    type: "select",
    options: [{
        name: "待付款",
        value: "0",
      },
      {
        name: "待发货",
        value: "1",
      },
      {
        name: "待收货",
        value: "2",
      },
      {
        name: '已完成',
        value: '3'
      },
    ],
  },
  {
    name: "订单类型",
    prop: "preSaleFlag",
    type: "select",
    options: [{
      value: '0',
      name: '普通订单'
    }, {
      value: '1',
      name: '预售订单'
    }]
  },
  // {
  //   name: "配送方式",
  //   prop: "deliveryMethod",
  //   type: "select",
  //   options: [{
  //     value: '1',
  //     name: '普通快递'
  //   }, {
  //     value: '2',
  //     name: '卡车物流'
  //   }]
  // },
]
export const formList2 = [{
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
    name: '商家名称',
    prop: 'shopName',
    type: 'input'
  },
  {
    name: "订单编号",
    prop: "orderId",
    type: "input",
  },
  {
    name: "收货人",
    prop: "receiverName",
    type: "input",
  },
  {
    name: "收货人手机号",
    prop: "receiverPhone",
    type: "input",
  },
  {
    name: "定金",
    prop: "orderPrice",
    type: "number",
  },
  {
    name: '下单时间',
    prop: "createTime",
    type: "daterange",
    endTime: 'endTime',
    startTime: 'startTime'
  },
  {
    name: "订单状态",
    prop: "orderType",
    type: "select",
    options: [{
        name: "已预订",
        value: "5",
      },
      {
        name: "已开售",
        value: "6",
      },
      {
        name: "已过时",
        value: "7",
      },
    ],
  },
  // {
  //   name: "配送方式",
  //   prop: "deliveryMethod",
  //   type: "select",
  //   options: [{
  //     value: '1',
  //     name: '普通快递'
  //   }, {
  //     value: '2',
  //     name: '卡车物流'
  //   }]
  // },
]


export const tableList1s = [
{
  name: "订单编号",
  prop: "orderId",
  align: "center",
  width: 200
},
{
  name: "收货人",
  prop: "receiverName",
},
{
  name: "收货人手机号",
  prop: "receiverPhone",
},
{
  name: "订单金额（元）",
  prop: "orderPrice",
},
{
  name: "邮费（元）",
  prop: "postagePrice",
},
{
  name: "下单时间",
  prop: "createTime",
  width: 120
},
{
  name: "订单状态",
  prop: "orderType",
  options: [{
      name: "待付款",
      value: "0",
    },
    {
      name: "待发货",
      value: "1",
    },
    {
      name: "待收货",
      value: "2",
    },
    {
      name: '已完成',
      value: '3'
    },
  ],
},
{
  name: "订单类型",
  prop: "preSaleFlag",
  options: [{
    value: '0',
    name: '普通订单'
  }, {
    value: '1',
    name: '预售订单'
  }]
},
{
  name: "商品数量",
  prop: "goodsNum",
},
]
export const tableList2s = [
{
  name: "订单编号",
  prop: "orderId",
  align: "center",
  width: 200
},
{
  name: "收货人",
  prop: "receiverName",
},
{
  name: "收货人手机号",
  prop: "receiverPhone",
},
{
  name: "定金（元）",
  prop: "orderPrice",
},
{
  name: "邮费（元）",
  prop: "postagePrice",
},
{
  name: "下单时间",
  prop: "createTime",
  width: 120
},
{
  name: "订单状态",
  prop: "orderType",
  options: [{
      name: "已预订",
      value: "5",
    },
    {
      name: "已开售",
      value: "6",
    },
    {
      name: "已过时",
      value: "7",
    },

  ],
},
{
  name: "商品数量",
  prop: "goodsNum",
},
]
export const formList1s = [
{
  name: "订单编号",
  prop: "orderId",
  type: "input",
},
{
  name: "收货人",
  prop: "receiverName",
  type: "input",
},
{
  name: "收货人手机号",
  prop: "receiverPhone",
  type: "input",
},
{
  name: "订单金额",
  prop: "orderPrice",
  type: "number",
},
{
  name: '下单时间',
  prop: "createTime",
  type: "daterange",
  endTime: 'endTime',
  startTime: 'startTime'
},
{
  name: "订单状态",
  prop: "orderType",
  type: "select",
  options: [{
      name: "待付款",
      value: "0",
    },
    {
      name: "待发货",
      value: "1",
    },
    {
      name: "待收货",
      value: "2",
    },
    {
      name: '已完成',
      value: '3'
    },
  ],
},
{
  name: "订单类型",
  prop: "preSaleFlag",
  type: "select",
  options: [{
    value: '0',
    name: '普通订单'
  }, {
    value: '1',
    name: '预售订单'
  }]
},
// {
//   name: "配送方式",
//   prop: "deliveryMethod",
//   type: "select",
//   options: [{
//     value: '1',
//     name: '普通快递'
//   }, {
//     value: '2',
//     name: '卡车物流'
//   }]
// },
]
export const formList2s = [

{
  name: "订单编号",
  prop: "orderId",
  type: "input",
},
{
  name: "收货人",
  prop: "receiverName",
  type: "input",
},
{
  name: "收货人手机号",
  prop: "receiverPhone",
  type: "input",
},
{
  name: "定金",
  prop: "orderPrice",
  type: "number",
},
{
  name: '下单时间',
  prop: "createTime",
  type: "daterange",
  endTime: 'endTime',
  startTime: 'startTime'
},
{
  name: "订单状态",
  prop: "orderType",
  type: "select",
  options: [{
      name: "已预订",
      value: "5",
    },
    {
      name: "已开售",
      value: "6",
    },
    {
      name: "已过时",
      value: "7",
    },
  ],
},
// {
//   name: "配送方式",
//   prop: "deliveryMethod",
//   type: "select",
//   options: [{
//     value: '1',
//     name: '普通快递'
//   }, {
//     value: '2',
//     name: '卡车物流'
//   }]
// },
]

