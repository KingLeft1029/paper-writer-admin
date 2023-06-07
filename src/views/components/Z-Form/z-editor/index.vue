<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 09:38:52
 * @LastEditTime: 2022-04-12 14:43:00
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-editor\index.vue
 * @Description: 文件说明
-->
<template>
  <editor
    ref="editor"
    :readOnly="isReadonly"
    :minHeight="400"
    :value="inputVal"
    @input="change"
  ></editor>
</template>
<script>
import Editor from "@/components/Editor";
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
      if (this.formData.hasOwnProperty(this.inputInfo.prop)) {
        return this.formData[this.inputInfo.prop];
      } else {
        return "";
      }
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
  components: {
    Editor,
  },
  methods: {
    change(val) {
      this.inputVal = val;
      this.formData[this.inputInfo.prop] = val
      this.$emit("update:formData", this.formData);
      this.$emit("change");
    },
  },
};
</script>
<style lang="scss" scoped></style>
