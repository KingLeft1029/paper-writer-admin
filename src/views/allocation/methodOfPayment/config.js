/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2022-04-19 19:28:34
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\order\orderList\order\config.js
 * @Description: 文件说明
 */
export const tableList = [
  {
    name: "支付方式",
    prop: "payment",
  },
  {
    name: "是否使用",
    prop: "status",
    type: "switch",
    activeValue: 1,
    inactiveValue: 0,
    changeFunction: "switchChange",
  },
];

export const formList = [
  {
    name: "支付方式",
    prop: "payment",
    type: "input",
  },
];
