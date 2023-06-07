/**
 * 各种画echarts图表的方法都封装在这里
 * 注意：这里echarts没有采用按需引入的方式，只是为了方便学习
 */
import * as echarts from 'echarts';

import store from './store'
import router from './router'


const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get() {
        return {



          //线形图
          line1: function (id, xdata, ydata, sdata, that, isno) {

            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();

            const optionData = {
              tooltip: {
                trigger: 'axis',

              },
              legend: {
                orient: 'horizontal',
                itemGap: 40,
                textStyle: {
                  color: '#333'
                  // ...
                },
                top: '20px',
                right: "10%",
                itemHeight: 16,

                fontSize: 12,
                padding: [0, 0, -3, 0], // 修改文字和图标距离
                // ...
              },
              xAxis: {
                data: xdata
              },
              yAxis: {
                splitLine: {
                  show: isno
                }
                // data: [0, 500, 1000, 1500,1800]
              },
              series: sdata

            }
            this.chart.setOption(optionData)

            this.chart.on('click', function (params) {
              // 控制台打印数据的名称'chart1'
              console.log(params)
              console.log(params.name)
              // that.$router.push({
              // 	path: '/EventSearch',
              // 	query: {
              // 		language: params.seriesName,
              // 		times: params.name
              // 	}
              // });
            })

          },






          // 区域
          area: function (id, xdata, ydata, color, ) {

            this.chart = echarts.init(document.getElementById(id))
            this.chart.clear()

            const optionData = {
              color:[`${color}`],
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross',
                  // label: {
                  //   backgroundColor: '#6a7985'
                  // }
                }
              },
              // legend: {
              //   itemHeight: 2,
              //   itemWidth: 16,
              //   data: legendData,
              //   bottom: 20
              // },
              // toolbox: {
              //   feature: {
              //     saveAsImage: {}
              //   }
              // },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '20%',
                containLabel: true
              },
              xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: xdata
              }],
              yAxis: [{
                type: 'value',
                minInterval: 1
              }],
              series: ydata
            }
            this.chart.setOption(optionData)


          },



        }
      }
    }
  })
}
export default {
  install
}
