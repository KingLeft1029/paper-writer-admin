<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 18:07:38
 * @LastEditTime: 2022-04-29 11:19:29
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\auditManagement\goodsAudit\index.vue
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
import { compositionPage } from "@/api/composition";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList } from "./config";
import { listGoodsType } from "@/api/business/goodsType";

export default {
  data() {
    return {
      tableList,
      formList,
      total: 0,
      tableData: [],
      sumNum: null,
    };
  },
  components: {
    FormContainer,
  },
  created() {
    listGoodsType({}).then((res) => {
      this.$set(this.formList[3], "options", res.data);
    });
  },
  mounted() {
    this.getList();
  },
  methods: {
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
            return item.orderDetailId;
          });
          let params = {
            ids: list,
            ...this.filter(),
          };
          this.download(
            "/orderDetail/export",
            params,
            `抽成管理_${new Date().getTime()}.xlsx`
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
      };
      compositionPage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
        this.sumNum = response.listTotal;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.button-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
</style>
