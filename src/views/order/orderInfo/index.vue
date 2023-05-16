<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 18:00:27
 * @LastEditTime: 2022-04-19 20:00:45
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\order\orderList\orderInfo\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="order-info app-container">
    <div class="state">
      <span>状态：</span><dict-tag :options="dict.type.order_status" :value="tableData.orderState"/>
    </div>
    <div class="basic-info">
      <div class="basic-title title">基本信息</div>
      <z-table
        ref="table"
        :tableList="basicList1"
        :tableData="[tableData]"
        :isShowPagination="false"
      />
      <z-table
        ref="table"
        :tableList="basicList2"
        :tableData="[tableData]"
        :isShowPagination="false"
      />
    </div>
    <div class="closed-info column">
      <div class="closed-title title">收货信息</div>
      <z-table
        ref="table"
        :tableList="closedList"
        :tableData="[tableData]"
        :isShowPagination="false"
        :tableHideField="
          tableData.deliveryMethod == '2' ? ['singleReceipt'] : []
        "
      />
    </div>
    <div class="goods-info column">
      <div class="goods-title title">
        <span>商品信息</span>
        <span style="font-size: 14px;padding-right: 15px">共<span style="color: #F56C6C">{{totalGoods}}</span>件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共<span style="color: #F56C6C">{{ totalIncome }}</span>元</span>
      </div>
      <z-table
        ref="table"
        :tableList="goodsList"
        :tableData="tableData.detailEntitylist"
        :isShowPagination="false"
      >
        <!-- <template v-slot:last>
          <el-table-column label="规格" align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>{{ goodsSpec(scope.row.goodsSpec) }}</div>
            </template>
          </el-table-column>
        </template> -->
      </z-table>
    </div>
    <div class="return-info column">
      <div class="return-title title">退款信息</div>
      <z-table
        ref="table"
        :tableList="returnList"
        :tableData="tableData.orderRefundList"
        :isShowPagination="false"
      />
    </div>
    <!-- <div style="margin-top: 30px">
      <el-button type="primary" @click="logisticsClick('1')"
        >商家发货物流信息</el-button
      >
      <el-button type="primary" @click="logisticsClick('2')"
        >买家退货物流信息</el-button
      >
    </div> -->
    <div class="logistics column">
      <div class="logistics-title title">物流信息</div>
      <div class="delivery">
        <div class="delivery-title">
          <span>快递公司:</span
          ><span>{{
            companyName ? companyName : "暂无数据"
          }}</span
          ><span style="padding-left: 40px">快递单号:</span
          ><span>{{
            tableData ? tableData.sendCode : "暂无数据"
          }}</span>
        </div>
        <div v-for="(item, index) of deliveryList" class="delivery-item">
          <div class="item-tiem">
            <span>{{ item.time }}</span>
          </div>
          <div class="item-context">
            <span>{{ item.context }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="logistics column">
      <div class="logistics-title title">卡车物流信息</div>
      <div class="delivery">
        <div style="padding-top: 20px">
          <el-form>
            <el-form-item label="司机姓名：">{{
              deliveryData.driverName
            }}</el-form-item>
            <el-form-item label="司机电话：">{{
              deliveryData.driverPhone
            }}</el-form-item>
            <el-form-item label="发货单：">
              <div style="display: flex">
                <z-image
                  style="padding-left: 10px"
                  :value="item"
                  v-for="(item, index) of deliveryData.invoicePic
                    ? deliveryData.invoicePic.split(',')
                    : []"
                  :key="index"
                ></z-image>
              </div>
            </el-form-item>
          </el-form>
          <el-form v-else>
            <el-form-item label="快递公司：">{{
              deliveryData.deliveryCompanyName
            }}</el-form-item>
            <el-form-item label="快递单号：">{{
              deliveryData.trackingNumber
            }}</el-form-item>
          </el-form>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import ZTable from "@/views/components/Z-Table";
import { getOrderDetail } from "@/api/order/orderInfo";
import { getDeliveryMap } from "@/api/kuaidi";
import ZImage from "@/views/components/Z-Form/z-image";
import {
  goodsList,
  closedList,
  basicList1,
  basicList2,
  returnList,
} from "./config";
export default {
  data() {
    return {
      deliveryList: [],
      deliveryData: {},
      goodsList,
      closedList,
      basicList1,
      returnList,
      basicList2,
      tableData: [],
      companyName: '',
      totalIncome: '',
      totalGoods: ''
    };
  },
  dicts: ['order_status'],
  components: {
    ZTable,
    ZImage,
  },
  computed: {
    goodsSpec() {
      return (data) => {
        data = JSON.parse(data);
        let text = [];
        data.forEach((item) => {
          text.push(`${item.attrName}：${item.attrValue}`);
        });
        return text.join(",");
      };
    },
  },
  created() {
    getDeliveryMap({orderId: this.$route.query.id}).then((res) => {
      this.deliveryList = res.data.trackList;
      this.companyName = res.data.companyName
    });
    getOrderDetail({ orderId: this.$route.query.id}).then((res) => {
      this.tableData = res.data;
      // this.deliveryData = res.data.deliveryList[0]
      //   ? res.data.deliveryList[0]
      //   : {};
      if(this.tableData.detailEntitylist && this.tableData.detailEntitylist.length > 0){
        this.totalGoods = this.tableData.detailEntitylist.length
        this.tableData.detailEntitylist.forEach(e => {
          this.totalIncome = Number(this.totalIncome) + Number(e.totalGoodsPrice)
        })
      }
    });
  },
  methods: {
    logisticsClick(type) {
      let data = this.tableData.deliveryList.find((item) => {
        return item.deliveryType == type;
      });
      this.deliveryData = data ? data : {};
      getDeliveryMap(this.$route.query.id).then((res) => {
        this.deliveryList = res.data[type];
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.state {
  display: flex;
  color: red;
  font-size: 18px;
  padding: 0 20px;
}
.delivery {
  padding: 50px 100px;
  .delivery-title {
    padding-bottom: 20px;
  }
  .delivery-item {
    display: flex;
    padding: 20px 0;
    .item-context {
      padding-left: 20px;
    }
  }
}

.order-info {
  .basic-info {
    border: 1px solid #eee;
  }
}
.column {
  border: 1px solid #eee;
  margin-top: 30px;
}
.title {
  height: 50px;
  line-height: 50px;
  border: 1px solid #eee;
  padding-left: 20px;
}
.goods-title{
  display: flex;
  justify-content: space-between;
}
.info-column {
  display: flex;
  padding: 20px;

  .column-item {
    flex: 1;
    .item-title {
      height: 50px;
      line-height: 50px;
      border: 1px solid #eee;
      text-align: center;
      background: rgb(245, 244, 244);
    }
    .item-text {
      text-align: center;
      padding: 25px 0;
      border: 1px solid #eee;
    }
  }
}
</style>
