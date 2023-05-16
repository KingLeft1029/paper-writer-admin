<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 18:07:30
 * @LastEditTime: 2022-05-03 12:08:20
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\auditManagement\evaluationAudit\index.vue
 * @Description: 文件说明
-->
<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 14:57:06
 * @LastEditTime: 2022-04-12 16:19:32
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\business\postage\index.vue
 * @Description: 文件说明
-->
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
      :formMounted="formMounted"
    >
      <template slot="button">
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="batchDelet"
          size="small"
          >批量删除</el-button
        >
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
                @click="deleteData(scope.row)"
                >删除</el-link
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import { evaluatePage, evaluateDelet, evaluatedeChoice } from "@/api/evaluate";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList } from "./config";

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
    formMounted(formData, refs) {
      if (this.deptId != "110") {
        refs.createTime[0].isShow = false;
      }
    },
    filter() {
      return this.$refs.content.filter();
    },
    /** 导出按钮操作 */
    handleExport() {
      this.$confirm("是否确认导出所选数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let list = this.$refs.content.getSelectList.map((item) => {
            return item.orderEvaId;
          });
          let params = {
            ids: list,
            ...this.filter(),
          };
          //list.length ? list : this.filter();
          this.download(
            "/orderEva/export",
            list,
            `评论审核_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
    },
    deleteData(data) {
      this.$confirm("确认删除选中的数据吗？", "删除").then((res) => {
        evaluateDelet([data.orderEvaId]).then((res) => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    batchDelet() {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量删除的数据");
        return;
      }
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.orderEvaId;
      });
      this.$confirm("确认删除选中的数据吗？", "删除").then((res) => {
        evaluateDelet(list).then((res) => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    lookInfo(value) {
      this.$router.push({
        path: "/auditManagement/details",
        query: {
          code: value.orderEvaId,
          type: "0",
        },
      });
    },
    /** 查询商家管理平台端列表 */
    getList() {
      let params = {
        ...this.filter(),
        selectType: "0",
        type: this.deptId == "110" ? "1" : "0",
      };
      evaluatePage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  },
};
</script>
