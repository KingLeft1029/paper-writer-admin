<!--
 * @Author: mikeShn
 * @Date: 2022-04-24 17:02:40
 * @LastEditTime: 2022-04-24 19:57:25
 * @FilePath: \digital-earth-PC\src\views\order\orderList\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="app-container">
    <div style="color: red">
      <span>状态：</span
      ><span>{{
        formData.state == "0"
          ? "未通过"
          : formData.state == "1"
          ? "申请中"
          : "已通过"
      }}</span>
    </div>
    <div class="info">
      <div>
        <el-form label-width="120px">
          <el-form-item label="申请结算时间：">{{
            formData.applyTime
          }}</el-form-item>
          <el-form-item label="申请金额：">{{
            formData.settlePrice
          }}</el-form-item>
          <el-form-item label="申请驳回时间：">{{
            formData.checkTime
          }}</el-form-item>
          <el-form-item label="驳回原因：">{{
            formData.backReason
          }}</el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="100px">
          <el-form-item label="发票类型：">
            <el-select v-model="formData.invoiceType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票图片：">
            <image-upLoad
              :isShowTip="false"
              :value="formData.invoicePic"
              @input="(val) => (formData.invoicePic = val)"
            ></image-upLoad>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-form label-width="100px">
          <el-form-item label="快递公司：">
            <el-select v-model="formData.deliveryCompanyId">
              <el-option
                v-for="(item, index) of deliveryCompanyNameOption"
                :key="index"
                :label="item.companyName"
                :value="item.companyId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号：">
            <el-input v-model="formData.sendCode"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="info-button">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="submit">确认</el-button>
    </div>
    <div class="order">
      <div>订单信息</div>
      <form-container
        :selection="true"
        ref="content"
        :formList="formList"
        :total="total"
        :tableList="tableList"
        :tableData="tableData"
        @search="getOrderList"
        @paginationChange="getOrderList"
        @recharge="getOrderList"
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
              </div>
            </template>
          </el-table-column>
        </template>
      </form-container>
    </div>
  </div>
</template>

<script>
import { deliveryCompanyManageList } from "@/api/allocation/deliveryCompanyManage";
import {
  queryById,
  detailPageList,
  settleRecordUpdate,
} from "@/api/settlement";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList } from "./config";
import ImageUpLoad from "@/components/ImageUpload";

export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "电子发票",
        },
        {
          value: "1",
          label: "纸质普通发票",
        },
        {
          value: "2",
          label: "纸质专用发票",
        },
        {
          value: "3",
          label: "增值税专用发票",
        },
        {
          value: "4",
          label: "增值税普通发票",
        },
      ],
      deliveryCompanyNameOption: [],
      tableList,
      formList,
      total: 0,
      tableData: [],
      formData: {},
    };
  },
  components: {
    FormContainer,
    ImageUpLoad,
  },
  computed: {
    deptId() {
      return this.$store.getters.deptId;
    },
  },
  created() {},
  mounted() {
    this.getformData();
    this.getOrderList();
    deliveryCompanyManageList({}).then((res) => {
      this.deliveryCompanyNameOption = res.data;
    });
  },
  methods: {
    submit() {
      this.$confirm("是否保存？").then((res) => {
        settleRecordUpdate(this.formData).then((res) => {
          this.$message.success("保存成功！");
        });
      });
    },
    filter() {
      return this.$refs.content.filter();
    },
    lookInfo(data) {
      this.$router.push({
        path: "/order/orderInfo",
        query: { id: data.orderId },
      });
    },
    getOrderList() {
      let params = {
        settleId: this.$route.query.id,
        ...this.filter(),
      };
      detailPageList(params).then((res) => {
        this.tableData = res.data.records;
      });
    },
    /** 查询商家管理平台端列表 */
    getformData() {
      queryById(this.$route.query.id).then((res) => {
        this.formData = res.data;
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      let list = [];
      if (this.$refs.content.getSelectList.length) {
        list = this.$refs.content.getSelectList.map((item) => {
          return item.orderId;
        });
      }else{
        this.$message.warning('请选择需要导出的数据')
        return
      }
      this.$confirm("是否确认导出?")
        .then(() => {
          this.download(
            "/orderInfo/canSettleList/export",
            {
              ids: list,
              ...this.filter(),
            },
            `结算管理_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.info {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}
.info-button {
  display: flex;
  justify-content: center;
  border-bottom: 5px solid #eee;
  padding-bottom: 10px;
}
.order {
  padding-top: 20px;
}
</style>
