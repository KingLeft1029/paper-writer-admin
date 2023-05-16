export const returnList = [
  {
    name: "退款商品名称",
    prop: "goodsName",
  },
  {
    name: "申请退款时间",
    prop: "applyTime",
  },
  {
    name: "申请退款金额",
    prop: "refundAmount",
  },
  {
    name: "退款原因",
    prop: "refundReasonRemark",
  },
  {
    name: "退款原因说明",
    prop: "refundReason",
  },
]
// 收货信息
export const closedList = [
  {
    name: "收货人",
    prop: "receiverName",
  },
  {
    name: "手机号",
    prop: "receiverPhone",
  },
  {
    name: "收货地址",
    prop: "receiveAddress",
  },
]
// 基本信息
export const basicList1 = [
  {
    name: "订单编号",
    prop: "orderId",
  },
  {
    name: "订单金额（元）",
    prop: "orderPrice",
  },
  {
    name: "结算金额（元）",
    prop: "settlePrice",
  },
  {
    name: "邮费（元）",
    prop: "postagePrice",
  },
  {
    name: "用户手机号",
    prop: "receiverPhone",
  },
  {
    name: "用户昵称",
    prop: "receiverName",
  },
]
export const basicList2 = [
  {
    name: "下单时间",
    prop: "createTime",
  },
  {
    name: "订单类型",
    prop: "preSaleFlag",
    options: [{
      value: '0',
      name: '普通订单'
    },
    {
      value: '1',
      name: '预售订单'
    }]
  },
  {
    name: "支付方式",
    prop: "payWay",
    options: [{
      value: '2',
      name: '微信app'
    },
    {
      value: '4',
      name: '支付宝app'
    },
    {
      value: '7',
      name: '微信小程序'
    }]
  },
  {
    name: "用户备注",
    prop: "userRemark",
  },
  {
    name: "商家备注",
    prop: "shopRemark",
  },
]
// 商品信息
export const goodsList = [
  {
    name: "商品图片",
    prop: "goodsPic",
    type: "image",
  },
  {
    name: "商品名称",
    prop: "goodsName",
  },
  {
    name: "价格",
    prop: "goodsPrice",
  },
  {
    name: "数量",
    prop: "goodsNum",
  },
  {
    name: "规格",    // 字段
    prop: "goodsSpec",
  },
  {
    name: "小计",
    prop: "totalGoodsPrice",
  },
  {
    name: "状态",
    prop: "refundStatus",
    options: [{
      value: '0',
      name: '未退款'
    },
    {
      value: '1',
      name: '待审核'
    },
    {
      value: '2',
      name: '已退款'
    },
    {
      value: '3',
      name: '不同意退款'
    },
    {
      value: '4',
      name: '同意退货待发货'
    },
    {
      value: '5',
      name: '买家已发货'
    }]
  },
]
