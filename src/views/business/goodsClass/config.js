/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-24 19:37:08
 * @FilePath: \digital-earth-PC\src\views\business\goodsClass\config.js
 * @Description: 文件说明
 */
export const tableList1 = [
  // {
  //   name: "商品编码",
  //   prop: "goodsCode",
  // },
  {
    name: "商品名称",
    prop: "goodsName",
  },
  {
    name: "商品分类",
    prop: "typeName",
  },
  {
    name: "市场价（元）",
    prop: "price",
  },
  {
    name: "内部价（元）",
    prop: "innerPrice",
  },
  {
    name: "库存",
    prop: "stockNum",
  },
  {
    name: "销量",
    prop: "saleNum",
  },
  {
    name: "是否为新品",
    prop: "newFlag",
    options: [
      {
        value: "0",
        name: "否",
      },
      {
        value: "1",
        name: "是",
      },
    ],
  },
  // {
  //   name: "是否为推荐商品",
  //   prop: "recommended",
  //   options: [
  //     {
  //       value: 0,
  //       name: "否",
  //     },
  //     {
  //       value: 1,
  //       name: "是",
  //     },
  //   ],
  // },
  {
    name: "上/下架状态",
    prop: "onSaleFlag",
    options: [
      {
        value: 1,
        name: "上架",
      },
      {
        value: 0,
        name: "下架",
      },
    ],
  },
  {
    name: "审核状态",
    prop: "checkStatus",
    options: [
      {
        value: 0,
        name: "未提审",
      },
      {
        value: 1,
        name: "审核中",
      },
      {
        value: 2,
        name: "审核通过",
      },
    ],
  },
]
export const tableList2 = [
  // {
  //   name: "商品编码",
  //   prop: "goodsCode",
  // },
  {
    name: "商品名称",
    prop: "goodsName",
  },
  {
    name: "商品分类",
    prop: "typeName",
  },
  {
    name: "市场价（元）",
    prop: "price",
  },
  {
    name: "定金（元）",
    prop: "depositPrice",
  },
  {
    name: "内部价（元）",
    prop: "innerPrice",
  },
  {
    name: "定金（元）",
    prop: "innerDepositPrice",
  },
  {
    name: "库存",
    prop: "stockNum",
  },
  {
    name: "销量",
    prop: "saleNum",
  },
  {
    name: "是否为新品",
    prop: "newFlag",
    options: [
      {
        value: "0",
        name: "否",
      },
      {
        value: "1",
        name: "是",
      },
    ],
  },
  // {
  //   name: "是否为推荐商品",
  //   prop: "recommended",
  //   options: [
  //     {
  //       value: 0,
  //       name: "否",
  //     },
  //     {
  //       value: 1,
  //       name: "是",
  //     },
  //   ],
  // },
  {
    name: "上/下架状态",
    prop: "onSaleFlag",
    options: [
      {
        value: 1,
        name: "上架",
      },
      {
        value: 0,
        name: "下架",
      },
    ],
  },
  {
    name: "审核状态",
    prop: "checkStatus",
    options: [
      {
        value: 0,
        name: "未提审",
      },
      {
        value: 1,
        name: "审核中",
      },
      {
        value: 2,
        name: "审核通过",
      },
    ],
  },
]
export const formList = [
  // {
  //   name: "商品编码",
  //   prop: "goodsCode",
  //   type: "input",
  // },
  {
    name: "商品名称",
    prop: "goodsName",
    type: "input",
  },
  {
    name: '商品分类',
    type: 'treeSelect',
    prop: {
      label: 'typeName',
      value: 'typeId'
    },
    options: []
  },
  {
    name: "价格",
    prop: "price",
    type: "number",
  },
  // {
  //   name: "是否为新品",
  //   prop: "newFlag",
  //   type: "select",
  //   options: [
  //     {
  //       value: "0",
  //       name: "否",
  //     },
  //     {
  //       value: "1",
  //       name: "是",
  //     },
  //   ],
  // },
  {
    name: "是否为新品",
    prop: "newFlag",
    type: "select",
    options: [
      {
        value: "0",
        name: "否",
      },
      {
        value: "1",
        name: "是",
      },
    ],
  },
  {
    name: "上/下架状态",
    prop: "onSaleFlag",
    type: "select",
    options: [
      {
        value: "0",
        name: "下架",
      },
      {
        value: "1",
        name: "上架",
      },
    ],
  },
  {
    name: "审核状态",
    prop: "checkStatus",
    type: "select",
    options: [
      {
        value: '0',
        name: "未提审",
      },
      {
        value: '1',
        name: "审核中",
      },
      {
        value: '2',
        name: "审核通过",
      },
    ],
  },
]
