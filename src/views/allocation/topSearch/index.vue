<template>
  <div class="app-container">
    <form-container ref="content" :formList="formList" :total="total" :tableList="tableList" :tableData="tableData"
      @search="getList" @paginationChange="getList" @recharge="getList">
      <template slot="button">
        <el-button class="button" icon="el-icon-edit" @click="addData" size="small">添加</el-button>
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link :underline="false" type="primary" @click="editData(scope.row)">编辑</el-link>
              <el-link :underline="false" type="primary" @click="deleteData(scope.row)">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import {
  hotSearchPage,
  hotSearchAdd,
  hotSearchUpdate,
  hotSearchDelete,
} from "@/api/allocation/hotSearch";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList, formEditList } from "./config";
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
        title: "新增",
        data: {
          formList: formEditList,
          showButton: false,
        },
        components: ZFrom,
        beforeClose: function (flag, content, done) {
          if (flag && content.validate()) {
            hotSearchAdd(content.getFormData).then((res) => {
              let { code } = res;
              if (code === 200) {
                this.$message.success("添加成功");
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
    editData (formData) {
      this.$openDialog({
        title: "编辑",
        data: {
          formList: formEditList,
          showButton: false,
          formData,
        },
        components: ZFrom,
        beforeClose: function (flag, content, done) {
          if (flag && content.validate()) {
            hotSearchUpdate(content.getFormData).then((res) => {
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
    deleteData (formData) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          hotSearchDelete(formData.hotSearchId).then((res) => {
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
    lookInfo () { },
    /** 查询商家管理平台端列表 */
    getList () {
      let params = {
        ...this.filter(),
      };
      hotSearchPage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  }
};
</script>

