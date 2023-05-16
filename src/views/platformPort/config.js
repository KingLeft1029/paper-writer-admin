/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-12 14:21:01
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\platformPort\config.js
 * @Description: 文件说明
 */
export const tableList = [
  {
    name: '商家ID',
    prop: "shopId",
  }, 
  {
    name: '商家名称',
    prop: "shopName",
  },
  {
    name: '联系人姓名',
    prop: "linkName",
  },
  {
    name: '联系人手机号',
    prop: "linkPhone",
  },
  {
    name: '商家账号',
    prop: "userName"
  },
  {
    name: '缴纳状态',
    prop: "bondFlag",
    type: 'switch',
    changeFunction: 'switchChange',
    options: [{
      name: '',
      value: '0'
    },
    {
      name: '',
      value: '1'
    }
    ]
  },
  {
    name: '是否启用',
    prop: "openFlag",
    type: 'switch',
    changeFunction: 'switchChange',
    options: [{
      name: '',
      value: '0'
    },
    {
      name: '',
      value: '1'
    }
    ]
  },
  {
    name: '普通商品数量',
    prop: "normalGoodsNum",
  },
  {
    name: '预售商品数量',
    prop: "preSaleGoodsNum",
  },
]
export const formList = [
{
  name: '商家名称',
  prop: "shopName",
  type: 'input'
},
{
  name: '联系人姓名',
  prop: "linkName",
  type: 'input'
},
{
  name: '联系人手机号',
  prop: "linkPhone",
  type: 'intNumber'
},
{
  name: '商家账号',
  prop: "userName",
  type: 'input'
},
{
  name: '缴纳状态',
  prop: "bondFlag",
  type: 'select',
  options: [{
    name: '已缴纳',
    value: '1'
  },
  {
    name: '未缴纳',
    value: '0'
  }
  ]
},
{
  name: '是否启用',
  prop: "openFlag",
  type: 'select',
  options: [{
    name: '否',
    value: '0'
  },
  {
    name: '是',
    value: '1'
  }
  ]
},
]
