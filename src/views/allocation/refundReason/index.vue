<!--
 * @Author: your name
 * @Date: 2022-04-07 13:59:21
 * @LastEditTime: 2022-04-07 17:27:35
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\allocation\refundReason\index.vue
-->
// 退款退货
<template>
  <div class="app-container">
    <el-radio-group
      v-model="currentTabComponent"
      @change="handleChange"
      style="margin-bottom: 20px"
    >
      <el-radio-button label="money">退款原因</el-radio-button>
      <el-radio-button label="sales">退货原因</el-radio-button>
    </el-radio-group>

    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import money from "./components/money";
import sales from "./components/sales";
export default {
  components: { money, sales },
  data() {
    return {
      currentTabComponent: 'money',
    };
  },
  methods: {
    handleChange(name) {
      this.currentTabComponent = name;
    },
  },
};
</script>

<style scoped>
::v-deep .el-radio-button__inner {
  width: 160px;
}
</style>
