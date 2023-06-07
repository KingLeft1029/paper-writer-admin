<template>
  <div class="app-container">
    <img class="back" @click="back" src="@/assets/icons/back.png" alt="">
    <div class="box">

      <el-row :gutter="20">
        <el-col :span="24">
          <span>{{ $t('COURSE_TITLE') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('Cover') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('Author') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('Newest') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('Tags') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20">{{ $t('LABEL_EDIT') }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('TYPE_COURSE') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('PAYMENT_TYPE') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('COURSE_INK_R') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('TRIAL_TYPE') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('AUDITON_TIME') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('VIDEO_DURATION') }}：</span>
          <span>0230407000000</span>
          <span class="ml20 handle-word">{{ $t('VIEW_VIDEO') }}：</span>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('VIDEO_WATER') }}：</span>
          <span>0230407000000</span>
          <span class="ml20 handle-word">{{ $t('PRE_WATER') }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('COURSE_INTRO') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('JOB_NAME') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt20">
        <el-col :span="24">
          <span>{{ $t('JOB_DETAILS') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>


      <div class="btn-box mt20">
        <el-button  type="" @click="back">{{$t('Back')}}</el-button>
        <el-button  type="primary">{{$t('AUDIT_APP')}}</el-button>
        <el-button  type="danger">{{$t('Declined')}}</el-button>
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
}
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 120px;
}
</style>
