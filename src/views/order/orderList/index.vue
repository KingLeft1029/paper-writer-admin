<template>
  <div class="app-container">
    <el-radio-group v-model="orderFlag" @change="selectOrder">
      <el-radio-button label="0">订单列表</el-radio-button>
      <el-radio-button label="1">预订单列表</el-radio-button>
    </el-radio-group>
    <!-- <form-container
      :selection="true"
      ref="content"
      :formList="formList"
      :total="total"
      :tableList="tableList"
      :tableData="tableData"
      @search="getList"
      @paginationChange="getList"
      @recharge="recharge"
      :formHideField="deptId == '110' ? [] : formHideField"
      :tableHideField="deptId == '110' ? [] : tableHideField"
    > -->
    <form-container :selection="true" ref="content" :formList="formList" :total="total" :tableList="tableList"
      :tableData="tableData" @search="getList" @paginationChange="getList" @recharge="recharge">
      <template slot="button">
        <el-button class="button" icon="el-icon-edit" @click="handleExport" size="small">批量导出</el-button>
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link :underline="false" type="primary" @click="lookInfo(scope.row)">查看详情</el-link>

              <template v-if="orderFlag == 0">
                <el-link v-if="
                    scope.row.operator == '0'
                      ? deptId == '110' && scope.row.orderState == '2'
                      : deptId != '110' && scope.row.orderState == '2'
                  " :underline="false" type="primary" @click="delivery(scope.row)">发货</el-link>
                <el-link v-if="
                    scope.row.operator == '0' ? deptId == '110' : deptId != '110'
                  " :underline="false" type="primary" @click="addNote(scope.row)">备注</el-link>
              </template>
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import { listOrderInfo, orderInfoUpdate } from "@/api/order/orderList";
import { orderDeliveryShip } from "@/api/order/orderDelivery";
import { deliveryCompanyManageList } from "@/api/deliveryCompanyManage";
import FormContainer from "@/views/components/FormContainer";
import { tableList1, tableList2, formList1, formList2 ,tableList1s,tableList2s,formList1s,formList2s} from "./config";
import ImageUpLoad from "@/components/ImageUpload";
export default {
  components: {
    FormContainer,
  },
  // this.deptId == "110"
  data () {
    return {
      tableList: [],
      tableList1,
      tableList2,
      tableList1s,
      tableList2s,
      formList: [],
      formList1,
      formList2,
      formList1s,
      formList2s,
      total: 0,
      tableData: [],
      formHideField: ["operator", "shopName"],
      tableHideField: ["operatorStr", "shopName"],
      orderFlag: 0,
    };
  },

  computed: {
    deptId () {
      return this.$store.getters.deptId;
    },
  },

  created () { },

  mounted () {
    this.tableList =this.deptId=='110'? this.tableList1s:this.tableList1
    this.formList = this.deptId=='110'?JSON.parse(JSON.stringify(this.formList1s)):JSON.parse(JSON.stringify(this.formList1))
    if (this.$route.query.orderId) {
      this.formList[2].inputVal = this.$route.query.orderId
    }
    this.$nextTick(() => {
      this.getList();
    })
  },

  methods: {
    addNote (data) {
      this.$openDialog({
        title: "备注",
        width: "30%",
        components: {
          data () {
            return {
              val: null,
            };
          },
          render (h) {
            return (
              <el-input
                type="textarea"
                rows={2}
                placeholder="请输入内容"
                vModel={this.val}
              ></el-input>
            );
          },
        },
        beforeClose: function (flag, content, done) {
          if (flag) {
            console.log(content);
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
    delivery (row) {
      this.$openDialog({
        title: "发货",
        data: {},
        components: {
          data () {
            return {
              radio: "1",
              courierForm: { deliveryCompanyId: null, trackingNumber: null },
              truckForm: {
                driverName: null,
                driverPhone: null,
                invoicePic: null,
              },
              deliveryCompanyManageList: [],
            };
          },
          render (h) {
            let truckForm = this.truckForm;
            return (
              <div>
                <el-form
                  ref="courierForm"
                  {...{
                    props: {
                      model: this.courierForm,
                      labelWidth: "80px",
                    },
                  }}
                >
                  <el-form-item
                    label="快递公司"
                    prop="deliveryCompanyId"
                    rules={[
                      {
                        required: true,
                        message: "请输入快递公司",
                        trigger: "blur",
                      },
                    ]}
                  >
                    <div style="width:225px">
                      <el-select vModel={this.courierForm.deliveryCompanyId}>
                        {this.deliveryCompanyManageList.map((item) => {
                          return (
                            <el-option
                              label={item.companyName}
                              value={item.companyId}
                            ></el-option>
                          );
                        })}
                      </el-select>
                    </div>
                  </el-form-item>
                  <el-form-item
                    label="快递单号"
                    prop="trackingNumber"
                    rules={[
                      {
                        required: true,
                        message: "请输入快递单号",
                        trigger: "blur",
                      },
                    ]}
                  >
                    <div style="width:225px">
                      <el-input
                        vModel={this.courierForm.trackingNumber}
                      ></el-input>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            );
          },
          components: {
            ImageUpLoad,
          },
          created () {
            deliveryCompanyManageList({}).then((res) => {
              this.deliveryCompanyManageList = res.data;
            });
          },
        },
        beforeClose: function (flag, content, done) {
          const ref = content.radio == "1" ? "courierForm" : "truckForm";
          if (flag == true) {
            content.$refs[ref].validate((res) => {
              if (res) {
                this.$confirm("确认发货？").then((res) => {
                  let params = content[ref];
                  params.deliveryType = "1";
                  params.orderId = row.orderId;
                  params.deliveryMethod = content.radio;
                  orderDeliveryShip(params).then((res) => {
                    this.$message.success("发货成功！");
                    this.getList();
                    done();
                  });
                });
              }
            });
          } else {
            done();
          }
        },
      });
    },

    filter () {
      return this.$refs.content.filter();
    },
    lookInfo (data) {
      this.$router.push({
        path: "/order/orderInfo",
        query: { id: data.orderId },
      });
    },
    /** 查询商家管理平台端列表 */
    getList () {
      let params = {
        preSaleFlag: this.orderFlag,
        orderPageType: this.orderFlag,
        type: this.deptId == "110" ? "1" : "0",
        ...this.filter(),
      };
      listOrderInfo(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
    /** 导出按钮操作 */
    handleExport () {
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
            type: this.deptId == "110" ? "1" : "0",
          };
          this.download(
            "/orderInfo/export",
            list,
            `订单列表_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => { });
    },
    selectOrder (val) {
console.log(val,this.deptId,"val")
      if (val == 0) {
        this.tableList =this.deptId=='110'? this.tableList1s:this.tableList1
        this.formList =this.deptId=='110'? JSON.parse(JSON.stringify(this.formList1s)):JSON.parse(JSON.stringify(this.formList1))
      } else {
        this.tableList =this.deptId=='110'? this.tableList2s:this.tableList2
        this.formList = this.deptId=='110'? JSON.parse(JSON.stringify(this.formList2s)):JSON.parse(JSON.stringify(this.formList2))
      }
      console.log(this.formList,"nnn")
      this.$refs.content.resetPage()
      this.getList()
    },
    recharge () {
      if (this.orderFlag == 0) {
        this.formList = JSON.parse(JSON.stringify(this.formList1))
      } else {
        this.formList = JSON.parse(JSON.stringify(this.formList2))
      }
      this.getList()
    }
  }
};
</script>

<style lang="scss" scoped></style>
