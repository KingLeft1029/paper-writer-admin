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
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import { listUser, userPhoneRecord } from "@/api/system/user";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList, formEditList, tableEditList } from "./config";
import ZForm from "@/views/components/Z-Form/form-groud";

export default {
  data() {
    return {
      tableList,
      formList,
      formEditList,
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
  },
  methods: {
    filter() {
      return this.$refs.content.filter();
    },
    lookInfo(select) {
      //console.log(select);
      userPhoneRecord({ userId: select.userId }).then((res) => {
        this.$openDialog({
          title: "查看详情",
          data: {
            formData: select,
            formList: formEditList,
            isReadonly: true,
            showButton: false,
            height: "250",
            isShowPagination: false,
            tableData: res.data,
            tableList: tableEditList,
          },
          components: FormContainer,
          beforeClose: function (flag, content, done) {
            done();
          },
        });
      });
    },
    getList() {
      let params = {
        ...this.filter(),
        userType: "01",
      };
      listUser(params).then((response) => {
        this.tableData = response.rows;
        this.total = response.total;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.userId;
      });
      let params = {
        ids: list,
        ...this.filter(),
        userType: "01",
      };
      this.$confirm("是否确认导出?", "提示")
        .then(() => {
          this.download(
            "system/user/front/export",
            params,
            `用户管理_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
    },
  },
};
</script>
