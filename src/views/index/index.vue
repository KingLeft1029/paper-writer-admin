<!--
 * @Author: mikeShn
 * @Date: 2022-03-15 15:10:43
 * @LastEditTime: 2022-04-14 13:29:53
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\index.vue
 * @Description: 文件说明 首页

-->
<template>
  <div class="index-container">
    <div class="flex align-center">
      <div class="avatar-box">
        <img :src="avatar" class="user-avatar" style="border-radius: 50%" />
      </div>
      <div class="logn-word flex flex-column justify-around">
        <div>{{name}},{{ $t('WELCOME') }}</div>
        <div>{{$t('LAST_LOGIN')}}：2019年7月10日 星期三 20:30:23</div>
      </div>
    </div>
    <el-row :gutter="20" class="row-box">
      <el-col :span="8">
        <div class="grid-content bg-purple-dark">

          <div>
            <div>{{$t('Users')}}</div>
            <div class="num-word">2000</div>
          </div>
          <img src="@/assets/index/yonghu.png" alt="">
        </div>

      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple">
          <div>
            <div>{{ $t('Videos') }}</div>
            <div class="num-word">2000</div>
          </div>
          <img src="@/assets/index/course.png" alt="">
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple-light">
          <div>
            <div>{{ $t('Threads') }}</div>
            <div class="num-word">2000</div>
          </div>
          <img src="@/assets/index/article.png" alt="">
        </div>
      </el-col>

    </el-row>
    <el-row :gutter="20" class="mt50">
      <el-col :span="8">
        <div class="grid-content border-left">
          <div class="flex flex-column justify-between ">
            <div class="grey ">{{$t('NEW_YESTER')}}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{ $t('NEW_LAST') }}</div>
            <div class="black mt20">170</div>
          </div>
          <div>
            <div class="grey">{{ $t('NEW_PAST') }}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{ $t('CUMU') }}</div>
            <div class="black mt20">170</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content border-left">
          <div class="flex flex-column justify-between ">
            <div class="grey ">{{ $t('TOP_YE') }}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{ $t('TOP_30') }}</div>
            <div class="black mt20">170</div>
          </div>
          <div>
            <div class="grey"> {{$t('TOP_7')}}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{$t('TOP_P')}}</div>
            <div class="black mt20">170</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content border-left">
          <div class="flex flex-column justify-between ">
            <div class="grey ">{{ $t('AMOUT') }}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{ $t('AMOUT_30') }}</div>
            <div class="black mt20">170</div>
          </div>
          <div>
            <div class="grey">{{ $t('VIDEO_7') }}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{$t('CUMN_RE')}}</div>
            <div class="black mt20">170</div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="mt50">
      <el-col :span="8">
        <div class="grid-content border-left pink">
          <div class="flex flex-column justify-between ">
            <div class="grey ">{{ $t('YE_VIDEO') }}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{ $t('VIDEO_30') }}</div>
            <div class="black mt20">170</div>
          </div>
          <div>
            <div class="grey">{{ $t('VIDEO_7') }} </div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{ $t('VIDEO_IN') }}</div>
            <div class="black mt20">170</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content border-left pink">
          <div class="flex flex-column justify-between ">
            <div class="grey ">{{ $t('THREAD_IN') }}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20">{{ $t('THREAD_30') }}</div>
            <div class="black mt20">170</div>
          </div>
          <div>
            <div class="grey"> {{ $t('THREAD_7') }}</div>
            <div class="black mt20">170</div>
            <div class="grey mt20"> {{ $t('THREAD_IN_CUM') }}</div>
            <div class="black mt20">170</div>
          </div>
        </div>
      </el-col>

    </el-row>
    <h2 class="mt100">{{ $t('VIDEO_TREND') }}</h2>
    <div class="flex justify-end">
      <el-select v-model="valueCourse" :placeholder="$t('PLEASE_SELECT')">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div id="chart">

    </div>
    <h2 class="mt70">{{ $t('INK_TREND') }}</h2>
    <div class="flex justify-end">
      <el-select v-model="valueGive" :placeholder="$t('PLEASE_SELECT')">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div id="chartb">

</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as echarts from 'echarts';
export default {

  data() {
    return {
      valueCourse:1,
      valueGive:1,
      options: [{ label: $t('JYZ'), value: 1 }, { label: $t('LAST_MONTHS'), value: 2 }, { label: $t('LAST_SIX'), value: 3 }, { label: $t('LAST_YEAR'), value: 4 }]
    };
  },
  watch: {
    valueCourse: {
      handler(val) {
        if (val) {

       this.$nextTick(()=>{
        this.getCourse()
       })
        }
      },
      deep: true,
      immediate: true
    },
    valueGive: {
      handler(val) {
        if (val) {
          this.$nextTick(()=>{
         this.getGive()
        })
        }
      },
      deep: true,
      immediate: true
    }
  },
  components: {

  },

  computed: {
    ...mapGetters(["avatar","name"]),
  },
  methods: {
    //课程收入增长趋势
    getCourse(){
      let xdata = ['2022-12-12', '2022-12-13', '2022-12-12', '2022-12-13', '2022-12-12', '2022-12-13']

    let ydata = [{
      data: [200, 11, 100, 99, 500, 66], type: 'line', areaStyle: {
        opacity: 0.8,
        itemStyle: {
          color: '#5b8ff9'
        },
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color:'#5b8ff9'
          },
          {
            offset: 0,
            color:'#5b8ff9'
          },
          {
            offset: 1,
            color: '#fff'
          }
        ])
      },
    }]
    this.$chart.area('chart', xdata, ydata,'#5b8ff9')
    },
    //打赏收入增长趋势
    getGive(){
      let xdata = ['2022-12-12', '2022-12-13', '2022-12-12', '2022-12-13', '2022-12-12', '2022-12-13']

    let ydata = [{
      data: [200, 11, 100, 99, 500, 66], type: 'line', areaStyle: {
        opacity: 0.8,
        itemStyle: {
          color: '#ff99c2'
        },
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color:'#ff99c2'
          },
          {
            offset: 0,
            color:'#ff99c2'
          },
          {
            offset: 1,
            color: '#fff'
          }
        ])
      },
    }]
    this.$chart.area('chartb', xdata, ydata,'#ff99c2')
    }
  },
  mounted() {



    // this.$api
    //     .postTest(data, '/srip/science/personalCenter/cgStatistics')
    //     .then(res => {
    // let lidata =
    // let colorList = getColor(lidata)
    // var date = new Date()
    // let xdata = this.dateMain.getyearMouth(date.getFullYear())
    // let xdata = this.dateMain.getYearAndMonth(data.beginTime, data.endTime)
    // let ydata = []

    // for (let i = 0; i < lidata.length; i++) {
    //   let tdata = []
    //   for (let j = 0; j < lidata[i].voList.length; j++) {
    //     tdata.push(lidata[i].voList[j].count)
    //   }
    //   ydata.push({
    //     name: lidata[i].type,
    //     type: 'line',
    //     stack: 'Total',
    //     smooth: true,
    //     itemStyle: {
    //       color: colorList[i].deep
    //     },
    //     showSymbol: false,
    //     areaStyle: {
    //       opacity: 0.8,
    //       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    //         {
    //           offset: 0,
    //           color: colorList[i].deep
    //         },
    //         {
    //           offset: 0,
    //           color: colorList[i].low
    //         },
    //         {
    //           offset: 1,
    //           color: '#fff'
    //         }
    //       ])
    //     },
    //     emphasis: {
    //       focus: 'series'
    //     },
    //     data: tdata
    //   })
    // }

    // let mylist = this.dateMain.newBeforeDate(14)
    // console.log(ydata, 'bbbb')
    // this.$chart.area('chart', xdata, ydata)
    // })
    // .catch(err => console.log(err))

  },
  created() { },
};
</script>
<style lang="scss" scoped>
#chart,#chartb {
  width: 100%;
  height: 358px;
}

.index-container {
  width: 100%;
  padding: 87px;
  background-color: #fff;

  .avatar-box {
    width: 70px;
    height: 70px;
    border-radius: 50%;

    img {
      width: 70px;
    }

  }

  .logn-word {
    color: #979393;
    margin-left: 30px;
  }

  .row-box {

    margin-top: 70px;




  }

}


.bg-purple-dark {
  background-color: #ff99c2;
}

.bg-purple {
  background-color: #5b8ff9;
}

.bg-purple-light {
  background-color: rgb(90, 216, 166);
}

.grid-content {
  border-radius: 12px;
  min-height: 165px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 45px 50px !important;
  padding-right: 70px !important;

  .num-word {
    font-size: 28px;
    font-weight: bold;
    margin-top: 16px;
  }
}

.border-left {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  box-shadow: 2px 2px 10px #e9e8e8;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  border-left: 5px solid rgb(90, 216, 166);

  .grey {
    color: #979393;
  }

  .black {
    color: #444444;
    font-weight: bold;
  }
}

.pink {
  border-left: 5px solid rgb(255, 153, 194);
}



.mt50 {
  margin-top: 50px;
}

.mt70 {
  margin-top: 70px;
}

.mt100{
  margin-top: 100px;
}
</style>
