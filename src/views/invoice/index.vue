
<template>
  <div class="app-container">
    <form-container
      :selection="true"
      ref="content"
      :formList="formList"
      :total="total"
      :tableList="tableList"
      :tableData="tableData"
      @search="getList"
      @paginationChange="getList"
      @recharge="getList"
    >
      <template slot="button">
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="batchAgree"
          size="small"
          >批量同意</el-button
        >
      </template>
      <template slot="button">
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="handleExport"
          size="small"
          >批量导出</el-button
        >
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link
                :underline="false"
                type="primary"
                @click="lookInfo(scope.row)"
                >查看详情</el-link
              >
              <el-link
                :underline="false"
                type="primary"
                v-if="scope.row.state == '0'"
                @click="agree(scope.row)"
                >同意开票</el-link
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import { invoceRecordPage, invoceRecordemAgree } from "@/api/invoceRecord";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList, formEditList } from "./config";
import ZForm from "@/views/components/Z-Form/form-groud";

export default {
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
  computed: {
    deptId() {
      return this.$store.getters.deptId;
    },
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    filter() {
      return this.$refs.content.filter();
    },
    handleExport() {
      let list = [];
      if (this.$refs.content.getSelectList.length) {
        list = this.$refs.content.getSelectList.map((item) => {
          return item.invoiceId;
        });
      }
      let params = {
        ids: list,
        ...this.filter(),
        type: this.deptId == "110" ? "1" : "0",
      };
      this.$confirm("是否确认导出?")
        .then(() => {
          this.download(
            "/invoceRecord/export",
            params,
            `开票管理_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
    },
    lookInfo(select) {
      this.$openDialog({
        title: "查看详情",
        data: {
          formData: select,
          formList: formEditList,
          isReadonly: true,
          showButton: false,
        },
        components: ZForm,
        beforeClose: function (flag, content, done) {
          done();
        },
      });
    },
    agree(select) {
      this.$confirm("是否同意?").then(() => {
        invoceRecordemAgree({ ids: [select.invoiceId] }).then((res) => {
          this.$message.success("操作成功！");
          this.getList();
        });
      });
    },
    batchAgree() {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量同意的数据");
        return;
      }
      this.$confirm("是否同意开票", "提示").then((res) => {
        let list = this.$refs.content.getSelectList.map((item) => {
          return item.invoiceId;
        });
        invoceRecordemAgree({ ids: list }).then((res) => {
          this.$message.success("操作成功");
          this.getList();
        });
      });
    },
    /** 查询商家管理平台端列表 */
    getList() {
      let params = {
        ...this.filter(),
        type: this.deptId == "110" ? "1" : "0",
      };
      invoceRecordPage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  },
};
</script>
