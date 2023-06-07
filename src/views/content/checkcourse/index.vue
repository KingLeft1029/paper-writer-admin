<template>
  <div class="app-container">

    <div class="box-shadow">
      <div class="flex  ">
        <div class="left mr20">
          <el-button type="" @click="trySee">{{ $t('TRY_SEE') }}</el-button>
        </div>
        <div class="right flex flex-column justify-between">
          <h2>课程名称</h2>
          <div>
            <span>{{ $t('RELEASE_TIME') }} :2023.02.22</span>
          </div>
          <div >
            <span>{{ $t('label') }} :2023.02.22</span>
          </div>
          <div>
              <span class="mr20">98%好评</span>
              <span class="mr20">2收藏 </span>
              <span class="mr20">6评论</span>
              <span >0分享</span>
            </div>
          <div>
            <span class="big-size mr40">6节课程</span>
            <span class="big-size mr40">3小时9分钟</span>
            <span class="big-size">21人报名</span>
          </div>
        </div>
      </div>
      <div class="big-yellow-word mt20">9999墨水</div>
    </div>
   <div class="box-shadow other-shadow">
    <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :label="$t('COURSE_INTRO')" name="first"></el-tab-pane>
    <el-tab-pane :label="$t('COURSE_CHAPTER')" name="second"></el-tab-pane>
    <el-tab-pane label="课程评论" name="third"></el-tab-pane>
  </el-tabs>
  <!-- <div  class="content-box">

  </div> -->
  <div  class="no-data">
    暂无数据
  </div>
   </div>
  </div>
</template>

<script>

export default {
  components: {

  },
  data() {
    return {
      activeName: 'second'
    };
  },
  methods: {
    trySee(){
      this.$router.push({path:'/content/video',query:{id:1}})
    }
  }
};
</script>

<style lang="scss" scoped>
.box-shadow{
  .left{
    width:300px;
    height: 260px;
    border: 1px solid #dedede;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    padding-bottom: 60px;
  }
}

.box-shadow{
  margin-top: 56px;
  ::v-deep .el-tabs__item{
font-size: 24px;

}
::v-deep .el-tabs__nav{
  padding-bottom: 12px;
}
}
.other-shadow{
  padding-top:18px ;
}
</style>
