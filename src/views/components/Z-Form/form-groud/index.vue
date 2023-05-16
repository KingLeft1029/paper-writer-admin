<!--
 * @Author: mikeShn
 * @Date: 2022-03-15 18:55:46
 * @LastEditTime: 2022-04-24 19:26:55
 * @FilePath: \digital-earth-PC\src\views\components\Z-Form\form-groud\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="blindBoxForm" v-bind="$attrs">
    <el-form
      :inline="inline"
      :label-width="labelWidth"
      :model="data"
      label-position="right"
      ref="form"
    >
      <form-item
        :ref="item.prop"
        :formHideField="formHideField"
        v-for="(item, index) of formList"
        :key="index"
        :value="data[item.prop]"
        :inputInfo="item"
        :formData.sync="data"
        :isReadonly="isReadonly"
        @formDataChange="formDataChange"
      >
      </form-item>
      <el-form-item v-if="showButton">
        <el-button
          class="button"
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="search"
          >搜索</el-button
        >
        <el-button
          class="button"
          icon="el-icon-refresh"
          size="mini"
          @click="$emit('recharge')"
          >重置</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormItem from "../form-item";
import Inject from "../../mixin/inject";

export default {
  mixins: [Inject],
  props: {
    formHideField: Array,
    formMounted: Function,
    formDataBindBefore: Function,
    labelWidth: {
      type: String,
      default: "",
    },
    inline: {
      type: Boolean,
      default: true,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    formData: {
      type: Object,
      default: () => {},
    },
    formList: {
      type: Array,
      default: () => [],
    },
    showButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      data: Object.create(null),
    };
  },
  computed: {
    getFormData() {
      return this.data;
    },
  },
  components: {
    FormItem,
  },
  created() {
    let formData = this.formData ? JSON.parse(JSON.stringify(this.formData)) : this.initData();
    if (
      this.formDataBindBefore &&
      this.formDataBindBefore.constructor == Function
    ) {
      this.$CD
        ? this.formDataBindBefore.call(this.$CD, formData)
        : this.formDataBindBefore(formData);
    }
    this.$set(this, "data", formData);
  },
  mounted() {
    if (this.formMounted && this.formMounted.constructor == Function) {
      this.$CD
        ? this.formMounted.call(this.$CD, this.data, this.$refs)
        : this.formMounted(this.data, this.$refs);
    }
  },
  methods: {
    formDataChange() {
      this.$emit("formDataChange", this.$refs);
    },
    recharge() {
      Object.keys(this.data).forEach((item) => {
        this.$set(this.data, item, null);
      });
    },
    validate() {
      let flag;
      this.$refs.form.validate((res) => {
        flag = res;
      });
      return flag;
    },
    search() {
      this.$emit("search", this.getFormData);
    },
    initData() {
      let formData = Object.create(null);
      if (this.formList && this.formList.constructor == Array) {
        this.formList.forEach((item) => {
          if (item.type == "daterange" && item.endTime && item.startTime) {
            this.$set(formData, item.endTime, null);
            this.$set(formData, item.startTime, null);
          } else if (item.prop && item.prop.constructor != Object) {
            this.$set(formData, item.prop, null);
          } else if (item.prop.constructor == Object) {
            this.$set(formData, item.prop.value, null);
            this.$set(formData, item.prop.label, null);
          }
        });
      }
      return formData;
    },
  },
};
</script>
<style lang="scss" scoped></style>
