<!--
 * @Author: mikeShn
 * @Date: 2022-03-15 18:55:46
 * @LastEditTime: 2022-04-12 14:36:38
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\FormContainer\index.vue
 * @Description: 文件说明
-->
<template>
  <div>
    <z-form
      :inline="inline"
      ref="form"
      :formList="formList"
      @search="search"
      @recharge="recharge"
      @formDataChange="formDataChange"
      :formMounted="formMounted"
      :formDataBindBefore="formDataBindBefore"
      :formHideField="formHideField"
    ></z-form>
    <slot name="center"></slot>
    <div class="app-container formBottom" style="">
      <z-button>
        <slot name="button"></slot>
      </z-button>
      <z-table
        ref="table"
        :selection="selection"
        :numbers="numbers"
        :total="total"
        :tableMounted="tableMounted"
        :tableList="tableList"
        :tableData="tableData"
        :isReadonly="isReadonly"
        :isShowPagination="isShowPagination"
        @paginationChange="paginationChange"
        :tableHideField="tableHideField"
      >
        <template v-slot:first>
          <slot name="first"></slot>
        </template>
        <template v-slot:last>
          <slot name="last"></slot>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
import ZButton from "@/views/components/Z-Button/index.vue";
import ZForm from "@/views/components/Z-Form/form-groud/index.vue";
import ZTable from "@/views/components/Z-Table/index.vue";
export default {
  name: "FormContainer",
  props: {
    tableMounted: Function,
    formMounted: Function,
    formDataBindBefore: Function,
    formHideField: { type: Array, default: () => [] },
    tableHideField: { type: Array, default: () => [] },
    isShowPagination: {
      tyoe: Boolean,
      default: true,
    },
    inline: {
      type: Boolean,
      default: true,
    },
    isReadonly: {
      type: Boolean,
      default: false,
    },
    formList: {
      type: Array,
      default: () => [],
    },
    tableList: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    selection: {
      type: Boolean,
      default: false,
    },
    numbers:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {};
  },
  computed: {
    form() {
      return this.$refs.form;
    },
    table() {
      return this.$refs.table;
    },
    pageInfo() {
      return this.$refs.table.getPage;
    },
    formData() {
      return this.$refs.form.formData;
    },
    getSelectList() {
      return this.$refs.table.getSelectList;
    },
  },
  watch: {},
  components: {
    ZButton,
    ZTable,
    ZForm,
  },
  mounted() {},
  created() {
  },
  methods: {
    search() {
      if (!this.$refs.form.validate()) {
        this.$message.warning(this.$t('PLEASE_INPUT_THIS_QUERY'));
        return;
      }
      this.$emit("search");
    },
    paginationChange() {
      this.$emit("paginationChange");
    },
    formDataChange() {
      this.$refs.table.pageNum = 1;
    },
    filter() {
      return {
        ...this.$refs.table.getPage,
        ...this.$refs.form.getFormData,
      };
    },
    recharge() {
      // this.$refs.form.recharge();
      // this.$refs.table.recharge();
      this.$emit("recharge");
    },
  },
};
</script>
<style lang="scss" scoped>
.formBottom {
  border-radius: 5px;
}
</style>
