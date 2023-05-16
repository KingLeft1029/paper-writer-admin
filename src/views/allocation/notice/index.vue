<template>
  <div class="app-container">
    <form-container :selection="true" ref="content" :formList="formList" :total="total" :tableList="tableList"
      :tableData="tableData" @search="getList" @paginationChange="getList" @recharge="getList"><template slot="button">
        <el-button class="button" icon="el-icon-edit" @click="addData" size="small">添加</el-button>
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link :underline="false" type="primary" @click="lookInfo(scope.row)">查看详情</el-link>
              <el-link v-if="!$route.query.type" :underline="false" type="primary" @click="editData(scope.row)">编辑
              </el-link>
              <el-link v-if="!$route.query.type" :underline="false" type="primary" @click="deleteData(scope.row)">删除
              </el-link>
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import {
  systemNoticePage,
  upDateSystemNotice,
  deleteUserNotice,
  emitSystemNotice,
} from "@/api/allocation/notice";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList, formEditList, formLookList } from "./config";
import ZFrom from "@/views/components/Z-Form/form-groud";
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

  created () { },

  mounted () {
    this.getList();
  },

  methods: {
    filter () {
      return this.$refs.content.filter();
    },
    addData () {
      this.$openDialog({
        title: "添加",
        data: {
          formList: formEditList,
          showButton: false,
        },
        components: ZFrom,
        beforeClose: function (flag, form, done) {
          if (flag && form.validate()) {
            form.getFormData.noticeType = "0";
            upDateSystemNotice(form.getFormData).then((res) => {
              this.$message.success("添加成功！");
              done();
              this.getList();
            });
          } else if (flag === false) {
            done();
          }
        },
      });
    },
    lookInfo (select) {
      this.$openDialog({
        title: "查看详情",
        data: {
          formList: formLookList,
          showButton: false,
          formData: select,
          isReadonly: true,
          // inline: false,
        },
        components: ZFrom,
        beforeClose: function (flag, content, done) {
          done();
        },
      });
    },
    deleteData (id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUserNotice(id.noticeId).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    editData (formData) {
      this.$openDialog({
        title: "编辑系统消息",
        data: {
          formList: formEditList,
          showButton: false,
          formData,
        },
        components: ZFrom,
        beforeClose: function (flag, content, done) {
          if (flag && content.validate()) {
            emitSystemNotice(content.getFormData).then((res) => {
              let { code } = res;
              if (code === 200) {
                this.$message.success("修改成功");
              }
              this.getList();
              done();
            });
          } else if (flag == false) {
            done();
          }
        },
      });
    },
    /** 查询商家管理平台端列表 */
    getList () {
      let params = {
        ...this.filter(),
      };
      systemNoticePage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-weight: 700;
  font-size: 18px;
}
.time {
  display: flex;
  justify-content: space-between;
}
.readFlag {
  background: #eee;
  padding: 5px 20px;
  border-radius: 5px;
}
</style>