/*
 * @Author: mikeShn
 * @Date: 2022-03-17 11:35:08
 * @LastEditTime: 2023-01-30 11:43:49
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\allocation\topSearch\config.js
 * @Description: 文件说明
 */
export const tableList = [{
    name: '热门搜索',
    prop: "searchWord",
  },
  {
    name: '排序',
    prop: "sort",
  },
]
export const formList = [{
  name: '热门搜索',
  prop: "searchWord",
  type: 'input',
}, ]
export const formEditList = [{
    name: '热门搜索',
    prop: "searchWord",
    type: 'input',
    required: true
  },
  {
    name: '排序',
    prop: "sort",
    type: 'intNumber',
    required: true
  },
]
