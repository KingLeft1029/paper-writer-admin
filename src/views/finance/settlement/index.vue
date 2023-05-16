<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 20:34:53
 * @LastEditTime: 2022-05-04 16:30:12
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\finance\settlement\index.vue
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
      :formHideField="deptId == '110' ? [] : formHideField"
      :tableHideField="deptId == '110' ? [] : tableHideField"
    >
      <template slot="center">
        <div style="color: red; padding: 10px">
          <span>总计：{{ sumNum }}元</span>
        </div>
      </template>
      <template slot="button">
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="batchAgree"
          size="small"
          v-if="deptId == '110'"
          >批量同意</el-button
        >
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="batchRejected"
          size="small"
          v-if="deptId == '110'"
          >批量驳回</el-button
        >
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="handleExport"
          size="small"
          >批量导出</el-button
        >
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="addData"
          v-if="deptId != '110'"
          size="small"
          >添加结算</el-button
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
                @click="agree(scope.row)"
                v-if="scope.row.state === '1' && deptId == '110'"
                >同意</el-link
              >
              <el-link
                :underline="false"
                type="primary"
                @click="rejected(scope.row)"
                v-if="scope.row.state === '1' && deptId == '110'"
                >驳回</el-link
              >
              <el-link
                :underline="false"
                type="primary"
                @click="withdraw(scope.row)"
                v-if="scope.row.state === '1' && deptId != '110'"
                >撤回</el-link
              >
              <el-link
                v-if="scope.row.state === '0' && deptId != '110'"
                :underline="false"
                type="primary"
                @click="againSubmit(scope.row)"
                >重新申请</el-link
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
    <el-dialog
      title="新增"
      :visible.sync="dialogVisible"
      show-close
      @opened="getOredrList"
    >
      <form-container
        :selection="true"
        ref="order"
        :formList="orderFormList"
        :total="orderTotal"
        :tableList="orderTableList"
        :tableData="orderTableData"
        @search="getOredrList"
        @paginationChange="getOredrList"
        @recharge="getOredrList"
      >
        <template slot="center">
          <div style="color: red; padding: 10px">
            <span>总计：{{ orderSumNum }}元</span>
          </div>
        </template>
        <template slot="button">
          <el-button
            v-if="!isAgainSumbit"
            class="button"
            icon="el-icon-edit"
            @click="allSettlement"
            size="small"
            >全部结算</el-button
          >
          <el-button
            v-if="!isAgainSumbit"
            class="button"
            icon="el-icon-edit"
            @click="orderExport"
            size="small"
            >批量导出</el-button
          >
          <el-button
            v-if="!isAgainSumbit"
            class="button"
            icon="el-icon-edit"
            @click="batchSettlement"
            size="small"
            >批量结算</el-button
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
      <span slot="footer" class="dialog-footer" v-if="isAgainSumbit">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="batchSettlement">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="批量结算申请"
      :visible.sync="dialogVisible2"
      show-close
      width="400px"
    >
      <div style="padding: 10px 0; text-align: center">
        已选<span style="color: red">{{ selectOrderNum }}</span
        >个订单
      </div>
      <div style="padding: 10px 0; text-align: center">
        结算总金额为：<span style="color: red">{{ selectOrderSum }}</span
        >元
      </div>
      <div style="padding: 10px 0; text-align: center">
        确定提交结算申请吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  settlementPage,
  settlementAgree,
  settlementRejected,
  settleRecordSave,
  backApply,
  detailList,
} from "@/api/settlement";
import { canSettleList } from "@/api/order/orderInfo";
import FormContainer from "@/views/components/FormContainer";
import {
  tableList,
  formList,
  orderTableList,
  orderFormList,
  addSettlementForm,
} from "./config";
import Ztextarea from "@/views/components/Z-Form/z-textarea";
import ZForm from "@/views/components/Z-Form/form-groud";
import { deliveryCompanyManageList } from "@/api/deliveryCompanyManage";
import ZTable from "@/views/components/Z-Table";

export default {
  data() {
    return {
      selectOrderNum: 0,
      selectOrderSum: 0,
      orderTableList,
      orderFormList,
      tableList,
      formList,
      orderSumNum: 0,
      total: 0,
      orderTotal: 0,
      tableData: [],
      sumNum: null,
      dialogVisible: false,
      dialogVisible2: false,
      orderTableData: [],
      addSettlementForm,
      isAgainSumbit: false,
      orderTableSelectList: [],
      isAll: "0",
      formHideField: ["shopName"],
      tableHideField: ["shopName"],
    };
  },
  components: {
    FormContainer,
    ZTable,
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
    againSubmit(row) {
      let that = this;
      that.isAgainSumbit = true;
      this.$openDialog({
        title: "重新申请",
        components: {
          data() {
            return {
              tableData: [],
              total: 0,
            };
          },
          render(h) {
            const tablelist = that.orderTableList;
            const deleteData = this.deleteData;
            return (
              <div>
                <div>
                  <el-button
                    onclick={function () {
                      that.dialogVisible = true;
                    }}
                  >
                    添加结算
                  </el-button>
                </div>
                <z-table
                  ref="againSumbit"
                  selection={true}
                  paginationChange={this.getOrderList}
                  total={this.total}
                  tableList={tablelist}
                  tableData={this.tableData}
                  onpaginationChange={this.getOrderList}
                >
                  <template slot="last">
                    <el-table-column
                      label="操作"
                      align="center"
                      {...{
                        scopedSlots: {
                          default: ({ row }) => {
                            return (
                              <div class="scope-button">
                                <el-link
                                  underline={false}
                                  onClick={function () {
                                    deleteData(row);
                                  }}
                                  type="primary"
                                >
                                  删除
                                </el-link>
                              </div>
                            );
                          },
                        },
                      }}
                    ></el-table-column>
                  </template>
                </z-table>
              </div>
            );
          },
          components: {
            ZTable,
          },
          computed: {
            selectData() {
              return that.orderTableSelectList;
            },
          },
          watch: {
            selectData(val) {
              val.forEach((item) => {
                let data = this.tableData.find((table) => {
                  return table.orderId == item.orderId;
                });
                if (!data) {
                  this.tableData.push(item);
                  this.$refs.againSumbit.toggleRowSelection(item, true);
                }
              });
            },
          },
          methods: {
            getPage() {
              return this.$refs.againSumbit.getPage;
            },
            deleteData(row) {
              this.$confirm("是否删除？").then((res) => {
                this.$delete(this.tableData, this.tableData.indexOf(row));
              });
            },
            getOrderList() {
              let params = {
                settleId: row.settleId,
              };
              detailList(params).then((res) => {
                this.tableData = res.data;
                this.total = res.data.length;
                this.$refs.againSumbit.toggleAllSelection();
              });
            },
          },
          mounted() {
            this.getOrderList();
          },
        },
        beforeClose: function (flag, dom, done) {
          if (flag) {
            if (dom.tableData) {
              row.orderIds = dom.tableData.map((item) => item.orderId);
              row.isAll = "0";
              settleRecordSave(row).then((res) => {
                this.$message.success("添加成功");
                this.dialogVisible = false;
                this.getList();
                done();
              });
            } else {
              this.$message.warning("请选择需要添加的结算单");
            }
          } else if (flag === false) {
            done();
          }
        },
      });
    },
    withdraw(row) {
      this.$confirm("是否撤回?").then((res) => {
        backApply({ id: row.settleId }).then((res) => {
          this.getList();
          this.$message.success("操作成功");
        });
      });
    },
    submit() {
      this.dialogVisible2 = false;
      if (this.isAgainSumbit) {
        this.orderTableSelectList = this.$refs.order.getSelectList;
        this.dialogVisible = false;
      } else {
        deliveryCompanyManageList({}).then((res) => {
          this.$set(this.addSettlementForm[2], "options", res.data);
        });
        this.$openDialog({
          title: "结算",
          width: "500px",
          data: {
            formList: this.addSettlementForm,
            showButton: false,
            inline: false,
          },
          components: ZForm,
          beforeClose: function (flag, dom, done) {
            if (flag) {
              let selectData = this.$refs.order.getSelectList;
              dom.getFormData.orderIds = selectData.map((item) => item.orderId);
              dom.isAll = this.isAll;
              settleRecordSave(dom.getFormData).then((res) => {
                this.$message.success("添加成功");
                this.dialogVisible = false;
                this.getList();
                done();
              });
            } else {
              done();
            }
          },
        });
      }
    },
    allSettlement() {
      if (!this.$refs.order.tableData.length) {
        this.$message.warning("没有可添加的结算");
        return;
      }
      this.selectOrderSum = this.orderSumNum;
      this.selectOrderNum = this.orderTotal;
      this.isAll = "1";

      this.dialogVisible2 = true;
    },
    batchSettlement() {
      this.isAll = "0";
      let selectData = this.$refs.order.getSelectList;
      if (!selectData.length) {
        this.$message.warning("请选择需要结算的订单");
        return;
      }
      this.selectOrderSum = selectData.reduce((sum, item) => {
        return sum + item.orderPrice;
      }, 0);
      this.selectOrderNum = selectData.length;
      this.dialogVisible2 = true;
    },
    getOredrList() {
      canSettleList(this.orderFilter()).then((res) => {
        this.orderTotal = res.data.total;
        this.orderTableData = res.data.records;
        this.orderSumNum = res.listTotal;
      });
    },
    addData() {
      this.isAgainSumbit = false;
      this.dialogVisible = true;
    },
    filter() {
      return this.$refs.content.filter();
    },
    orderFilter() {
      return this.$refs.order.filter();
    },
    orderExport() {
      let list = [];
      if (this.$refs.order.getSelectList.length) {
        list = this.$refs.order.getSelectList.map((item) => {
          return item.orderId;
        });
      }
      this.$confirm("是否确认导出?")
        .then(() => {
          this.download(
            "/orderInfo/canSettleList/export",
            {
              ids: list,
              ...this.filter(),
            },
            `结算单_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
    },
    handleExport() {
      let list = [];
      if (this.$refs.content.getSelectList.length) {
        list = this.$refs.content.getSelectList.map((item) => {
          return item.settleId;
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
            "/settleRecord/export",
            params,
            `结算单_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
    },
    agree(select) {
      this.$confirm("是否同意?").then(() => {
        settlementAgree([select.settleId]).then((res) => {
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
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.settleId;
      });
      settlementAgree(list).then((res) => {
        this.$message.success("操作成功");
        this.getList();
      });
    },
    rejected(select) {
      this.$openDialog({
        title: "驳回原因",
        data: {
          inputInfo: {
            name: "驳回原因",
          },
        },
        components: Ztextarea,
        beforeClose: function (flag, content, done) {
          if (flag) {
            if (!content.inputVal.length) {
              this.$message.warning("请填写驳回原因！");
              return;
            }
            let backReason = content.inputVal;
            settlementRejected([select.settleId], backReason).then((res) => {
              this.$message.success("操作成功！");
              this.getList();
            });
            done();
          } else if (flag === false) {
            done();
          }
        },
      });
    },
    batchRejected() {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量驳回的数据");
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
            return item.settleId;
          });
          if (flag) {
            let backReason = content.inputVal;
            settlementRejected(list, backReason).then((res) => {
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
    lookInfo(select) {
      this.$router.push({
        path: "/finance/settlementDetail",
        query: {
          id: select.settleId,
        },
      });
    },
    /** 查询商家管理平台端列表 */
    getList() {
      let params = {
        ...this.filter(),
        type: this.deptId == "110" ? "1" : "0",
      };
      settlementPage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
        this.sumNum = response.listTotal;
      });
    },
  },
};
</script>
