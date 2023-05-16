/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-19 13:41:51
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\business\postage\config.js
 * @Description: 文件说明
 */
export const tableList = [
  {
    name: "模板名称",
    prop: "modelName",
  },
  {
    name: "是否启用",
    prop: "useFlag",
    type: "switch",
    changeFunction: "switchChange",
  },
  {
    name: "创建时间",
    prop: "createTime",
  },
]
export const formList = [
  {
    name: "模板名称",
    prop: "modelName",
    type: "input",
  },
  {
    name: "是否启用",
    prop: "useFlag",
    type: "select",
    options: [
      {
        name: "否",
        value: "0",
      },
      {
        name: "是",
        value: "1",
      },
    ],
  },
  {
    name: "创建时间",
    prop: 'createTime',
    type: "daterange",
    endTime: 'endTime',
    startTime: 'startTime'
  },
]
