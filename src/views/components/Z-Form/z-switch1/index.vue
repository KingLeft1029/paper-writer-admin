<!--
 * @Author: mikeShn
 * @Date: 2022-04-11 10:11:06
 * @LastEditTime: 2022-04-24 16:50:33
 * @FilePath: \digital-earth-PC\src\views\components\Z-Form\z-input\index.vue
 * @Description: 文件说明
-->
<template>
  <!-- <el-input
    class="input"
    :type="inputInfo.type"
    :disabled="isReadonly"
    size="small"
    :style="{ width: inputInfo.width ? inputInfo.width : '215px ' }"
    v-model="inputVal"
    @change="change"
    :placeholder="isReadonly ? '' : `请输入${inputInfo.name}`"
    clearable
    @clear="update(null)"
    :maxlength="inputInfo.maxlength ? inputInfo.maxlength : 50"
    show-word-limit
  >
    <el-button
      v-if="inputInfo.icon"
      slot="append"
      :icon="inputInfo.icon.class"
      @click="iconClick"
    ></el-button>
  </el-input> -->
  <el-switch
    v-model="inputVal"
    :disabled="isReadonly"
    @change="change"
    :active-value="inputInfo.activeValue ? inputInfo.activeValue : '1'"
    :inactive-value="inputInfo.inactiveValue ? inputInfo.inactiveValue : '0'"
  >
  </el-switch>
</template>
<script>
import Inject from "../../mixin/inject";
export default {
  mixins: [Inject],
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
    width: String,
    formData: Object,
    inputInfo: {
      type: Object,
      default: () => Object.create(null),
    },
  },
  data() {
    return {
      inputVal: undefined,
    };
  },
  created() {},
  computed: {
    curVal() {
      // console.log(
      //   this.formData[this.inputInfo.prop],
      //   1111111111,
      //   this.inputInfo.activeValue
      // );
      if (
        this.formData[this.inputInfo.prop] != null ||
        this.formData[this.inputInfo.prop] != undefined
      ) {
        return this.formData[this.inputInfo.prop];
      } else if (this.inputInfo.activeValue != undefined) {
        return this.inputInfo.activeValue;
      } else {
        this.update("1");
        return "1";
      }
      // return this.formData[this.inputInfo.prop] ||
      //   this.inputInfo.activeValue != undefined
      //   ? String(this.inputInfo.activeValue)
      //   : "1" || "";
    },
  },
  watch: {
    curVal: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val) {
          // console.log(val);
          this.inputVal = String(val);
        }
      },
    },
  },
  mounted() {},
  methods: {
    iconClick() {
      if (
        this.inputInfo.icon.click &&
        this.$CD[this.inputInfo.icon.click] instanceof Function
      ) {
        this.$CD[this.inputInfo.icon.click]();
      }
    },
    update(val) {
      // this.formData[this.inputInfo.prop] = val;
      this.$set(this.formData, this.inputInfo.prop, val);
      this.$emit("update:formData", this.formData);
      this.$emit("change");
    },

    change(val) {
      // console.log(val);
      this.inputVal = val;
      this.update(val);
    },
  },
};
</script>
<style lang="scss" scoped></style>
