<!--
 * @Author: mikeShn
 * @Date: 2022-04-11 10:11:06
 * @LastEditTime: 2022-04-24 16:50:33
 * @FilePath: \digital-earth-PC\src\views\components\Z-Form\z-input\index.vue
 * @Description: 文件说明
-->
<template>
  <el-input
    class="input"
    :type="inputInfo.type"
    :disabled="isReadonly"

    v-model="inputVal"
    @change="change"
    :placeholder="
      isReadonly ? '' : `${$t('PLEASE_INPUT')} ${$t(inputInfo.name)}`
    "
    clearable
  >
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
  created() {},
  computed: {
    curVal() {
      return this.formData[this.inputInfo.prop] ==
        this.formData[this.inputInfo.prop]
        ? this.formData[this.inputInfo.prop]
        : "";
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
<style lang="scss" scoped></style>
