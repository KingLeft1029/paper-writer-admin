<template>
  <div class="app-container">
    <form-container
      ref="content"
      :formList="formList"
      :total="total"
      :tableList="tableList"
      :tableData="tableData"
      @search="getList"
      @paginationChange="getList"
      @recharge="getList"
    >
    </form-container>
  </div>
</template>

<script>
import { updata, payList } from "@/api/allocation/payUpdata.js";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList } from "./config";
import Provide from "@/views/components/mixin/provide";

export default {
  mixins: [Provide],
  data() {
    return {
      tableList,
      formList,
      total: 0,
      tableData: [],
    };
  },
  components: {
    FormContainer,
  },
  created() {},
  mounted() {
    this.getList();
    this["switchChange"] = function (row) {
      updata(row).then((res) => {
        this.$message.success("操作成功");
        this.getList();
      });
    };
  },
  methods: {
    filter() {
      return this.$refs.content.filter();
    },

    getList() {
      let params = {
        ...this.filter(),
      };
      payList(params).then((res) => {
        const { code, data } = res;
        if (code === 200) {
          this.tableData = data.records;
        }
      });
    },
  },
};
</script>
