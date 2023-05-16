<!--
 * @Author: mikeShn
 * @Date: 2022-03-14 15:54:49
 * @LastEditTime: 2022-03-23 14:37:44
 * @FilePath: \blindBoxWeb\src\views\dashboard\BarChart.vue
 * @Description: 文件说明
-->
<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    xData: [Array],
    yData: [Array],
    name: [String],
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    xData() {
      this.initChart();
    },
    yData() {
      this.initChart();
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          top: 10,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: this.xData,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: this.name,
            type: "bar",
            stack: "vistors",
            barWidth: "60%",
            data: this.yData,
            animationDuration,
          },
        ],
      });
    },
  },
};
</script>
