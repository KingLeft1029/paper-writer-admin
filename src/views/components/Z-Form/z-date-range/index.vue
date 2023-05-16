<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 10:28:29
 * @LastEditTime: 2022-04-12 14:43:30
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-date-range\index.vue
 * @Description: 文件说明
-->
<!--
 * @Author: mikeShn
 * @Date: 2022-04-11 17:53:26
 * @LastEditTime: 2022-04-12 10:13:18
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-datePicker\index.vue
 * @Description: 文件说明
-->
<!--
 * daterange yyyy-MM-dd
-->

<template>
  <el-date-picker
    :clearable="false"
    v-model="inputVal"
    :disabled="isReadonly"
    @change="change"
    :type="inputInfo.type"
    value-format="yyyy-MM-dd"
    :placeholder="isReadonly ? '' : `请选择${inputInfo.name}`"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
  >
  </el-date-picker>
</template>
<script>
export default {
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: () => Object.create(null),
    },
    inputInfo: {
      type: Object,
      default: () => Object.create(null),
    },
  },
  data() {
    return {
      inputVal: null,
      endTime: "",
      startTime: "",
    };
  },
  computed: {
    curVal() {
      return this.formData[this.inputInfo.prop] || "";
    },
    curEndTimeVal() {
      return this.formData[this.inputInfo.endTime] || "";
    },
    curStartTimeVal() {
      return this.formData[this.inputInfo.startTime] || "";
    },
  },
  watch: {
    curEndTimeVal: {
      immediate: true,
      deep: true,
      handler(val) {
        if (!val) {
          this.inputVal = null;
        }
      },
    },
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
      if (this.inputInfo.prop && !this.inputInfo.startTime) {
        this.formData[this.inputInfo.prop] = val;
        this.$emit("update:formData", this.formData);
        this.$emit("change");
      } else if (this.inputInfo.endTime && this.inputInfo.startTime) {
        this.formData[this.inputInfo.startTime] = `${val[0]} 00:00:00`;
        this.formData[this.inputInfo.endTime] = `${val[1]} 00:00:00`;
        this.$emit("update:formData", this.formData);
        this.$emit("change");
      }
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped></style>
