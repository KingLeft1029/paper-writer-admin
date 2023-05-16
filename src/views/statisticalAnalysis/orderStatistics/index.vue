<template>
  <div class="app-container">
    <div class="title">订单分析</div>
    <div class="form">
      <div>
        <el-date-picker
          @change="pickerChangt"
          v-model="pickerVal"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </div>
    </div>
    <line-chart :xData="xData" :yData="yData"></line-chart>
    <div class="title">订单销售额分析</div>
    <div class="form">
      <div>
        <el-date-picker
          @change="pickerChangt"
          v-model="pickerVal"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </div>
    </div>
    <bar-chart :xData="xData" :yData="yData"></bar-chart>
  </div>
</template>

<script>
import LineChart from "../../dashboard/LineChart.vue";
import BarChart from "../../dashboard/BarChart.vue";
import { order } from "@/api/statisticalAnalysis";
import { format } from "@/utils/index.js";
export default {
  data() {
    return {
      pickerVal: null,
      endTime: "",
      startTime: "",
      xData: [],
      yData: [],
    };
  },
  components: {
    LineChart,
    BarChart
  },
  created() {},
  mounted() {
    const end = new Date();
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
    this.endTime = `${format(end, "yyyy-mm-dd")} 00:00:00`;
    this.startTime = `${format(start, "yyyy-mm-dd")} 00:00:00`;
    this.pickerVal = [`${start} 00:00:00`, `${end} 00:00:00`];

    this.getData();
  },
  methods: {
    pickerChangt(val) {
      if (val) {
        this.endTime = val[1];
        this.startTime = val[0];
      } else {
        this.createdTime();
      }
      this.getData();
    },
    getData() {
      let params = {
        endTime: this.endTime,
        startTime: this.startTime,
        type: 2,
      };
      order(params).then((res) => {
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
