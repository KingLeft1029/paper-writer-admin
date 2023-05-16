<template>
  <div class="app-container">
    <form-container :selection="true" ref="content" :formList="formList" :total="total" :tableList="tableList"
      :tableData="tableData" @search="getList" @paginationChange="getList" @recharge="getList">
      <template slot="">

      </template>
      <template slot="button">
        <el-button class="button" icon="el-icon-edit" @click="handleExport" size="small">批量导出</el-button>
        <el-button class="button" icon="el-icon-edit" @click="handleAdd" size="small">添加</el-button>
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link :underline="false" type="primary" @click="editInfo(scope.row)">编辑</el-link>
              <el-link :underline="false" type="primary" @click="lookInfo(scope.row)">查看详情</el-link>
              <el-link :underline="false" type="primary" @click="deleteShop(scope.row)">删除</el-link>
              <el-link :underline="false" type="primary" @click="resetPassword(scope.row)">重置密码</el-link>
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
    <el-dialog title="添加" :visible.sync="dialogVisible" width="500px" :before-close="handleClose">
      <el-form :model="formData" ref="formData" label-width="120px">
        <el-form-item label="商家名称" prop="shopName" :rules="rules('请输入商家名称')">
          <el-input v-model="formData.shopName"></el-input>
        </el-form-item>
        <el-form-item label="联系人姓名" prop="linkName" :rules="rules('请输入联系人姓名')">
          <el-input v-model="formData.linkName"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号" prop="linkPhone" :rules="rules('请输入联系人手机号')">
          <el-input v-model="formData.linkPhone"></el-input>
        </el-form-item>
        <el-form-item label="商家账号" prop="userName" :rules="rules('请输入商家账号')">
          <el-input v-model="formData.userName"></el-input>
        </el-form-item>
        <el-form-item label="商家密码" prop="password" :rules="rules('请输入商家密码')">
          <el-input show-password v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="是否缴纳保证金" prop="bondFlag" :rules="rules('请选择')">
          <el-radio-group v-model="formData.bondFlag">
            <el-radio label='1'>是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="缴纳金额" prop="bondNum" v-if="formData.bondFlag==1" :rules="rules('请输入缴纳金额')">
          <el-input placeholder="请输入内容" v-model="formData.bondNum">
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="openFlag" :rules="rules('请选择')">
          <el-switch v-model="formData.openFlag"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('formData')">确定</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {
  listShopInfo,
  updateShopInfo,
  updatePwd,
  addShopInfo,
  delShopInfo
} from "@/api/merchant/platform";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList } from "./config";
import Provide from "@/views/components/mixin/provide";
export default {
  mixins: [Provide],

  components: {
    FormContainer,
  },

  data () {
    return {
      tableList,
      formList,
      total: 0,
      tableData: [],
      dialogVisible: false,
      formData: {
        openFlag: '0',
        bondFlag: '1',
      },
    };
  },

  computed: {
    rules () {
      return (message) => [
        { required: true, message: message, trigger: "blur" },
      ];
    },
  },

  created () { },

  mounted () {
    this.getList();
  },

  methods: {
    IMPassword (row) {
      this.$openDialog({
        title: "修改IM服务号",
        width: "400px",
        components: {
          data () {
            return {
              val: null,
            };
          },
          render (h) {
            return (
              <el-input vModel={this.val} placeholder="请输入IM服务号"></el-input>
            );
          },
        },
        beforeClose: function (flag, content, done) {
          if (flag) {
            if (!content.val) {
              this.$message.warning("请输入IM服务号");
              return;
            }
            let reg = /^[a-zA-Z0-9_]*$/;
            if (!reg.test(content.val)) {
              this.$message.warning("只能输入字母、数字、下划线");
              return;
            }
            row.imServiceId = content.val;
            updateShopInfo(row).then((res) => {
              this.getList()
              this.$message.success("修改成功");
              done();
            });
          } else {
            done();
          }
        },
      });
    },
    changePassword (row) {
      this.$openDialog({
        title: "修改密码",
        width: "400px",
        components: {
          data () {
            return {
              val: null,
            };
          },
          render (h) {
            return (
              <el-input vModel={this.val} placeholder="请输入新密码"></el-input>
            );
          },
        },
        beforeClose: function (flag, content, done) {
          if (flag) {
            if (!content.val) {
              this.$message.warning("请输入新密码");
              return;
            }
            let reg = /^(\w){5,25}$/;
            if (!reg.test(content.val)) {
              this.$message.warning("只能输入5-25个字母、数字、下划线");
              return;
            }
            row.password = content.val;
            updatePwd(row).then((res) => {
              this.$message.success("成功修改商家密码");
              done();
            });
          } else {
            done();
          }
        },
      });
    },
    resetPassword (row) {
      this.$confirm("是否重置密码？", "提示").then((res) => {
        updatePwd(row.shopId).then((res) => {
          this.$message.success("重置成功，密码为“123456”");
        });
      });
    },
    switchChange (data) {
      let text = data.openFlag == "1" ? "启用" : "取消启用";
      this.$confirm(`是否${text}？`, "提示")
        .then((res) => {
          updateShopInfo(data).then((res) => {
            this.$message.success("操作成功");
          });
        })
        .catch((err) => {
          data.openFlag = data.openFlag == "1" ? "0" : "1";
        });
    },
    filter () {
      return this.$refs.content.filter();
    },
    lookInfo (row) {
      this.$router.push({
        path: "/merchantPort",
        query: { shopId: row.shopId, readOnly: true },
      });
    },
    // 编辑
    editInfo (row) {
      this.$router.push({
        path: "/merchantPort",
        query: { shopId: row.shopId },
      });
    },
    /** 查询商家管理平台端列表 */
    getList () {
      listShopInfo(this.filter()).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
    /** 导出按钮操作 */
    handleExport () {
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.shopId;
      });
      if (list && list.length > 0) {
        this.$confirm("是否确认导出所选数据?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.download(
              "/shopInfo/export",
              list,
              `商家管理_${new Date().getTime()}.xlsx`
            );
          })
          .then((response) => {
            this.download(response.msg);
          })
          .catch(() => { });
      } else {
        // this.$message.warning("请选择要导出的数据！");
        this.$confirm("是否确认导出全部数据?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.download(
              "/shopInfo/export", list,
              `商家管理_${new Date().getTime()}.xlsx`
            );
          })
          .then((response) => {
            this.download(response.msg);
          })
          .catch(() => { });
      }

    },
    handleClose () {
      this.formData = {
        bondFlag: '1',
        bondNum: null,
        linkName: null,
        linkPhone: null,
        openFlag: '0',
        password: null,
        shopName: null,
        userName: null
      }
      this.dialogVisible = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.formData.openFlag) {
            this.formData.openFlag = 1
          } else {
            this.formData.openFlag = 0
          }
          addShopInfo(this.formData).then(res => {
            this.getList();
            this.dialogVisible = false
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    },
    handleAdd () {
      this.dialogVisible = true
    },
    deleteShop (row) {
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delShopInfo(row.shopId).then(res => {
            this.$message.success("删除成功！");
            this.getList()
          })
        })
        .catch(() => { });
    }
  }
};
</script>

