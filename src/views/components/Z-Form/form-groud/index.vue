<!--
 * @Author: mikeShn
 * @Date: 2022-03-15 18:55:46
 * @LastEditTime: 2022-04-24 19:26:55
 * @FilePath: \digital-earth-PC\src\views\components\Z-Form\form-groud\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="blindBoxForm app-container" v-bind="$attrs">
    <el-form
      :inline="inline"
      :label-width="labelWidth"
      :model="data"
      ref="form"
    >
      <form-item
        :ref="item.prop"
        :formHideField="formHideField"
        v-for="(item, index) of formList"
        :key="index"
        :value="data[`${item.prop}`]"
        :inputInfo="item"
        :formData.sync="data"
        :isReadonly="isReadonly"
        :positionLabel="positionLabel"
        @formDataChange="formDataChange"
      >
      </form-item>
      <el-form-item v-if="showButton">
        <el-button
          class="button"
          type="primary"
          :loading="loadingButton"
          icon="el-icon-search"

          style="background:#3880FE"
          @click="() => searchEvent(getFormData)"
          >{{ $t("Search") }}</el-button
        >
        <el-button
          class="button"
          icon="el-icon-refresh"

          :loading="loadingButton"
          @click="recharge"
        >
          {{ $t("Clear") }}</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormItem from "../form-item";
import Inject from "../../mixin/inject";

export default {
  name: "ZForm",
  mixins: [Inject],
  props: {
    formHideField: Array,
    formMounted: Function,
    formDataBindBefore: Function,
    labelWidth: {
      type: String,
      default: "",
    },
    positionLabel: String,
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
      loadingButton: false,
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
    let formData = this.formData
      ? JSON.parse(JSON.stringify(this.formData))
      : this.initData();
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
    searchEvent(getFormData) {
      this.$emit("search", getFormData);
    },
    formDataChange() {
      this.$emit("formDataChange", this.$refs);
    },
    recharge() {
      Object.keys(this.data).forEach((item) => {
        this.$set(this.data, item, null);
      });
      this.$emit("recharge");
    },
    validate() {
      let flag;
      this.$refs.form.validate((res) => {
        flag = res;
      });
      return flag;
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
<style lang="scss">
//::v-deep .blindBoxForm {
//  background-color: #fff;
//  position: relative;
//  &:after {
//    content: "";
//    position: absolute !important;
//    left: 0 !important;
//    width: 100% !important;
//    height: 12px !important;
//    background-color: #f6f7fa !important;
//  }
//}
.blindBoxForm {
  background: #fff;
  margin-bottom: 20px;
  border-radius: 10px;
}

::v-deep .el-form--inline .el-form-item {
  margin-right: 20px;
}
</style>
