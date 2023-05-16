<!--
 * @Author: mikeShn
 * @Date: 2022-03-17 13:35:44
 * @LastEditTime: 2022-03-22 20:31:26
 * @FilePath: \blindBoxWeb\src\views\components\blindBoxButton\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="blind-box-button">
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5"><slot></slot></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {},
  computed: {
    flexPosition() {
      if (this.position == "left") {
        return "flex-left";
      } else if (this.position == "right") {
        return "flex-right";
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.blind-box-button {
  margin: 0 auto;
  display: flex;

  .button {
    color: #13ce66;
    border: 1px solid #13ce66;
  }
}
</style>
