<template>
  <div class="app-container">
    <z-form :inline="inline" ref="form" :formList="formList" @search="search" @recharge="recharge"
      :isReadonly="isReadonly" :formData="formData" @formDataChange="formDataChange" :formMounted="formMounted"
      :showButton="showButton" :formDataBindBefore="formDataBindBefore" :formHideField="formHideField"></z-form>
    <slot name="center"></slot>
    <z-button>
      <slot name="button"></slot>
    </z-button>
    <z-table ref="table" :selection="selection" :total="total" :RowKey="RowKey" :tableMounted="tableMounted"
      :tableList="tableList" :tableData="tableData" :isReadonly="isReadonly" :height="height"
      :isShowPagination="isShowPagination" @paginationChange="paginationChange" :tableHideField="tableHideField">
      <template v-slot:first>
        <slot name="first"></slot>
      </template>
      <template v-slot:last>
        <slot name="last"></slot>
      </template>
    </z-table>
  </div>
</template>

<script>
import ZButton from "@/views/components/Z-Button/index.vue";
import ZForm from "@/views/components/Z-Form/form-groud/index.vue";
import ZTable from "@/views/components/Z-Table/index.vue";
export default {
  components: {
    ZButton,
    ZTable,
    ZForm,
  },

  props: {
    RowKey: String,
    showButton: {
      type: Boolean,
      default: true,
    },
    formData: {
      type: Object,
      default: () => { },
    },
    tableMounted: Function,
    formMounted: Function,
    formDataBindBefore: Function,
    formHideField: { type: Array, default: () => [] },
    tableHideField: { type: Array, default: () => [] },
    isShowPagination: {
      type: Boolean,
      default: true,
    },
    height: String,
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
  },

  data () {
    return {};
  },

  computed: {
    form () {
      return this.$refs.form;
    },
    table () {
      return this.$refs.table;
    },
    pageInfo () {
      return this.$refs.table.getPage;
    },
    getFormData () {
      return this.$refs.form.formData;
    },
    getSelectList () {
      return this.$refs.table.getSelectList;
    },
  },

  watch: {},
  created () { },
  mounted () { },

  methods: {
    search () {
      if (!this.$refs.form.validate()) {
        this.$message.warning("请输入正确的查询条件");
        return;
      }
      this.$emit("search");
    },
    paginationChange () {
      this.$emit("paginationChange");
    },
    formDataChange () {
      if (this.$refs.table) {
        this.$refs.table.pageNum = 1;
      }
    },
    filter () {
      return {
        ...this.$refs.table.getPage,
        ...this.$refs.form.getFormData,
      };
    },
    recharge () {
      this.$refs.form.recharge();
      this.$refs.table.recharge();
      this.$emit("recharge");
    },
    resetPage () {
      this.$refs.table.recharge();
    }

  }
};
</script>

