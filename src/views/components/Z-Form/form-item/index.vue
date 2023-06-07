<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 09:49:33
 * @LastEditTime: 2022-04-24 16:26:10
 * @FilePath: \digital-earth-PC\src\views\components\Z-Form\form-item\index.vue
 * @Description: 文件说明
-->
<template>
  <el-form-item
    :prop="formProp"
    :rules="rules"
    :label-width="inputInfo.labelWidth"
    v-if="isShow"
  >
    <template v-slot:label>
      <div
        class="label"
        :style="{
          justifyContent: positionLabel == 'left' ? 'flex-start' : 'flex-end',
        }"
      >
        <div class="required" v-if="inputInfo.required">*</div>
        <div>{{ $t(inputInfo.name) }}：</div>
      </div>
    </template>
    <z-input
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'input'"
    ></z-input>
    <z-textarea
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'textarea'"
    ></z-textarea>
    <z-editor
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'editor'"
    ></z-editor>
    <z-number
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'number' || inputInfo.type == 'intNumber'"
      :isInt="inputInfo.isInt"
    ></z-number>
    <z-date-picker
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'datetime' || inputInfo.type == 'date'"
    ></z-date-picker>
    <z-daterange
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'daterange' || inputInfo.type == 'datetimerange'"
    ></z-daterange>
    <z-select
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'select'"
    ></z-select>
    <z-image-up-load
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'uploadImg'"
      class="uploadImgStyle"
    ></z-image-up-load>
    <z-tree-select
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'treeSelect'"
    ></z-tree-select>
    <z-radio
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'radio'"
    ></z-radio>
    <z-time-picker
      @change="change"
      :isReadonly="isReadonly"
      :formData.sync="formData"
      :inputInfo="inputInfo"
      v-if="inputInfo.type == 'time'"
    ></z-time-picker>
  </el-form-item>
</template>
<script>
import ZInput from "../z-input";
import ZRadio from "../z-radio";
import ZEditor from "../z-editor";
import ZNumber from "../z-number";
import ZDatePicker from "../z-datePicker";
import ZImageUpLoad from "../z-imageUpLoad";
import ZSelect from "../z-select";
import ZTextarea from "../z-textarea";
import ZDaterange from "../z-date-range";
import ZTreeSelect from "../z-treeSelect";
import { Mixin } from "./mixin/validate.js";
import ZTimePicker from "../z-timePicker";
export default {
  mixins: [Mixin],
  props: {
    positionLabel: String,
    formHideField: Array,
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
      isShow: true,
      rules: [],
    };
  },
  computed: {
    formProp() {
      if (!this.inputInfo.prop && this.inputInfo.type == "daterange") {
        return this.inputInfo.endTime;
      } else if (this.inputInfo.prop.constructor == String) {
        return this.inputInfo.prop;
      } else if (
        this.inputInfo.prop.constructor == Object &&
        this.inputInfo.prop.value
      ) {
        return this.inputInfo.prop.value;
      }
    },
  },
  watch: {},
  components: {
    ZRadio,
    ZInput,
    ZEditor,
    ZNumber,
    ZDatePicker,
    ZImageUpLoad,
    ZSelect,
    ZTextarea,
    ZDaterange,
    ZTreeSelect,
    ZTimePicker,
  },
  created() {
    if (
      this.formHideField &&
      this.formHideField.indexOf(this.inputInfo.prop) != -1
    )
      this.isShow = false;
  },
  methods: {
    change() {
      this.$emit("formDataChange");
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-textarea {
  width: 589px;
}
.uploadImgStyle {
  width: 234px;
}

.el-input {
  width: 234px;
}
.label {
  display: flex;
}
.required {
  color: red;
  margin-right: 5px;
}
</style>
