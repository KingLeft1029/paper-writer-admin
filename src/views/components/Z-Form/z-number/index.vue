<!--
 * @Author: mikeShn
 * @Date: 2022-04-11 10:11:06
 * @LastEditTime: 2022-04-12 14:17:40
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-number\index.vue
 * @Description: 文件说明
-->
<template>
  <el-input
    v-if="inputInfo.type == 'number' || inputInfo.type == 'intNumber'"
    v-model="inputVal"

    :disabled="isReadonly"
    @input="change"
    :placeholder="isReadonly ? '' : `${$t('PLEASE_INPUT')} ${$t(inputInfo.name)}`"
    clearable
    :maxlength="inputInfo.maxlength ? inputInfo.maxlength : ''"
  >
  <template v-if="inputInfo.append" slot="append">{{$t('inputInfo.append')}}</template>
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
  created () {

  },
  computed: {
    curVal() {
      return this.formData[this.inputInfo.prop] ==  this.formData[this.inputInfo.prop] ?  this.formData[this.inputInfo.prop] : "";
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
  mounted() {},
};
</script>
<style lang="scss" scoped>
::v-deep .el-input-group__append, .el-input-group__prepend {
  padding: 0 9px;
}
</style>
