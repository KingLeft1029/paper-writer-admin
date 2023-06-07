<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 10:25:27
 * @LastEditTime: 2022-04-12 14:44:17
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-textarea\index.vue
 * @Description: 文件说明
-->

<template>
  <el-input class="el-textarea" :style="{ width: `${inputInfo.widthTextarea}px` }" :type="inputInfo.type"
    :disabled="isReadonly" :rows="inputInfo.rows ? inputInfo.rows : 5"  v-model="inputVal" @change="change"
    :placeholder="isReadonly ? '' : `${$t('PLEASE_INPUT')}${$t(inputInfo.name)}`" clearable>
  </el-input>
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
      return this.formData[this.inputInfo.prop] == this.formData[this.inputInfo.prop] ?   this.formData[this.inputInfo.prop] : "";
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
};
</script>
<style lang="scss" scoped>
</style>
