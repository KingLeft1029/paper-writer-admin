<template>
  <div class="app-container">
    <form-container :selection="true" ref="content" :formList="formList" :total="total" :tableList="tableList"
      :tableData="tableData" @search="getList" @paginationChange="getList" @recharge="getList">
      <template slot="button">
        <el-button class="button" icon="el-icon-edit" @click="handleExport" size="small">批量导出</el-button>
        <el-button class="button" icon="el-icon-edit" @click="batchRejected" size="small">批量驳回</el-button>
        <el-button class="button" icon="el-icon-edit" @click="batchAgree" size="small">批量同意</el-button>
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link :underline="false" type="primary" @click="lookInfo(scope.row)">查看详情</el-link>
              <el-link :underline="false" type="primary" v-if="scope.row.checkStatus === '1'" @click="agree(scope.row)">
                同意</el-link>
              <el-link :underline="false" type="primary" v-if="scope.row.checkStatus === '1'"
                @click="rejected(scope.row)">驳回</el-link>
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import { shopInfoPage, shopInfoChoice } from "@/api/shopInfo";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList, tableListReadOnly } from "./config";
import ZForm from "@/views/components/Z-Form/form-groud";
import Ztextarea from "@/views/components/Z-Form/z-textarea";
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
    filter () {
      return this.$refs.content.filter();
    },
    handleExport () {
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.goodsId;
      });
      if (list && list.length > 0) {
        this.$confirm("是否确认导出所选数据?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.download(
              "/shopInfo/shopCheck/export",
              list,
              `商家审核_${new Date().getTime()}.xlsx`
            );
          })
          .then((response) => {
            this.download(response.msg);
          })
          .catch(() => { });
      } else {
        this.$confirm("是否确认导出全部数据?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.download(
              "/shopInfo/shopCheck/export",
              list,
              `商家审核_${new Date().getTime()}.xlsx`
            );
          })
          .then((response) => {
            this.download(response.msg);
          })
          .catch(() => { });
        // this.$message.warning("请选择需要导出的数据！");
      }

    },
    agree (select) {
      this.$confirm("是否同意?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          ids: [select.shopId],
          reject: true,
        };
        shopInfoChoice(params).then((res) => {
          this.$message.success("操作成功！");
          this.getList();
        });
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
        this.$message.warning("只有审批状态为审核中的才可以批量同意");
        return;
      }
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.shopId;
      });
      let params = {
        ids: list,
        reject: true,
      };
      shopInfoChoice(params).then((res) => {
        this.$message.success("操作成功");
        this.getList();
      });
    },
    rejected (select) {
      this.$openDialog({
        title: "驳回原因",
        data: {
          formData: select,
          formList: formList,
          inputInfo: {
            name: "驳回原因",
          },
          showButton: false,
        },
        components: Ztextarea,
        beforeClose: function (flag, content, done) {
          if (flag) {
            let params = {
              ids: [select.shopId],
              reject: false,
              rejectReason: content.inputVal,
            };
            shopInfoChoice(params).then((res) => {
              this.$message.success("操作成功！");
              this.getList();
            });
            done();
          } else if (flag == false) {
            done();
          }
        },
      });
    },
    batchRejected () {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量驳回的数据");
        return;
      }
      let flags = this.$refs.content.getSelectList.some(item => {
        return item.checkStatus != 1
      })
      if (flags) {
        this.$message.warning("该商家已被其他用户审核或还未被提交审核");
        return;
      }
      this.$openDialog({
        title: "驳回原因",
        data: {
          inputInfo: {
            name: "驳回原因",
          },
          showButton: false,
        },
        components: Ztextarea,
        beforeClose: function (flag, content, done) {
          let list = this.$refs.content.getSelectList.map((item) => {
            return item.shopId;
          });
          if (flag) {
            let params = {
              ids: list,
              reject: false,
              rejectReason: content.inputVal,
            };
            let backReason = content.inputVal;
            shopInfoChoice(params).then((res) => {
              this.$message.success("操作成功！");
              this.getList();
            });
            done();
          } else if (flag == false) {
            done();
          }
        },
      });
    },

    lookInfo (select) {
      this.$openDialog({
        title: "查看详情",
        data: {
          formData: select,
          formList: tableListReadOnly,
          isReadonly: true,
          showButton: false,
          inline: false,
          formMounted: function (formData, ref) {
            if (formData.checkStatus != "3") {
              ref.rejectReason[0].isShow = false;
            }
          },
        },
        beforeClose: function (flag, content, done) {
          done();
        },
        components: ZForm,
      });
    },
    /** 查询商家管理平台端列表 */
    getList () {
      let params = {
        ...this.filter(),
        type: this.deptId == "110" ? "1" : "0",
      };
      shopInfoPage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  }
};
</script>

