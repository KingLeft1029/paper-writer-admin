export const tableList = [{
    name: '商家ID',
    prop: "shopId",
  },
  {
    name: '商家名称',
    prop: "shopName",
  },
  {
    name: '统一社会信用码',
    prop: "creditCode",
  },
  {
    name: '商家地址',
    prop: "shopAddress",
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
    name: '审批状态',
    prop: "checkStatus",
    options: [{
        name: '未提交',
        value: '0'
      },
      {
        name: '审核中',
        value: '1'
      },
      {
        name: '审核通过',
        value: '2'
      },
      {
        name: '驳回',
        value: '3'
      }
    ]
  },
  {
    name: '审批人',
    prop: "checkUserName",
  },
  {
    name: '审批时间',
    prop: "checkTime",
  }
]
export const formList = [

  {
    name: '商家名称',
    prop: "shopName",
    type: "input",
  },
  {
    name: '统一社会信用码',
    prop: "creditCode",
    type: "input",
  },

  {
    name: '商家地址',
    prop: "shopAddress",
    type: 'input',
  },

  {
    name: '联系人',
    prop: "linkName",
    type: 'input'
  },
  {
    name: '联系人手机号',
    prop: "linkPhone",
    type: "number",
  },
  {
    name: '审核状态',
    prop: "checkStatus",
    type: 'select',
    options: [{
        name: '未提交',
        value: '0'
      },
      {
        name: '审核中',
        value: '1'
      },
      {
        name: '审核通过',
        value: '2'
      },
      {
        name: '驳回',
        value: '3'
      }
    ]
  },
  {
    name: '审批人',
    prop: "checkUserName",
    type: 'input'
  },
  {
    name: '审批时间',
    prop: "checkTime",
    type: 'date',
  },

]

export const tableListReadOnly = [{
    name: '商家名称',
    prop: "shopName",
    type: 'input',
  },
  {
    name: '商家地址',
    prop: "shopAddress",
    type: 'input',
  },
  {
    name: '联系地址',
    prop: "linkAddress",
    type: 'input',
  },
  {
    name: '统一社会信用码',
    prop: "creditCode",
    type: 'input',
  },
  {
    name: '营业执照',
    prop: "businessLicense",
    type: 'uploadImg',
  },
  {
    name: '联系人姓名',
    prop: "linkName",
    type: 'input',
  },
  {
    name: '联系人手机号',
    prop: "linkPhone",
    type: 'intNumber',
  },
  // {
  //   name: '联系人姓名',
  //   prop: "linkName",
  //   type: 'input',
  // },
  {
    name: '银行开户名',
    prop: "realName",
    type: 'input',
  },
  {
    name: '开户银行账号',
    prop: "bankCardNumber",
    type: 'intNumber',
  },
  {
    name: '开户银行支行名称',
    prop: "bankBranchName",
    type: 'input',
  },
  {
    name: '开户银行所在地',
    prop: "bankAddress",
    type: 'input',
  },
  {
    name: '支行联行号',
    prop: "bankBranchNumber",
    type: 'input',
  },
  {
    name: '法定经营范围',
    prop: "bussnessNature",
    type: 'input',
  },
  {
    name: '法人姓名',
    prop: "legalPersonName",
    type: 'input',
  },
  {
    name: '法人手机号',
    prop: "legalPersonPhone",
    type: 'input',
  },
  {
    name: '联系人身份证照片正反面',
    prop: "idenFrontPicUrl",
    type: 'uploadImg',
  },
  {
    name: '是否缴纳保证金',
    prop: "bondFlag",
    type: 'switch',
  },
  {
    name: '缴纳金额',
    prop: "bondNum",
    type: 'input',
  },
  {
    name: '入驻日期',
    prop: "createTime",
    type: 'date',
  },
]
