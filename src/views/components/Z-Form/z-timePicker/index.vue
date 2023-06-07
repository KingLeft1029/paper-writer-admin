<!--
 * @Author: mikeShn
 * @Date: 2022-04-11 17:53:26
 * @LastEditTime: 2022-04-12 14:43:23
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-datePicker\index.vue
 * @Description: 文件说明
-->
<!--
 * daterange yyyy-MM-dd
-->
<template>
  <el-time-picker v-model="inputVal" :disabled="isReadonly" @change="change"
    :style="{ width: `${inputInfo.widthTime}px` }" :type="inputInfo.type" value-format="HH:mm:ss" :picker-options="{
      selectableRange: '00:00:00 - 23:59:59',
    }" :placeholder="isReadonly ? '' : `${$t('PLEASE_SELECT')} ${$t(inputInfo.name)}`">
  </el-time-picker>
</template>
<script>
export default {
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
    formData: Object,
    inputInfo: {
      type: Object,
      default: () => Object.create(null),
    },
  },
  data() {
    return {
      inputVal: null,
    };
  },
  
  computed: {
    curVal() {
      return this.formData[this.inputInfo.prop] == 0 ? 0 : this.formData[this.inputInfo.prop] || "";
    },
  },
  watch: {
    curVal: {
      immediate: true,
      deep: true,
      handler(val) {
        this.inputVal = val;
      },
    },
  },
  methods: {
    change(val) {
      this.inputVal = val;
      this.formData[this.inputInfo.prop] = val;
      this.$emit("update:formData", this.formData);
      this.$emit("change");
    },
  },
  mounted() { },
};
</script>
<style lang="scss" scoped>
</style>
