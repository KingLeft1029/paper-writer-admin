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
      :height="height"
      ref="table"
      :data="tableData"
      :row-key="RowKey"
      style="width: 100%"
      @row-click="rowClick"
      @selection-change="selectionChange"
    >
      <el-table-column v-if="selection" type="selection" width="55">
      </el-table-column>
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
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 50, 100, 400]"
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
    RowKey:String,
    height: String,
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
    toggleRowSelection(row, flag) {
      this.$refs.table.toggleRowSelection(row, flag);
    },
    toggleAllSelection() {
      this.$refs.table.toggleAllSelection();
    },
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
<style lang="scss" scoped>
.table {
  .table-pagination {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  ::v-deep .el-link--inner {
    margin-right: 10px;
  }
}
</style>
n
