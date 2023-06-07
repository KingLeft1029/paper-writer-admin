<!--
 * @Author: mikeShn
 * @Date: 2022-04-11 10:11:06
 * @LastEditTime: 2022-04-12 13:40:00
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\z-form\z-select\index.vue
 * @Description: 文件说明
-->
<template>
  <el-select
    v-model="inputVal"
    clearable
    :disabled="isReadonly"
    :placeholder="isReadonly ? '' : `${$t('PLEASE_SELECT')} ${inputInfo.name}`"
  >
    <el-option
      :label="inputInfo.prop.label"
      :value="inputInfo.prop.value"
      class="options"
    >
      <el-tree
        :accordion="true"
        :data="inputInfo.options"
        :props="inputInfo.prop"
        @node-click="handleNodeClick"
      ></el-tree>
    </el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    inputInfo: Object,
    isReadonly: {
      type: Boolean,
      default: false,
    },
    formData: Object,
  },
  data() {
    return {
      inputVal: null,
    };
  },
  computed: {
    curVal() {
      if (
        this.formData.constructor == Object &&
        this.formData.hasOwnProperty(this.inputInfo.prop.label)
      ) {
        return this.formData[this.inputInfo.prop.label];
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
  created() {},
  methods: {
    handleNodeClick(data) {
      this.inputVal = data[this.inputInfo.prop.label];
      this.$emit("change", data[this.inputInfo.prop.value]);
      this.formData[this.inputInfo.prop.value] =
        data[this.inputInfo.prop.value];
      this.formData[this.inputInfo.prop.label] =
        data[this.inputInfo.prop.label];
      this.$emit("update:formData", this.formData);
    },
  },
};
</script>
<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  max-height: 274px;
  padding: 0;
  overflow: hidden;
}
.el-select-dropdown__item.selected {
  font-weight: normal;
}
ul li >>> .el-tree .el-tree-node__content {
  height: auto;
  padding: 0 20px;
}
.el-tree-node__label {
  font-weight: normal;
}
.el-tree >>> .is-current .el-tree-node__label {
  color: #409eff;
  font-weight: 700;
}
.el-tree >>> .is-current .el-tree-node__children .el-tree-node__label {
  color: #606266;
  font-weight: normal;
}
</style>
