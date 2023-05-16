<!--
 * @Author: your name
 * @Date: 2022-04-27 15:09:45
 * @LastEditTime: 2022-04-27 15:15:32
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital_earth_PC\src\views\finance\transaction\index.vue
-->
// 交易列表
<template>
  <div class="app-container">
    <el-radio-group
      v-model="currentTabComponent"
      @change="handleChange"
      style="margin-bottom: 20px"
    >
      <el-radio-button label="makeDetail">进账明细</el-radio-button>
      <el-radio-button label="outDetail">出账明细</el-radio-button>
    </el-radio-group>

    <keep-alive>
      <component v-bind:is="currentTabComponent"></component>
    </keep-alive>
  </div>
</template>

<script>
import makeDetail from "./makeDetail/index";
import outDetail from "./outDetail/index";
export default {
  components: { makeDetail,outDetail },
  data() {
    return {
      currentTabComponent: "makeDetail",
    };
  },
  methods: {
    handleChange(name) {
      this.currentTabComponent = name;
    },
  },
};
</script>
<style>

</style>