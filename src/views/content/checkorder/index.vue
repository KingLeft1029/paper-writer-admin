<template>
  <div class="app-container">
    <img class="back" @click="back" src="@/assets/icons/back.png" alt="">
    <div class="box-shadow">
      <div class="box-title">{{ $t('VIDEO_INFO') }}</div>
      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('COURSE_TITLE') }}：名称</el-col>
        <el-col :span="8">
          <el-button>{{ $t('VIEW_DE') }}</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('VIDEO_CO') }}：
          <img src="../../../assets/course/img.png" alt="">
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('Author') }}：张用户</el-col>
        <el-col :span="8">
          {{ $t(' Newest') }}：2023.02.20
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('Tags') }}：
          <span>标签A</span>
        </el-col>
        <el-col :span="8">
          {{ $t('TYPE_COURSE') }}：2023.02.20
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('PAYMENT_TYPE') }}：
          <span>标签A</span>
        </el-col>
        <el-col :span="8">
          {{ $t('COURSE_INK_R') }}：2023.02.20
        </el-col>
      </el-row>
    </div>
    <div class="box-shadow">
      <div class="box-title">{{ $t('userinfo') }}</div>
      <el-row :gutter="20" class="mt40">
        <el-col :span="6">{{ $t('UserID') }}：名称</el-col>
        <el-col :span="6">
          {{ $t('Nickname') }}：哈哈哈
        </el-col>
        <el-col :span="6">
          {{ $t('Email') }}：哈哈哈
        </el-col>
        <el-col :span="6">
          {{ $t('IDENTIFY') }}：哈哈哈
        </el-col>
      </el-row>
    </div>
    <div class="box-shadow">
      <div class="box-title" >{{ $t('PAID_INFORMATION') }}</div>
      <el-row :gutter="20" class="mt40">
        <el-col :span="12">{{ $t('ACTUAL_INK') }}：名称</el-col>
        <el-col :span="12">
          {{ $t('Status') }}：哈哈哈
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt40">
        <el-col :span="12">
          {{ $t('PAY_TIME') }}：哈哈哈
        </el-col>
        <el-col :span="12">
          {{ $t('REGIST_TIME') }}：哈哈哈
        </el-col>
      </el-row>
      <el-row :gutter="20" >
        <el-col :span="12">
          {{ $t('USE_COUPONS') }}：哈哈哈
        </el-col>
        <el-col :span="12">
          {{ $t('COUPON_INK') }}：哈哈哈
        </el-col>
      </el-row>

    </div>
    <div class="btn-box mt20" @click="back">
        <el-button  type="">{{$t('Back')}}</el-button>

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
    back() {
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
