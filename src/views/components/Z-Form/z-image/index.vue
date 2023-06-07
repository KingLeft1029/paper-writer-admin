<!--
 * @Author: mikeShn
 * @Date: 2022-03-22 18:53:11
 * @LastEditTime: 2022-04-07 13:46:15
 * @FilePath: \blindBoxWeb\src\views\components\boxImg\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="img">
    <el-image
      class="image"
      style="width: 100px; height: 100px"
      :src="`${api}${value}`"
      @click="click(`${api}${value}`)"
      :preview-src-list="srcList"
    >
      <div slot="error">
        <i class="el-icon-picture-outline"></i></div
    ></el-image>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      api: window.g.api,
      srcList: [this.value],
    };
  },
  methods: {
    click(img) {},
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.img {
  display: flex;
  justify-content: center;
  align-items: center;
  .image {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #eee;
  }
}
</style>
