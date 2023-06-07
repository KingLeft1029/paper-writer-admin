<!--
 * @Author: mikeShn
 * @Date: 2022-03-15 17:37:07
 * @LastEditTime: 2022-04-24 20:20:13
 * @FilePath: \digital-earth-PC\src\views\components\Z-Table\index.vue
 * @Description: 文件说明
-->
<template>
  <div class="table">
    <el-table
      ref="table"
      :data="tableData"
      :header-cell-style="{ 'background-color': '#EDF4FC' }"
      style="width: 100%"
      @row-click="rowClick"
      @selection-change="selectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column v-if="selection" align="center" type="selection" width="55">
      </el-table-column>
      <el-table-column v-if="numbers" :index="indexMethod" align="center" :label="$t('SR_NO')" type="index" width="60"></el-table-column>
      <slot name="first"></slot>
      <column
        :tableHideField="tableHideField"
        :ref="item.prop"
        v-for="(item, index) of tableList"
        :key="index"
        :columnData="item"
      ></column>
      <slot name="last"></slot>
    </el-table>
    <div class="table-pagination" v-if="isShowPagination">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 50, 100, 400, 1000]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import Column from "./z-table-column.vue";
import Inject from "../mixin/inject";
export default {
  mixins: [Inject],
  props: {
    tableMounted: Function,
    tableHideField: Array,
    selection: {
      type: Boolean,
      default: false,
    },
    total: {
      type: Number,
      default: 0,
    },
    tableList: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    isShowPagination: {
      type: Boolean,
      default: true,
    },
    numbers:{
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      selectRow: Object.create(null),
      selectList: [],
      pageSize: 10,
      pageNum: 1,
    };
  },
  computed: {
    getSelectList() {
      return this.selectList;
    },
    getPage() {
      return {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
    },
  },
  components: {
    Column,
  },
  watch: {},
  mounted() {
    
    if (this.tableMounted && this.tableMounted.constructor == Function) {
      this.$CD
        ? this.tableMounted.call(this.$CD, this.$refs)
        : this.tableMounted(this.$refs);
    }
  },
  methods: {
    indexMethod(index) {
      const { pageSize, pageNum } = this.getPage;
      let num = index + 1;
      if (pageNum == 1) {
        return num;
      } else {
        return (num += pageSize * (pageNum - 1));
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "warning-row";
      }
      return "";
    },
    toggleRowSelection(row, flag) {
      this.$refs.table.toggleRowSelection(row, flag);
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },
    //change(item, data) {
    //  if (
    //    item.changeFunction &&
    //    this.$CD[item.changeFunction].constructor == Function
    //  ) {
    //    this.$CD[item.changeFunction](data);
    //  }
    //},
    recharge() {
      (this.pageSize = 10), (this.pageNum = 1);
    },
    selectionChange(selection) {
      this.selectList = selection;
    },
    rowClick(row, column) {
      this.selectRow = row;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.$emit("paginationChange", "pageSize", val);
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.$emit("paginationChange", "pageNum", val);
    },
  },
};
</script>
<style lang="scss">
//::v-deep.el-table__row:hover {
//  border: 1px solid blue !important;
//}
.el-pager li.active{
  //color: #fff !important;
  background: #3880fe !important;
}
.el-table .warning-row {
  background: #f4fbff;
}
.table {
  .table-pagination {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  .el-link--inner {
    margin-right: 10px !important;
    color: #3880fe !important;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    // background-color: #212e3e !important;
    border-top: 1px solid #9bcbfc;
    border-bottom: 1px solid #9bcbfc;
    //background-color: #9bcbfc !important;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td:nth-child(1) {
    border-left: 1px solid #9bcbfc;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td:last-child {
    border-right: 1px solid #9bcbfc;
    border-bottom: 1px solid #9bcbfc;
    //border-top: 1px solid #9bcbfc;
  }
}
</style>
