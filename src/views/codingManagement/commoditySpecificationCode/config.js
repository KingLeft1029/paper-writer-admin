/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-24 19:37:08
 * @FilePath: \digital-earth-PC\src\views\business\goodsClass\config.js
 * @Description: 文件说明
 */
export const tableList = [
  {
    name: "规格名称",
    prop: "attrName",
  },
  {
    name: "规格值数量",
    prop: "detailNum",
  },
  {
    name: "是否显示",
    prop: "showFlag",
    type: "switch",
    activeValue: '1',
    inactiveValue: '0',
    changeFunction: "switchChange",
    width:'80px'
  },

  
  

 
]
export const formList = [
  {
    name: "规格名称",
    prop: "attrName",
    type: "input",
  },
  {
    name: "是否显示",
    prop: "showFlag",
    type: "select",
    options:[
      {
        name: '不显示',
        value: '0'
      }, {
        name: '显示',
        value: '1'
      }
    ]
  },
  
]
