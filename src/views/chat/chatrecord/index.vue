<template>
  <div class="app-container">
    <img class="back" @click="back" src="@/assets/icons/back.png" alt="">
    <div class="box-shadow">
      <el-date-picker  class="mb20" v-model="pickerVal" type="daterange" range-separator="-"
          :start-placeholder="$t('START_DATE')" :end-placeholder="$t('END_DATE')">
        </el-date-picker>
        <div class="chat-item" v-for="item in 6">
        <el-row :gutter="20">
          <el-col :span="4">用户A</el-col>
          <el-col :span="4">2023-02-02</el-col>
          <el-col :span="4">14:00</el-col>
        </el-row>
        <div class="mt20">
          6666666666666666
        </div>
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
.chat-item{
  border-bottom: 1px solid #f1efef;
  padding: 32px;
}
</style>
