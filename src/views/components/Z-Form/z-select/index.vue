<!--
 * @Author: mikeShn
 * @Date: 2022-04-11 10:11:06
 * @LastEditTime: 2022-04-12 13:40:00
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-select\index.vue
 * @Description: 文件说明
-->
<template>
  <el-select
    class="input"
    v-model="inputVal"
    clearable
    @clear="clear"
    size="small"
    :disabled="isReadonly"
    @change="change"
    :placeholder="isReadonly ? '' : `请选择${inputInfo.name}`"
  >
    <el-option
      v-for="item in inputInfo.options"
      :key="item.value"
      :label="inputInfo.label ? item[inputInfo.label] : item.name"
      :value="inputInfo.value ? item[inputInfo.value] : item.value"
      :disabled="item.disabled"
    >
    </el-option>
  </el-select>
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
      return this.formData[this.inputInfo.prop] || "";
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
  created() {},
  methods: {
    clear() {
      this.formData[this.inputInfo.prop] = null;
      this.$emit("update:formData", this.formData);
      this.$emit("change");
    },
    change(val) {
      this.inputVal = val;
      this.formData[this.inputInfo.prop] = val;
      this.$emit("update:formData", this.formData);
      this.$emit("change");
    },
  },
};
</script>
<style lang="scss" scoped></style>
