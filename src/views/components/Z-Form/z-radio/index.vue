<!--
 * @Author: mikeShn
 * @Date: 2022-04-11 10:11:06
 * @LastEditTime: 2022-04-24 16:50:33
 * @FilePath: \digital-earth-PC\src\views\components\Z-Form\z-input\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="radio">
    <div class="radio-box" @click="change">
      <div :class="{ border: isSelect }"></div>
    </div>
    <div>{{ inputInfo.text ? $t(`${inputInfo.text}`) : $t('START') }}</div>
  </div>
</template>
<script>
export default {
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
    formData: Object,
    inputInfo: {//配置对象
      type: Object,
      default: () => Object.create(null),
    },
  },
  data() {
    return {
      isSelect: true,
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
        if (this.inputInfo.trueVal) {
          this.isSelect = !!(val == this.inputInfo.trueVal);
        } else {
          this.isSelect = !!(val == "1");
        }
        this.inputVal = val;
      },
    },
  },
  methods: {
    change(val) {
      this.isSelect = !this.isSelect;
      if (this.inputInfo.trueVal) {
        this.inputVal = this.isSelect
          ? this.inputInfo.trueVal
          : this.inputInfo.falseVal;
      } else {
        this.inputVal = this.isSelect ? "1" : "0";
      }
      this.formData[this.inputInfo.prop] = this.inputVal;
      this.$emit("update:formData", this.formData);
      this.$emit("change");
    },
  },
  mounted() { },
};
</script>
<style lang="scss" scoped>
.radio {
  min-width: 100px;
  height: 37px;
  display: flex;
  align-items: center;

  .radio-box {
    width: 16px;
    height: 16px;
    margin-right: 10px;
    border: 1px solid #409eff;
    border-radius: 100%;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.radio-box:hover {
  border: 2px solid #409eff;
}

.border {
  width: 8px;
  height: 8px;
  background: #409eff;
  border-radius: 100%;
}
</style>
