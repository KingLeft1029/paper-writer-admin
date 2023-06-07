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
    v-model="inputVal"
    :disabled="isReadonly"
    @change="change"
    :type="inputInfo.type"
    value-format="yyyy-MM-dd HH:mm:ss"
    :placeholder="isReadonly ? '' : `${$t('PLEASE_SELECT')} ${inputInfo.name}`"
    range-separator="——"
    :start-placeholder="$t('START_TIME')"
    :end-placeholder="$t('END_TIME')"
    :default-time="['12:00:00', '08:00:00']"
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
    };
  },
  computed: {
    curVal() {
      return this.formData[this.inputInfo.prop] == 0
        ? 0
        : this.formData[this.inputInfo.prop] || "";
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
        if (this.inputInfo.format === "yyyy-MM-dd HH:mm:ss") {
          this.formData[this.inputInfo.startTime] = `${val[0]} 00:00:00`;
          this.formData[this.inputInfo.endTime] = `${val[1]} 00:00:00`;
        } else {
          this.formData[this.inputInfo.startTime] = val[0];
          this.formData[this.inputInfo.endTime] = val[1];
        }
        this.$emit("update:formData", this.formData);
        this.$emit("change");
      }
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped></style>
