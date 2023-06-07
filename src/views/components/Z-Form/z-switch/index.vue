<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 11:35:31
 * @LastEditTime: 2022-04-24 17:18:28
 * @FilePath: \digital-earth-PC\src\views\components\Z-Form\z-switch\index.vue
 * @Description: 文件说明
-->
<template>
  <el-switch v-model="data" @change="change" :active-value="activeValue ? activeValue : '1'"
    :inactive-value="inactiveValue ? inactiveValue : '0'">
  </el-switch>
</template>
<script>
export default {
  props: {
    value: [String, Number],
    activeValue: [String, Number, Boolean],
    inactiveValue: [String, Number, Boolean],
  },
  data() {
    return {
      data: null,
    };
  },
  computed: {
    curVal() {
      return this.formData[this.inputInfo.prop] == this.formData[this.inputInfo.prop] ? this.formData[this.inputInfo.prop] : "";
    },
  },
  watch: {
    curVal: {
      immediate: true,
      deep: true,
      handler(val) {
        this.data = val;
      },
    },
  },
  methods: {
    change() {
      this.$emit("update:value", this.data);
      this.$emit("change");
    },
  },
};
</script>
