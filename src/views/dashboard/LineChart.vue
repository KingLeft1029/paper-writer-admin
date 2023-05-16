<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

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
      default: "350px",
    },
    autoResize: {
      type: Boolean,
      default: true,
    },
    xData: [Array],
    yData: [Array],
    name: [String],
    seriesOptions: {
      type: Object,
      default: {}
    },
    yAxisOptions: {
      type: Object,
      default: {
        axisLine: true,
        axisTick: true,
      },
    },
    xAxisOptions: {
      type: Object,
      default: {
        axisLine: {show: true},
        axisTick: {show: true},
        axisLabel: {}
      },
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    xData: {
      deep: true,
      handler(val) {
        this.initChart();
      },
    },
    yData: {
      deep: true,
      handler(val) {
        this.initChart();
      },
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
      this.setOptions();
    },
    setOptions() {
      this.chart.setOption({
        xAxis: {
          type: "category",
          data: this.xData,
          boundaryGap: false,
          axisTick: this.xAxisOptions.axisTick,
          axisLine: this.xAxisOptions.axisLine,
          axisLabel: this.xAxisOptions.axisLabel
        },
        grid: {
          top: 10,
          left: "2%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            lineStyle: {
              color: '#E3E2F0'
            }
          },
          padding: [5, 10],
        },
        yAxis: {
          type: "value",
          axisLine: this.yAxisOptions.axisLine,
          axisTick: this.yAxisOptions.axisTick,
          axisLabel: this.yAxisOptions.axisLabel,
          splitLine: this.yAxisOptions.splitLine,
          splitArea: this.yAxisOptions.splitArea
        },
        legend: {},
        series: [
          {
            name: this.name,
            type: "line",
            data: this.yData,
            areaStyle: this.seriesOptions.areaStyle,
            lineStyle: this.seriesOptions.lineStyle,
            itemStyle: this.seriesOptions.itemStyle
          },
        ],
      });
    },
  },
};
</script>
