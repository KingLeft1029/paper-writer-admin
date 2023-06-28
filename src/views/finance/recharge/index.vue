<template>
  <div class="app-container">
    <el-form  :model="queryParams" ref="queryForm"
      :inline="true" v-show="showSearch">
      <el-form-item  prop="userName">
        <el-input v-model="queryParams.userName" :placeholder="$t('UserID')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item  prop="nickName">
        <el-input v-model="queryParams.nickName" :placeholder="$t('Nickname')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item  prop="nickName">
        <el-input v-model="queryParams.nickName" :placeholder="$t('Email')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>



      <el-form-item prop="status">
        <el-date-picker  v-model="pickerVal" type="daterange" range-separator="-" :start-placeholder="$t('START_DATE')"
          :end-placeholder="$t('END_DATE')">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search"    @click="handleQuery">{{
          $t("Search") }}</el-button>
        <el-button icon="el-icon-refresh"  @click="resetQuery">{{
          $t("Clear")
        }}</el-button>
      </el-form-item>
    </el-form>

    <div  >
      <el-row :gutter="10" class="mb8" >
        <el-col :span="1.5"  class="mt5">
          {{ $t('Total') }} 5 {{ $t('data') }}
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="iconfont icon-daochu"  @click="handleExport">{{ $t("Export")
          }}</el-button>
        </el-col>

      </el-row>

      <el-table v-loading="loading"   :default-sort = "{prop: 'date', order: 'descending'}" :data="list" @selection-change="handleSelectionChange"
        :header-cell-style="{ 'background-color': '#EDF4FC' }">

        <el-table-column :label="$t(' SER_NUM')" align="center" width="110" prop="userId" />

        <el-table-column :label="$t('RE_A') " sortable align="center" width="220" key="nickName" prop="nickName"
          :show-overflow-tooltip="true" />
          <el-table-column label="RECHAGE_INK" sortable  align="center" width="220" show-overflow-tooltip="true" prop="phonenumber" />
          <el-table-column :label="$t('UserID')"  align="center" show-overflow-tooltip="true" prop="phonenumber" />
          <el-table-column :label="$t('Nickname')" width="120"  align="center" show-overflow-tooltip="true" prop="phonenumber" />
        <el-table-column :label="$t('Email')"  align="center" show-overflow-tooltip="true" prop="phonenumber" />
        <el-table-column :label="$t('RE_S')" sortable align="center" width="140"  show-overflow-tooltip="true" prop="phonenumber" />
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>

  </div>
</template>

<script>
import {
  listApi
} from "@/api/recharge";

export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: {  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组

      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      list: null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,

      // 表单参数
      form: {},

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
        nickName: undefined,
        roleId: undefined,
      },


    };
  },

  created() {
    this.getList();


  },
  methods: {

    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listApi(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.list = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },



    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },



    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/user/export",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },


  },
};
</script>

