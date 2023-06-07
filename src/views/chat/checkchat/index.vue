<template>
  <div class="app-container">
    <img class="back" @click="back" src="@/assets/icons/back.png" alt="">
    <div class="box-shadow">
      <div class="box-title">{{ $t('BASE_INFORMATION') }}</div>
      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('GROUP_AVATAR') }}：
          <img src="../../../assets/course/img.png" alt="">
        </el-col>
      </el-row>

      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('QUN_K') }}：张用户</el-col>
        <el-col :span="8">
          {{ $t('QUN_R') }}：2023.02.20
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('QUN_Z') }}：标签A
        </el-col>
        <el-col :span="8">
          {{ $t('Administrator') }}：2023.02.20
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt40">
        <el-col :span="8">{{ $t('CREATION_TIME') }}：标签A
        </el-col>
        <el-col :span="8">
          {{ $t('Status') }}：02.20
        </el-col>
      </el-row>
    </div>
    <div class="box-shadow">
      <div class="box-title">{{ $t('BASE_INFORMATION') }}</div>
      <el-row :gutter="20" class="mt40">
        <el-col :span="6">{{ $t('QLYH') }}：名称 <span class="handle-word" @click="check(1)">{{ $t('VIEW_D') }}></span></el-col>
      </el-row>
      <el-row :gutter="20" class="mt40">
        <el-col :span="6">{{ $t('LTJL') }}：名称 <span class="handle-word" @click="check(2)">{{ $t('VIEW_D') }}></span></el-col>
      </el-row>
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
    check(num) {
      if (num == 1) {
        this.$router.push({path:'/chat/chatuser',})
      }else{
        this.$router.push({path:'/chat/chatrecord',})
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 120px;
}
</style>
