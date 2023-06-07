<template>
  <div class="app-container">
    <img class="back" @click="back" src="@/assets/icons/back.png" alt="">
    <div class="box-shadow">
    <div class="box-title">帖子名称</div>

      <el-row :gutter="20" class="grey-word">
        <el-col :span="6">
          <span>{{ $t('Author') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('Tags') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('热度值') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>1{{ $t('点击') }}</span>
          <span>1{{ $t('点赞') }}</span>
          <span>1{{ $t('收藏') }}</span>
          <span>1{{ $t('评论') }}</span>
          <span>1{{ $t('分享') }}</span>
        </el-col>
      </el-row>
      <div class="mt40 editor-box">
        富文本内容
      </div>



      <div class="btn-box mt20" @click="back">
        <el-button  type="">{{$t('Back')}}</el-button>

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
    };
  },
  methods: {
    back(){
      this.$router.go(-1)
    },
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 120px;
}
</style>
