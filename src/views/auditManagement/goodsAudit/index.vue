<template>
  <div class="app-container">
    <el-radio-group v-model="preSaleFlag" @change="selectSale">
      <el-radio-button label="0">普通商品</el-radio-button>
      <el-radio-button label="1">预售商品</el-radio-button>
    </el-radio-group>
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

    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item>
          <el-radio-group label="" v-model="form.cutType">
            <el-radio :label="1">百分比</el-radio>
            <el-radio :label="0">固定金额</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="抽取商品金额的" prop="cutNum" v-if="form.cutType==1">
          <el-input v-model.number="form.cutNum" placeholder="" style="width: 220px">
            <span style="color:#000" slot="suffix">%</span>
          </el-input>
        </el-form-item>
        <el-form-item label="固定抽取" prop="cutNum" v-else>
          <el-input v-model.number="form.cutNum" placeholder="" style="width: 220px">
            <span style="color:#000" slot="suffix">元</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { commodityAuditPage, commodityAuditChoice } from "@/api/shopInfo";
import FormContainer from "@/views/components/FormContainer";
import { tableList1, tableList2, formList, formEditList1, formEditList2 } from "./config";
import { listGoodsType } from "@/api/business/goodsType";
import ZForm from "@/views/components/Z-Form/form-groud";
import Ztextarea from "@/views/components/Z-Form/z-textarea";
export default {
  components: {
    FormContainer,
  },

  data () {
    return {
      tableList: [],
      tableList1,
      tableList2,
      formList,
      total: 0,
      tableData: [],
      formEditList: [],
      formEditList1,
      formEditList2,
      preSaleFlag: 0,
      title: '商品抽成',
      open: false,
      form: {
        cutType: 1
      },

      // 表单校验
      rules: {
        cutNum: {
          required: true,
          message: "不能为空",
          trigger: "blur",
        },
      },

    };
  },

  computed: {
    deptId () {
      return this.$store.getters.deptId;
    },
  },

  created () {
    this.tableList = this.tableList1
    listGoodsType({ pageNum: 1, pageSize: 99999 }).then((res) => {
      this.$set(this.formList[3], "options", res.data.records);
    });
  },

  mounted () {
    this.getList();
  },

  methods: {
    filter () {
      return this.$refs.content.filter();
    },
    agree (select) {
      this.$confirm("是否同意?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          ids: [select.goodsId],
          checkStatus: "2",
        };
        commodityAuditChoice(params).then((res) => {
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
        this.$message.warning("只有审核中的商品才可以批量同意");
        return;
      }
      this.open = true


      // let list = this.$refs.content.getSelectList.map((item) => {
      //   return item.goodsId;
      // });

      // this.$confirm("是否同意?", "提示",{
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      //   type: "warning",
      // }).then(() => {
      //   let params = {
      //     ids: list,
      //     checkStatus: "2",
      //   };
      //   commodityAuditChoice(params).then((res) => {
      //     this.$message.success("操作成功");
      //     this.getList();
      //   });
      // })
    },
    submitForm () {
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.goodsId;
      });
      this.$refs["form"].validate((valid) => {
        if (valid) {
          let params = {
            ids: list,
            checkStatus: "2",
            cutType: this.form.cutType,
            cutNum: this.form.cutNum,
          };
          commodityAuditChoice(params).then((res) => {
            this.$message.success("操作成功");
            this.getList();
            this.cancel()
          });
        }
      });

    },
    cancel () {
      this.open = false
      this.reset();
    },
    reset () {
      this.form = {
        cutType: 1,
        cutNum: null
      }
      this.resetForm("form");
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
              rejectReason: content.inputVal,
              ids: [select.goodsId],
              checkStatus: "3",
            };
            commodityAuditChoice(params).then((res) => {
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
        this.$message.warning("该商品已被其他用户审核或还未被上架提交审核");
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
            return item.goodsId;
          });
          if (flag) {
            let params = {
              rejectReason: content.inputVal,
              ids: list,
              checkStatus: "0",
            };
            commodityAuditChoice(params).then((res) => {
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
      let data = JSON.parse(JSON.stringify(select));
      data.codeName = data.goodsCodeName;
      let formHideField = [];
      if (select.checkStatus == "1") {
        formHideField = ["rejectReason", "checkTime", "checkUserName"];
      }
      let formList = this.preSaleFlag == 1 ? this.formEditList2 : this.formEditList1
      console.log(data, "data")
      console.log(formList, "formList")
      this.$openDialog({
        title: "查看详情",
        data: {
          formData: data,
          formList: formList,
          isReadonly: true,
          showButton: false,
          inline: false,
          labelWidth: "120px",
          formHideField,
        },
        components: ZForm,
        beforeClose: function (flag, content, done) {
          done();
        },
      });
    },
    /** 导出按钮操作 */
    handleExport () {
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.goodsId;
      })
      if (list && list.length > 0) {
        this.$confirm("是否确认导出所选商数据?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.download(
              "/goodsInfo/goodsCheck/export",this.formList,
              list,
              `商品审核_${new Date().getTime()}.xlsx`
            );
          })
          .then((response) => {
            this.download(response.msg);
          })
          .catch(() => { });
      } else {
        this.$message.info("请选择需要导出的数据！");
      }

    },
    /** 查询商家管理平台端列表 */
    getList () {
      let params = {
        selectType: 0,
        type: this.deptId == "110" ? "1" : "0",
        ...this.filter(),
        preSaleFlag: this.preSaleFlag
      };
      params.shopInfo = { 'shopName': params.shopName }
      commodityAuditPage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
    selectSale (e) {
      if (e == 0) {
        this.tableList = this.tableList1
      } else {
        this.tableList = this.tableList2
      }
      this.getList()
    }
  }
};
</script>

