<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 09:38:52
 * @LastEditTime: 2022-04-12 14:42:32
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-imageUpLoad\index.vue
 * @Description: 文件说明
-->
<template>
  <image-up-load
    :isReadonly="isReadonly"
    :isShowTip="false"
    :value="inputVal"
    @input="change"
    :limit="inputInfo.limit ? inputInfo.limit : 10"
  ></image-up-load>
</template>
<script>
import ImageUpLoad from "@/components/ImageUpload";
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
  components: {
    ImageUpLoad,
  },
  created() {},
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
<style lang="scss" scoped></style>
