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
    size="small"
    v-model="inputVal"
    @change="change"
    :placeholder="isReadonly ? '' : `请输入${inputInfo.name}`"
    clearable
    @clear="update(null);"
    :maxlength="inputInfo.maxlength ? inputInfo.maxlength : 50"
    show-word-limit
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
  methods: {
    update(val) {
      this.formData[this.inputInfo.prop] = val;
      this.$emit("update:formData", this.formData);
      this.$emit("change");
    },
    
    change(val) {
      this.inputVal = val;
      this.update(val);
    },
  },
  mounted() {
    if(this.inputInfo.inputVal){
      this.change(this.inputInfo.inputVal)
    }
  },
};
</script>
<style lang="scss" scoped></style>
