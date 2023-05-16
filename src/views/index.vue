<template>
  <div class="app-container">
    <!-- 平台端才展示总概览 -->
    <div class="overview" v-if="deptId!=110">
      <p class="title">平台总概览</p>
      <div class="overview-list">
        <div class="overview-item item-one">
          <img class="item-icon" src="@/assets/images/imgs/user.png" alt="">
          <div>
            <div class="overview-count">
              <el-statistic title="平台用户总数" group-separator="," :value-style="{color:'#fff'}"
                :value="platform.platformUserNum">
                <template slot="suffix">
                  <span>人</span>
                </template>
              </el-statistic>
            </div>
          </div>
        </div>
        <div class="overview-item item-two">
          <img class="item-icon" src="@/assets/images/imgs/store.png" alt="">
          <div class="overview-count">
            <el-statistic title="平台商家总数" group-separator="," :value-style="{color:'#fff'}"
              :value="platform.platformShopNum">
              <template slot="suffix">
                <span>人</span>
              </template>
            </el-statistic>
          </div>

        </div>
        <div class="overview-item item-three">
          <img class="item-icon" src="@/assets/images/imgs/goods.png" alt="">
          <div class="overview-count">
            <el-statistic title="平台商品总数" group-separator="," :value-style="{color:'#fff'}"
              :value="platform.platformGoodsNum">
              <template slot="suffix">
                <span>件</span>
              </template>
            </el-statistic>
          </div>

        </div>
        <div class="overview-item item-four">
          <img class="item-icon" src="@/assets/images/imgs/order.png" alt="">
          <div class="overview-count">
            <el-statistic title="平台已完成订单总数" group-separator="," :value-style="{color:'#fff'}"
              :value="platform.platformOrderNum">
              <template slot="suffix">
                <span>笔</span>
              </template>
            </el-statistic>
          </div>

        </div>
        <div class="overview-item item-five">
          <img class="item-icon" src="@/assets/images/imgs/income.png" alt="">
          <div class="overview-count">
            <el-statistic title="平台订单收款总额" group-separator="," :value-style="{color:'#fff'}"
              :value="platform.platformBalance">
              <template slot="suffix">
                <span>元</span>
              </template>
            </el-statistic>
          </div>

        </div>
      </div>
    </div>
    <el-row :gutter="30">
      <el-col :span="8">
        <div class="overview" style="padding-bottom:5px">
          <p class="title">待办事项</p>
          <ul class="deal-ul">
            <li class="deal-item">
              <img src="@/assets/images/imgs/icon1.png" class="deal-icons" />
              <div>
                <el-statistic group-separator="," :value="toDo.needPayNum"></el-statistic>
                <p>待付款数量</P>
              </div>
            </li>
            <li class="deal-item">
              <img src="@/assets/images/imgs/icon2.png" class="deal-icons" />
              <div>
                <el-statistic group-separator="," :value="toDo.payeeNum"></el-statistic>
                <p>待发货数量</P>
              </div>
            </li>
            <li class="deal-item">
              <img src="@/assets/images/imgs/icon3.png" class="deal-icons" />
              <div>
                <el-statistic group-separator="," :value="toDo.deliveredNum"></el-statistic>
                <p>待收货数量</P>
              </div>
            </li>
            <li class="deal-item">
              <img src="@/assets/images/imgs/icon4.png" class="deal-icons" />
              <div>
                <el-statistic group-separator="," :value="toDo.receiveNum"></el-statistic>
                <p>已完成数量</P>
              </div>
            </li>
            <li class="deal-item">
              <img src="@/assets/images/imgs/icon5.png" class="deal-icons" />
              <div>
                <el-statistic group-separator="," :value="toDo.refundMoneyNum"></el-statistic>
                <p>退款中数量</P>
              </div>
            </li>
            <li class="deal-item">
              <img src="@/assets/images/imgs/icon6.png" class="deal-icons" />
              <div>
                <el-statistic group-separator="," :value="toDo.refundGoodsNum"></el-statistic>
                <p>退货中数量</P>
              </div>
            </li>
          </ul>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="overview">
          <p class="title">商品概览</p>
          <div class="goods-item goods-one">
            <img src="@/assets/images/imgs/goods1.png" class="goods-icons" />
            <el-statistic title="商品总数量" group-separator="," :value="goods.goodsTotalNum">
              <template slot="suffix">
                <span>件</span>
              </template>
            </el-statistic>

          </div>
          <div class="goods-item goods-two">
            <img src="@/assets/images/imgs/goods2.png" class="goods-icons" />
            <el-statistic title="上架总数量" group-separator="," :value="goods.goodsOnSaleNum">
              <template slot="suffix">
                <span>件</span>
              </template>
            </el-statistic>

          </div>
          <div class="goods-item goods-three">
            <img src="@/assets/images/imgs/goods3.png" class="goods-icons" />
            <el-statistic title="未上架总数量" group-separator="," :value="goods.goodsDownSaleNUm">
              <template slot="suffix">
                <span>件</span>
              </template>
            </el-statistic>

          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="overview">
          <p class="title">订单概览</p>
          <div class="order-ul">
            <div class="order-item order-one">
              <el-statistic title="已完成订单总数" group-separator="," :value="order.orderTotalNum">
                <template slot="suffix">
                  <span>笔</span>
                </template>
              </el-statistic>

            </div>
            <div class="order-item order-two">
              <el-statistic title="退款订单数" group-separator="," :value="order.orderRefundMoneyNum">
                <template slot="suffix">
                  <span>笔</span>
                </template>
              </el-statistic>

            </div>
            <div class="order-item order-three">
              <el-statistic title="退货订单数" group-separator="," :value="order.orderRefundMoneyNum">
                <template slot="suffix">
                  <span>笔</span>
                </template>
              </el-statistic>

            </div>
            <div class="order-item order-four">
              <el-statistic title="订单收款总额" group-separator="," :value="order.orderTotalBalance">
                <template slot="suffix">
                  <span>元</span>
                </template>
              </el-statistic>

            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div class="overview">
      <div class="chart-title">
        <p class="title">交易趋势</p>
        <el-date-picker v-model="pickerVal" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <line-chart className="user" :xData="echartsData.xData" :yData="echartsData.yData"
        :yAxisOptions=echartsData.yAxisOptions :seriesOptions=echartsData.seriesOptions
        :xAxisOptions=echartsData.xAxisOptions></line-chart>
    </div>
  </div>
</template>
<script>
import LineChart from "@/views/dashboard/LineChart.vue";
import BarChart from "@/views/dashboard/BarChart.vue";
import { backlog, order, orderStatistics, goods, platform } from "@/api/index";
import { format } from "@/utils/index.js";
export default {
  components: {
    LineChart,
    BarChart,
  },

  data () {
    return {
      value3: '',
      pickerVal: null,
      platform: {},
      toDo: {},
      goods: {},
      order: {},

      echartsData: {
        yData: [820, 932, 901, 934, 1290, 1330, 1320],
        xData: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

        yAxisOptions: {
          axisLine: { show: false },
          axisTick: { show: false },
          axisLabel: { color: '#C6C5DE' },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          },
          splitArea: {
            show: false
          }
        },
        xAxisOptions: {
          axisLine: {
            show: true,
            lineStyle: {
              color: '#C6C5DE'
            }
          },
          axisTick: {
            show: true,
            lineStyle: {
              color: '#C6C5DE'
            }
          },
          axisLabel: { color: '#C6C5DE' },
        },
        seriesOptions: {
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(254,201,73,0.20)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(254,201,73,0.00)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            },
            axisLine: true
          },
          lineStyle: {
            color: '#FCC148',
            shadowColor: 'rgba(252,193,72,0.50)',
            shadowOffsetX: 1,
            shadowOffsetY: 1,
          },
          itemStyle: {
            color: '#FCC148'
          }
        }
      },
    };
  },

  computed: {
    deptId () {
      return this.$store.getters.deptId;
    },
    shopId () {
      return this.$store.getters.shopId;
    },
  },

  created () {
    if (!this.deptId) {
      this.$router.replace({ path: "/merchantPort" });
    }
    backlog().then((res) => {
      this.toDo = res.data;
    });
    order().then((res) => {
      this.order = res.data;
    });

    goods().then((res) => {
      this.goods = res.data;
    });
    if (this.deptId == "110") {
      platform().then((res) => {
        this.platform = res.data;
      });
    }


  },

  mounted () {
    let end = new Date();
    let start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    end = format(end, "yyyy-mm-dd");
    start = format(start, "yyyy-mm-dd");
    this.pickerVal = [`${start} 00:00:00`, `${end} 00:00:00`];
    this.getUserEcharts();
  },

  methods: {
    getUserEcharts () {

      let params = {
        startTime: this.pickerVal[0],
        endTime: this.pickerVal[1],
        type: this.deptId == 110 ? '1' : '0',
        shopId: this.shopId
      };
      orderStatistics(params).then((res) => {
        this.echartsData.xData = Object.keys(res.data);
        this.echartsData.yData = Object.values(res.data);
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  font-size: 14px;
  color: #4e4e4e;
}
.overview {
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  margin-bottom: 20px;
  padding: 20px;
}
.title {
  position: relative;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  padding-left: 10px;
}
.title:after {
  position: absolute;
  top: 4px;
  left: 0px;
  content: "";
  width: 0;
  height: 20px;
  border: 2px #147af2 solid;
  border-radius: 2px;
}
.overview-list {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
.overview-item {
  width: 19%;
  display: flex;
  align-items: center;
  color: #fff;
  border-radius: 5px;
  padding-left: 30px;
  padding-top: 13px;
  padding-bottom: 13px;
}
.item-one {
  background: linear-gradient(90deg, #2276fc, #6ba8fc 98%);
}
.item-two {
  background: linear-gradient(270deg, #25d9e5, #0ac2cf);
}
.item-three {
  background: linear-gradient(90deg, #fc9f00 0%, #ffcd0b);
}
.item-four {
  background: linear-gradient(90deg, #ff6767, #ff8a63);
}
.item-five {
  background: linear-gradient(90deg, #9172e4, #af93fd);
}
.item-icon {
  width: 70px;
  height: 62px;
  margin-right: 30px;
}
.overview-count {
  font-size: 24px;
  display: flex;

  span {
    font-size: 14px;
  }
  .el-statistic {
    ::v-deep .head {
      color: #fff;
      font-size: 14px;
    }
    ::v-deep .suffix {
      color: #fff;
      margin-top: -5px;
      // font-size: 14px;
    }
    ::v-deep .con {
      justify-content: flex-start;
    }
  }
}
.deal-ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  padding: 0;
  padding-top: 2px;
  margin-bottom: 4px;
}
.deal-item {
  width: 48%;
  display: flex;
  align-items: center;
  position: relative;
  background: #ebf3fd;
  border-radius: 3px;
  padding: 16px;
  margin-bottom: 16px;
  p {
    font-size: 14px;
  }
  .el-statistic {
    margin-bottom: 6px;
    ::v-deep .suffix {
      margin-top: -5px;
    }
    ::v-deep .con {
      color: #357de9;
      justify-content: flex-start;
    }
  }
}
.deal-item:after {
  position: absolute;
  top: 0px;
  left: 0px;
  content: "";
  width: 4px;
  height: 100%;
  background: #66a2fc;
  border-radius: 1px 0px 0px 0px;
}
.deal-item p,
.goods-item p {
  margin: 0;
}
.deal-icons {
  width: 54px;
  height: 54px;
  margin-right: 30px;
}
.deal-count {
  font-size: 24px;
  color: #357de9;
}
.goods-item {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4e4e4e;
  border-radius: 5px;
  padding: 14px;
  margin-top: 16px;
  .el-statistic {
    width: inherit;
    ::v-deep .head {
      font-size: 14px;
    }
    ::v-deep .suffix {
      margin-top: 4px;
    }
    ::v-deep .con {
      justify-content: flex-start;
    }
  }
}
.goods-one {
  background: #fef2e8;
}
.goods-two {
  background: #ebf3fd;
}
.goods-three {
  background: #e1faf7;
  margin-bottom: 6px;
}
.goods-icons {
  width: 58px;
  height: 58px;
  margin-right: 50px;
}
.goods-count {
  font-size: 24px;
  color: #333333;
}
.order-ul {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 16px;
}
.order-item {
  width: 48%;
  padding-top: 21px;
  padding-left: 23px;
  padding-bottom: 60px;
  margin-bottom: 16px;
  .el-statistic {
    ::v-deep .head {
      text-align: left;
      margin-bottom: 13px;
      font-size: 14px;
    }
    ::v-deep .suffix {
      margin-top: 2px;
    }
    ::v-deep .con {
      justify-content: flex-start;
    }
  }
}
.order-one {
  background: url("../assets/images/imgs/bg1.png") no-repeat 100% 100%;
  background-size: 100% 100%;
}
.order-two {
  background: url("../assets/images/imgs/bg2.png") no-repeat 100% 100%;
  background-size: 100% 100%;
}
.order-three {
  background: url("../assets/images/imgs/bg3.png") no-repeat 100% 100%;
  background-size: 100% 100%;
}
.order-four {
  background: url("../assets/images/imgs/bg4.png") no-repeat 100% 100%;
  background-size: 100% 100%;
}
.chart-title {
  display: flex;
  justify-content: space-between;
}

.Chart {
  margin-bottom: 30px;
  border: 1px solid #eee;
  .content {
    width: 85%;
    margin: 0 auto;
  }
}
</style>
