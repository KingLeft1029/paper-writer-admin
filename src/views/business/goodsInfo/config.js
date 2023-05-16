export const IndustryList = [
  {
    prop: "industryPicture",
    name: "行业图片",
    type: "image",
  },
  {
    prop: "industryName",
    name: "行业名称",
  },
];
export const IndustryFormList = [
  {
    prop: "industryPicture",
    name: "行业图片",
    type: "uploadImg",
    limit: 1,
    required: true,
  },
  {
    prop: "industryName",
    name: "行业名称",
    type: "input",
    required: true,
  },
];
export const GoodsFaqList = [
  {
    prop: "title",
    name: "常见问题标题",
  },
  {
    prop: "answerDetails",
    name: "解答详情",
    type: "html",
  },
];
export const GoodsFaqFormList = [
  {
    prop: "title",
    name: "常见问题标题",
    type: "input",
    required: true,
  },
  {
    prop: "answerDetails",
    name: "解答详情",
    type: "editor",
    required: true,
  },
];

export const tableValueS = [
  {
    name: "规格值",
    prop: "attrDetailName",
  },
  {
    name: "代码",
    prop: "attrDetailValue",
  },
];

export const formList =[
  {
    name: "规格值",
    prop: "attrDetailName",
    type:'input'
  },
  {
    name: "代码",
    prop: "attrDetailValue",
    type:'input'
  },
]