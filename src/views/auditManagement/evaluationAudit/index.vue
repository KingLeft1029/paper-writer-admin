<template>
  <div class="app-container">
    <form-container :selection="true" ref="content" :formList="formList" :total="total" :tableList="tableList"
      :tableData="tableData" @search="getList" @paginationChange="getList" @recharge="getList">
      <template slot="button">
        <el-button class="button" icon="el-icon-edit" @click="batchDelet" size="small">批量删除</el-button>
        <el-button class="button" icon="el-icon-edit" @click="handleExport" size="small">批量导出</el-button>
        <el-button class="button" icon="el-icon-edit" @click="batchAgree" size="small">批量同意</el-button>
        <el-button class="button" icon="el-icon-edit" @click="batchReject" size="small">批量驳回</el-button>
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link :underline="false" type="primary" @click="lookInfo(scope.row)">查看详情</el-link>
              <el-link :underline="false" type="primary" @click="deleteData(scope.row)">删除</el-link>
              <el-link v-if="scope.row.checkStatus == '0'" :underline="false" type="primary" @click="agree(scope.row)">
                同意</el-link>
              <el-link v-if="scope.row.checkStatus == '0'" :underline="false" type="primary" @click="reject(scope.row)">
                驳回</el-link>
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
import ZForm from "@/views/components/Z-Form/form-groud";
export default {
  components: {
    FormContainer,
  },

  data () {
    return {
      tableList,
      formList,
      total: 0,
      tableData: [],
    };
  },

  computed: {
    deptId () {
      return this.$store.getters.deptId;
    },
  },

  created () { },

  mounted () {
    this.getList();
  },

  methods: {
    batchReject () {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量驳回的数据");
        return;
      }

      let flags = this.$refs.content.getSelectList.some(item => {
        return item.checkStatus != 1
      })
      if (flags) {
        this.$message.warning("该平价已被其他用户审核或还未被提交审核");
        return;
      }

      this.$openDialog({
        title: "驳回原因",
        width: "30%",
        data: {},
        components: {
          data () {
            return {
              val: null,
            };
          },
          render (h) {
            return (
              <div>
                <el-input
                  vModel={this.val}
                  type="textarea"
                  rows={3}
                  placeholder="请输入内容"
                ></el-input>
              </div>
            );
          },
        },
        beforeClose: function (flag, content, done) {
          if (flag) {
            if (!this.$refs.content.getSelectList.length) {
              this.$message.warning("请选择需要批量驳回的数据");
              return;
            }
            let list = this.$refs.content.getSelectList.map((item) => {
              return item.orderEvaId;
            });
            if (!content.val) {
              this.$message.warning("请输入驳回原因");
              return;
            }
            let params = {
              rejectReason: content.val,
              ids: list,
              checkStatus: "2",
            };
            evaluatedeChoice(params).then((res) => {
              this.$message.success("操作成功");
              this.getList();
              done();
            });
          } else {
            done();
          }
        },
      });
    },
    reject (row) {
      this.$openDialog({
        title: "驳回原因",
        width: "30%",
        data: {},
        components: {
          data () {
            return {
              val: null,
            };
          },
          render (h) {
            return (
              <div>
                <el-input
                  vModel={this.val}
                  type="textarea"
                  rows={3}
                  placeholder="请输入内容"
                ></el-input>
              </div>
            );
          },
        },
        beforeClose: function (flag, content, done) {
          if (flag) {
            if (!content.val) {
              this.$message.warning("请输入驳回原因");
              return;
            }
            let params = {
              rejectReason: content.val,
              ids: [row.orderEvaId],
              checkStatus: "2",
            };
            evaluatedeChoice(params).then((res) => {
              this.$message.success("操作成功");
              this.getList();
              done();
            });
          } else {
            done();
          }
        },
      });
    },
    batchAgree () {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量同意的数据");
        return;
      }
      let flag = this.$refs.content.getSelectList.some(item => {
        return item.checkStatus != 1
      })
      if (flag) {
        this.$message.warning("只有审核状态为审核中的才可以批量同意");
        return;
      }
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.orderEvaId;
      });
      let params = {
        ids: list,
        checkStatus: "1",
      };
      evaluatedeChoice(params).then((res) => {
        this.$message.success("操作成功");
        this.getList();
      });
    },
    agree (select) {
      this.$confirm("是否同意?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          ids: [select.orderEvaId],
          checkStatus: "1",
        };
        evaluatedeChoice(params).then((res) => {
          this.$message.success("操作成功！");
          this.getList();
        });
      });
    },
    filter () {
      return this.$refs.content.filter();
    },
    /** 导出按钮操作 */
    handleExport () {
      this.$confirm("是否确认导出所选商家管理平台端数据项?", "警告", {
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
          this.download(
            "/orderEva/orderEvaCheck/export",
            list,
            `评论审核_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => { });
    },
    deleteData (data) {
      this.$confirm("是否删除该条数据？").then((res) => {
        evaluateDelet([data.orderEvaId]).then((res) => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    batchDelet () {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量删除的数据");
        return;
      }
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.orderEvaId;
      });
      this.$confirm("是否删除？").then((res) => {
        evaluateDelet(list).then((res) => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    lookInfo (value) {
      this.$router.push({
        path: "/auditManagement/details",
        query: {
          code: value.orderEvaId,
          type: "1",
        },
      });
    },
    /** 查询商家管理平台端列表 */
    getList () {
      let params = {
        selectType: "0",
        ...this.filter(),
        type: this.deptId == "110" ? "1" : "0",
      };
      evaluatePage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  }
};
</script>

