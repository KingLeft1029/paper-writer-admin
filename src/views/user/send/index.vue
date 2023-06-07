<template>
  <div class="app-container">
    <img class="back" @click="back" src="@/assets/icons/back.png" alt="">
    <div class="box">
      <div class="box-title">{{ $t('userinfo') }}</div>

      <el-row :gutter="20" class="mt20">
        <el-col :span="8">
          <span>{{ $t('UserID') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="8">
          <span>{{ $t('Nickname') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="8">
          <span>{{ $t('IDENTIFY') }}：</span>
          <span>0230407000000</span>
        </el-col>

      </el-row>


       <div class="box-title mt60">{{ $t('EMAIL_CONTENT') }}</div>

      <el-row :gutter="20" class="mt20">
        <el-col :span="6">
          <span>{{ $t('RECIPIENNT_EMIAL_ADDRESS') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
         <el-col :span="24">
          <span  >{{ $t('SUBJECT_EMAIL') }}：</span>
          <el-input class="mt10" v-model="value" :placeholder="$t('PLEASE_ENTER_EMAIL')"></el-input>
        </el-col>
       </el-row>
       <el-row :gutter="20" class="mt20">
         <el-col :span="24">
          <span >{{ $t('EMAIL_CONTENT') }}：</span>
         <editor  class="mt10"></editor>
        </el-col>
       </el-row>
       <div class="btn-box mt20">
        <el-button  type="primary">{{$t('SEND_MAIL')}}</el-button>
        <el-button  type="" @click="back">{{$t('Back')}}</el-button>
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
