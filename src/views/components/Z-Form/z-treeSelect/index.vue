<template>
  <el-select v-model="inputVal" clearable @clear="clear" @change="change" :disabled="isReadonly"
    :placeholder="isReadonly ? '' : `请选择${inputInfo.name}`">
    <el-option :label="inputInfo.prop.label" :value="inputInfo.prop.value" class="options">
      <el-tree :accordion="true" :data="inputInfo.options" :props="inputInfo.prop" @node-click="handleNodeClick">
      </el-tree>
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'ZTreeSelect',
  props: {
    inputInfo: {
      type: Object,
      default: () => ({})
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    formData: Object,
  },
  data () {
    return {
      inputVal: null,
    };
  },
  computed: {
    curVal () {
      if (this.formData.constructor === Object && this.formData.hasOwnProperty(this.inputInfo.prop.label)) {
        return this.formData[this.inputInfo.prop.label];
      } else {
        return "";
      }
    },
  },
  watch: {
    formData: {
      immediate: true,
      deep: true,
      handler (val) {
        if (!val[this.inputInfo.prop.value]) {
          this.$set(this, "inputVal", null);
        }
      },
    },
    curVal: {
      immediate: true,
      deep: true,
      handler (val) {
        this.inputVal = val;
      },
    },
  },
  created () { },
  methods: {
    clear () {
      this.$set(this, "inputVal", null);
      this.$set(this.formData, this.inputInfo.prop.value, null);
      this.$set(this.formData, this.inputInfo.prop.label, null);
      this.$emit("change", null);
      this.$emit("update:formData", this.formData);
    },
    change (val) {
      if (val === this.inputInfo.prop.value) {
        this.$set(this, "inputVal", null);
      }
    },
    handleNodeClick (data) {

      if (data.level == 2) {
        this.$set(this, "inputVal", data[this.inputInfo.prop.label]);
        this.$set(this.formData, this.inputInfo.prop.value, data[this.inputInfo.prop.value]);
        this.$set(this.formData, this.inputInfo.prop.label, data[this.inputInfo.prop.label]);
        this.$emit("change", data);
        this.$emit("update:formData", this.formData);
      }

    },
  },
};
</script>

<style lang="scss" scoped>
.el-scrollbar .el-scrollbar__view .el-select-dropdown__item {
  height: auto;
  padding: 0;
  overflow: hidden;
}
.el-scrollbar__view .el-select-dropdown__item.selected {
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