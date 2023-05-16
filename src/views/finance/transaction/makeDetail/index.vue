<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 20:35:03
 * @LastEditTime: 2022-04-28 14:38:34
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\finance\transaction\index.vue
 * @Description: 文件说明
-->

// 进账明细
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
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import { makeDetailPage } from "@/api/trading";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList } from "./config";

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
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    filter() {
      return this.$refs.content.filter();
    },
    handleExport() {
      this.$confirm("是否确认导出所选商家管理平台端数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          let list = this.$refs.content.getSelectList.map((item) => {
            return item.payId;
          });
          let params = {
            ids: list,
            ...this.filter(),
            type: this.deptId == "110" ? 1 : 0,
          };
          this.download(
            "/orderInfo/receiveDetail/export",
            params,
            `交易明细(进账)_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
    },
    lookInfo(row) {
      this.$router.push({
        path: "/order/orderInfo",
        query: { id: row.orderId },
      });
    },
    /** 查询商家管理平台端列表 */
    getList() {
      let params = {
        ...this.filter(),
        type: this.deptId == "110" ? 1 : 0,
      };
      makeDetailPage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  },
};
</script>
