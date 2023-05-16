// 搜索
export const formList = [{
    name: '运营方',
    prop: 'operator',
    type: 'select',
    options: [{
        name: '自营',
        value: '0'
      },
      {
        name: '商家',
        value: '1'
      }
    ]
  },
  {
    name: '商家名称',
    prop: 'shopName',
    type: 'input'
  },
  {
    name: '商品名称',
    prop: 'goodsName',
    type: 'input'
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
    name: '价格',
    prop: 'price',
    type: 'number'
  },
  {
    name: '是否为新品',
    prop: 'newFlag',
    type: 'select',
    options: [{
        name: '是',
        value: '1'
      },
      {
        name: '否',
        value: '0'
      }
    ]
  },
  {
    name: '上/下架状态',
    prop: 'onSaleFlag',
    type: 'select',
    options: [{
        name: '上架',
        value: '1'
      },
      {
        name: '下架',
        value: '0'
      }
    ]
  },
  {
    name: '审核状态',
    prop: 'checkStatus',
    type: 'select',
    options: [{
        name: '审核中',
        value: '1'
      },
      {
        name: '审核通过',
        value: '2'
      },
      {
        name: '未提审',
        value: '0'
      },
      {
        name: '审核驳回',
        value: '3'
      }
    ]
  },
]
// 表格
export const tableList1 = [{
    name: '运营方',
    prop: 'operator',
    options: [{
        name: '自营',
        value: '0'
      },
      {
        name: '商家',
        value: '1'
      }
    ]
  },
  {
    name: '商家名称',
    prop: 'shopInfo.shopName',
    type: 'deepPropHtml'
  },
  {
    name: '商品名称',
    prop: 'goodsName'
  },
  {
    name: '商品分类',
    prop: 'typeName'
  },
  {
    name: '市场价（元）',
    prop: 'price'
  },
  {
    name: '内部价（元）',
    prop: 'innerPrice'
  },
  {
    name: '是否为新品',
    prop: 'newFlag',
    options: [{
        name: '是',
        value: '1'
      },
      {
        name: '否',
        value: '0'
      }
    ]
  },
  {
    name: '上/下架状态',
    prop: 'onSaleFlag',
    options: [{
        name: '上架',
        value: '1'
      },
      {
        name: '下架',
        value: '0'
      }
    ]
  },
  {
    name: '审核状态',
    prop: 'checkStatus',
    options: [{
        name: '审核中',
        value: '1'
      },
      {
        name: '审核通过',
        value: '2'
      },
      {
        name: '未提审',
        value: '0'
      },
      {
        name: '审核驳回',
        value: '3'
      }
    ]
  }

]
export const tableList2 = [{
    name: '运营方',
    prop: 'operator',
    options: [{
        name: '自营',
        value: '0'
      },
      {
        name: '商家',
        value: '1'
      }
    ]
  },
  {
    name: '商家名称',
    prop: 'shopInfo.shopName'
  },
  {
    name: '商品名称',
    prop: 'goodsName'
  },
  {
    name: '商品分类',
    prop: 'typeName'
  },
  {
    name: '市场价（元）',
    prop: 'price'
  },
  {
    name: '定金（元）',
    prop: 'depositPrice'
  },
  {
    name: '内部价（元）',
    prop: 'innerPrice'
  },
  {
    name: '定金（元）',
    prop: 'innerDepositPrice'
  },
  {
    name: '是否为新品',
    prop: 'newFlag',
    options: [{
        name: '是',
        value: '1'
      },
      {
        name: '否',
        value: '0'
      }
    ]
  },
  {
    name: '上/下架状态',
    prop: 'onSaleFlag',
    options: [{
        name: '上架',
        value: '1'
      },
      {
        name: '下架',
        value: '0'
      }
    ]
  },
  {
    name: '审核状态',
    prop: 'checkStatus',
    options: [{
        name: '审核中',
        value: '1'
      },
      {
        name: '审核通过',
        value: '2'
      },
      {
        name: '未提审',
        value: '0'
      },
      {
        name: '审核驳回',
        value: '3'
      }
    ]
  }

]
// 弹窗
export const formEditList1 = [{
    name: '运营方',
    prop: 'operator',
    type: 'select',
    options: [{
        name: '自营',
        value: '0'
      },
      {
        name: '商家',
        value: '1'
      }
    ]
  },
  {
    name: '商家名称',
    prop: 'shopInfo.shopName',
    type: 'input'
  },
  {
    name: '商品名称',
    prop: 'goodsName',
    type: 'input'
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
    name: '市场价（元）',
    prop: 'price',
    type: 'number'
  },
  {
    name: '内部价（元）',
    prop: 'innerPrice',
    type: 'number'
  },
  {
    name: '是否为新品',
    prop: 'newFlag',
    type: 'select',
    options: [{
        name: '是',
        value: '1'
      },
      {
        name: '否',
        value: '0'
      }
    ]
  },
  {
    name: '上/下架状态',
    prop: 'onSaleFlag',
    type: 'select',
    options: [{
        name: '上架',
        value: '1'
      },
      {
        name: '下架',
        value: '0'
      }
    ]
  },
  {
    name: '审核状态',
    prop: 'checkStatus',
    type: 'select',
    options: [{
        name: '审核中',
        value: '1'
      },
      {
        name: '审核通过',
        value: '2'
      },
      {
        name: '未提审',
        value: '0'
      },
      {
        name: '审核驳回',
        value: '3'
      }
    ]
  },
  {
    name: '审批人',
    prop: 'checkUserName',
    type: 'input'

  },
  {
    name: '审批时间',
    prop: 'checkTime',
    type: 'datetime'
  },
  {
    name: '驳回原因',
    prop: 'rejectReason',
    type: 'textarea'
  }
]
export const formEditList2 = [{
    name: '运营方',
    prop: 'operator',
    type: 'select',
    options: [{
        name: '自营',
        value: '0'
      },
      {
        name: '商家',
        value: '1'
      }
    ]
  },
  {
    name: '商家名称',
    prop: 'shopInfo.shopName',
    type: 'input'
  },
  {
    name: '商品名称',
    prop: 'goodsName',
    type: 'input'
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
    name: '市场价（元）',
    prop: 'price',
    type: 'number'
  },
  {
    name: '定金（元）',
    prop: 'depositPrice',
    type: 'number'
  },
  {
    name: '内部价（元）',
    prop: 'innerPrice',
    type: 'number'
  },
  {
    name: '定金（元）',
    prop: 'innerDepositPrice',
    type: 'number'
  },
  {
    name: '是否为新品',
    prop: 'newFlag',
    type: 'select',
    options: [{
        name: '是',
        value: '1'
      },
      {
        name: '否',
        value: '0'
      }
    ]
  },
  {
    name: '上/下架状态',
    prop: 'onSaleFlag',
    type: 'select',
    options: [{
        name: '上架',
        value: '1'
      },
      {
        name: '下架',
        value: '0'
      }
    ]
  },
  {
    name: '审核状态',
    prop: 'checkStatus',
    type: 'select',
    options: [{
        name: '审核中',
        value: '1'
      },
      {
        name: '审核通过',
        value: '2'
      },
      {
        name: '未提审',
        value: '0'
      }
    ]
  },
  {
    name: '审批人',
    prop: 'checkUserName',
    type: 'input'

  },
  {
    name: '审批时间',
    prop: 'checkTime',
    type: 'datetime'
  },
  {
    name: '驳回原因',
    prop: 'rejectReason',
    type: 'textarea'
  }
]
