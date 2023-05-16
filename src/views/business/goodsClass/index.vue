<template>
  <div class="app-container">
    <el-radio-group v-model="preSaleFlag" @change="selectSale">
      <el-radio-button label="0">普通商品</el-radio-button>
      <el-radio-button label="1">预售商品</el-radio-button>
    </el-radio-group>
    <form-container
      class="form-container"
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
      <template slot="button">
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="handleExport"
          size="small"
          >批量导出</el-button
        >
        <!-- <el-button
          class="button"
          icon="el-icon-edit"
          @click="batchDelete"
          size="small"
          >批量删除</el-button
        > -->
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="upShelf"
          size="small"
          >批量上架</el-button
        >
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="downShelf"
          size="small"
          >批量下架</el-button
        >
        <el-button
          class="button"
          icon="el-icon-edit"
          @click="toGoodsInfo"
          size="small"
          >添加</el-button
        >
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link
                :underline="false"
                type="primary"
                @click="toGoodsInfo(scope.row, true)"
                >查看详情</el-link
              >
              <el-link
                :underline="false"
                type="primary"
                @click="toGoodsInfo(scope.row)"
                >编辑</el-link
              >
              <el-link
                :underline="false"
                type="primary"
                @click="deleteData(scope.row)"
                >删除</el-link
              >
              <el-link v-if="scope.row.checkStatus == '0'"
                :underline="false"
                type="primary"
                @click="dealSubmit(scope.row)"
              >提审</el-link
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
  listGoodsInfo,
  onSaleUpdate,
  delGoodsInfo, batchSubmitCheck
} from '@/api/business/goodsInfo'
import FormContainer from "@/views/components/FormContainer";
import { tableList1,tableList2, formList } from "./config";
import Provide from "@/views/components/mixin/provide";
import { listGoodsType } from "@/api/business/goodsType";

export default {
  mixins: [Provide],
  data() {
    return {
      tableList: [],
      formList,
      total: 0,
      tableData: [],
      preSaleFlag: 0,
      tableList1,
      tableList2
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

  },
  mounted() {
    this.tableList = this.tableList1
    this.getList();
    listGoodsType({pageNum: 1, pageSize: 99999}).then((res) => {
      this.$set(this.formList[1], "options", res.data.records);
    });
  },
  methods: {
    filter() {
      return this.$refs.content.filter();
    },
    // 提交审核给平台端
    dealSubmit(data){
      let goodsIdArr = [data.goodsId]
      batchSubmitCheck(goodsIdArr).then((res) => {
        this.$message.success("提审成功");
        this.getList();
      })
    },
    deleteData(data) {
      if (data.onSaleFlag == 1) {
        this.$message.warning("该商品未下架不可删除！");
        return;
      }
      this.$confirm("是否删除该条数据？").then((res) => {
        delGoodsInfo([data.goodsId]).then((res) => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    toGoodsInfo(data, isReadonly) {
      if (!isReadonly) {
        if (data.checkStatus == 1) {
          this.$message.warning("该商品审核中不可编辑！");
          return;
        }
        if (data.onSaleFlag == 1) {
          this.$message.warning("该商品未下架不可编辑！");
          return;
        }
      }
      this.$router.push({
        path: "/business/goodsInfo",
        query: { id: data.goodsId, isReadonly,preSaleFlag: this.preSaleFlag },
      });
    },
    /** 查询商家管理平台端列表 */
    getList() {
      let params = {
        ...this.filter(),
        type: this.deptId == "110" ? "1" : "0",
        preSaleFlag: this.preSaleFlag
      };
      listGoodsInfo(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
    batchDelete() {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量删除的数据");
        return;
      }
      this.$confirm("是否删除？", "提示").then((res) => {
        let list = this.$refs.content.getSelectList.map((item) => {
          return item.goodsId;
        });
        delGoodsInfo(list).then((res) => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    upShelf() {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量上架数据");
        return;
      }
      let ids = this.$refs.content.getSelectList.map((item) => {
        return item.goodsId;
      });
      let params = {
        ids,
        type: "1",
      };
      onSaleUpdate(params).then((res) => {
        this.$message.success("操作成功！");
        this.getList();
      });
    },
    downShelf() {
      if (!this.$refs.content.getSelectList.length) {
        this.$message.warning("请选择需要批量下架数据");
        return;
      }
      let ids = this.$refs.content.getSelectList.map((item) => {
        return item.goodsId;
      });
      let params = {
        ids,
        type: "0",
      };
      onSaleUpdate(params).then((res) => {
        this.$message.success("操作成功！");
        this.getList();
      });
    },
    /** 导出按钮操作 */
    handleExport() {
      let list = this.$refs.content.getSelectList.map((item) => {
        return item.goodsId;
      });
      if(list && list.length > 0){
        this.$confirm("是否确认导出?", "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
        .then(() => {
          this.download(
            "/goodsInfo/export",
            list,
            `商品管理_${new Date().getTime()}.xlsx`
          );
        })
        .then((response) => {
          this.download(response.msg);
        })
        .catch(() => {});
      }else{
        this.$message.warning("请选择需要导出的数据！");
      }


    },
    selectSale(e){
      if(e == 0){
        this.tableList = this.tableList1
      }else{
        this.tableList = this.tableList2
      }
      this.getList()
    }
  },
};
</script>

<style lang="scss" scoped>
.form-container {
  ::v-deep {
    .el-table .cell.el-tooltip {
      div {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
