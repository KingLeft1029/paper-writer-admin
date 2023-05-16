<template>
  <div class="app-container">
    <div class="title">商品数量统计</div>
    <div class="form">
      <el-form inline>
        <el-form-item label="商家名称" v-if="deptId == '110'"
          ><el-select v-model="shopId" @change="getData">
            <el-option
              v-for="(item, index) of selectList"
              :key="index"
              :value="item.shopId"
              :label="item.shopName"
            ></el-option></el-select
        ></el-form-item>
        <el-form-item
          ><el-date-picker
            @change="pickerChangt"
            v-model="pickerVal"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker
        ></el-form-item>
      </el-form>
    </div>
    <bar-chart :xData="xData" :yData="yData"></bar-chart>
  </div>
</template>

<script>
import BarChart from "../../dashboard/BarChart.vue";
import { goods } from "@/api/statisticalAnalysis";
import { format } from "@/utils/index.js";
import { shopInfoList } from "@/api/shopInfo";
export default {
  data() {
    return {
      shopId: null,
      selectList: [],
      pickerVal: null,
      endTime: "",
      startTime: "",
      xData: [],
      yData: [],
    };
  },
  components: {
    BarChart,
  },
  computed: {
    deptId() {
      return this.$store.getters.deptId;
    },
  },
  created() {
    shopInfoList({}).then((res) => {
      this.selectList = res.data;
    });
  },
  mounted() {
    this.createdTime()
    this.getData();
  },
  methods: {
    createdTime() {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      this.endTime = `${format(end, "yyyy-mm-dd")} 00:00:00`;
      this.startTime = `${format(start, "yyyy-mm-dd")} 00:00:00`;
      this.pickerVal = [`${start} 00:00:00`, `${end} 00:00:00`];
    },
    pickerChangt(val) {
      if (val) {
        this.endTime = val[1];
        this.startTime = val[0];
      } else {
        this.createdTime()
      }

      this.getData();
    },
    getData() {
      let params = {
        endTime: this.endTime,
        startTime: this.startTime,
        shopId: this.shopId,
        type: this.deptId == "110" ? 1 : 0,
      };
      goods(params).then((res) => {
        this.xData = Object.keys(res.data);
        this.yData = Object.values(res.data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: flex-end;
  div{
    margin-right: 150px;
  }
}
</style>
