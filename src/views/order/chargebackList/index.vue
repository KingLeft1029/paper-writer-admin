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
      :formHideField="deptId == '110' ? [] : formHideField"
      :tableHideField="deptId == '110' ? [] : tableHideField"
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
              <el-link
                v-if="
                  scope.row.operator == '0' ? deptId == '110' : deptId != '110'
                "
                :underline="false"
                type="primary"
                @click="addNote(scope.row)"
                >备注</el-link
              >
              <el-link
                :underline="false"
                type="primary"
                @click="agree(scope.row)"
                v-if="
                  scope.row.operator == '0'
                    ? deptId == '110' &&
                      (scope.row.refundClass == '1' ||
                        scope.row.refundClass == '3' ||
                        scope.row.refundClass == '2')
                    : deptId != '110' &&
                      (scope.row.refundClass == '1' ||
                        scope.row.refundClass == '3' ||
                        scope.row.refundClass == '2')
                "
                >同意</el-link
              >

              <el-link
                :underline="false"
                v-if="
                  scope.row.operator == '0'
                    ? deptId == '110' &&
                      (scope.row.refundClass == '1' ||
                        scope.row.refundClass == '3' ||
                        scope.row.refundClass == '2')
                    : deptId != '110' &&
                      (scope.row.refundClass == '1' ||
                        scope.row.refundClass == '3' ||
                        scope.row.refundClass == '2')
                "
                type="primary"
                @click="rejected(scope.row)"
                >驳回</el-link
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import {
  refundList,
  CheckRefundOrder,
  orderInfoUpdate,
} from "@/api/order/orderList";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList } from "./config";
import ZForm from "@/views/components/Z-Form/form-groud";

export default {
  data() {
    return {
      tableList,
      formList,
      total: 0,
      tableData: [],
      formHideField: ["operator", "shopName"],
      tableHideField: ["operatorStr", "shopName"],
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
  created() {
    if(this.$route.query.orderId){
      this.formList[2].inputVal = this.$route.query.orderId
    }
    this.$nextTick(() => {
      this.getList();
    })
  },
  methods: {
    addNote(data) {
      this.$openDialog({
        title: "备注",
        width: "30%",
        components: {
          data() {
            return {
              val: null,
            };
          },
          render(h) {
            return (
              <el-input
                type="textarea"
                rows={2}
                placeholder="请输入内容"
                maxlength="50"
                vModel={this.val}
              ></el-input>
            );
          },
        },
        beforeClose: function (flag, content, done) {
          if (flag) {
            if (!content.val) {
              this.$message.warning("请填写备注");
              return;
            }
            let params = {
              orderId: data.orderId,
              shopRemark: content.val,
            };
            orderInfoUpdate(params).then((res) => {
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
    agree(row) {
      this.$confirm("是否同意？").then((res) => {
        let params = {
          refundId: row.refundId,
          checkState: "1",
        };
        CheckRefundOrder(params).then((res) => {
          this.$message.success("操作成功");
          this.getList();
          done();
        });
      });
    },
    rejected(row) {
      this.$openDialog({
        title: "驳回原因",
        width: "30%",
        data: {},
        components: {
          data() {
            return {
              val: null,
            };
          },
          render(h) {
            return (
              <div>
                <el-input
                  vModel={this.val}
                  type="textarea"
                  maxlength="50"
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
              refundId: row.refundId,
              checkState: "0",
            };
            CheckRefundOrder(params).then((res) => {
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
    filter() {
      return this.$refs.content.filter();
    },
    handleExport() {
      this.$confirm("是否确认导出?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let list = this.$refs.content.getSelectList.map((item) => {
            return item.orderId;
          });
          let params = {
            ids: list,
            ...this.filter(),
            type: this.deptId == "110" ? 1 : 0,
          };

          this.download(
            "/orderInfo/orderRefund/export",
            list,
            `退单列表_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
    },
    lookInfo(data) {
      this.$router.push({
        path: "/order/orderInfo",
        query: { id: data.orderId },
      });
    },
    /** 查询商家管理平台端列表 */
    getList() {
      let params = {
        ...this.filter(),
        type: this.deptId == "110" ? 1 : 0,
      };
      refundList(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  },
};
</script>
