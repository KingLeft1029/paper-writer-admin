<template>
  <div class="app-container">
    <!--用户数据-->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item prop="name">
        <el-input v-model="queryParams.name" :placeholder="$t('BOOK_TITLE')" clearable style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="queryParams.nickName" :placeholder="$t('Tags')" clearable style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item prop="createBy">
        <el-input v-model="queryParams.createBy" :placeholder="$t('Author')" clearable style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="queryParams.isHot" :placeholder="$t('Hot')">
          <el-option :label="$t('Hot')" :value="true"></el-option>
          <el-option :label="$t('NOT_RECOMMEND')" :value="false"></el-option>
          <!-- <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"
            :disabled="item.status == 1"></el-option> -->
        </el-select>
      </el-form-item>


      <el-form-item prop="status">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="-" :start-placeholder="$t('START_DATE')"
          :end-placeholder="$t('END_DATE')">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="handleQuery">{{
          $t("Search") }}</el-button>
        <el-button icon="el-icon-refresh" @click="resetQuery">{{
          $t("Clear")
        }}</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5" class="mt5">
          {{ $t('Total') }}5{{ $t('data') }}
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="iconfont icon-daochu" @click="handleExport">{{ $t("Export")
          }}</el-button>
        </el-col>

      </el-row>

      <el-table v-loading="loading" :default-sort="{ prop: 'date', order: 'descending' }" :data="list"
        @selection-change="handleSelectionChange" :header-cell-style="{ 'background-color': '#EDF4FC' }">

        <el-table-column :label="$t('SER_NUM')" align="center">
          <template slot-scope="scope">
            <span>{{ (queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('COURSE_ID')" align="center" prop="id" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('BOOK_TITLE')" align="center" key="nickName" prop="nickName"
          :show-overflow-tooltip="true" />

        <el-table-column :label="$t('PIC')" align="center"  width="140"   prop="image" >
          <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="scope.row.image" :preview-src-list="scope.row.image">
          </el-image>
        </template>
        </el-table-column>
        <el-table-column :label="$t('URL')" align="center" prop="link" />
        <el-table-column :label="$t('Author')" align="center" prop="createBy" />
        <el-table-column :label="$t('Newest')" sortable align="center" prop="phonenumber" />
        <el-table-column :label="$t('Status')" align="center" key="status">
          <template slot-scope="scope">
            {{ scope.row.status == "0" ? $t("OFF_SHELF") : $t("ON_SHELF") }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('Operate')" align="center" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="text"  @click="handleCheck(scope.row)">{{ $t("View") }}
            </el-button>
            <el-button type="text"  @click="handleSole(scope.row)" v-if="scope.row.status==1">{{ $t("Downlist") }}</el-button>
            <el-button type="text"  @click="handleSole(scope.row)" v-else>{{ $t("Uploaded") }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>


  </div>
</template>

<script>
import {
  listApi,
  exportApi,
  detailApi

} from "@/api/book";



export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: {},
  data() {
    return {
      // 遮罩层
      loading: true,

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
        name: undefined,
        createBy: undefined,
        isHot: undefined,

      },
      dateRange: []

    };
  },
  watch: {

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
          this.list = response.data.records;
          this.total = response.data.total;
          this.loading = false;
        }
      );
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: undefined,
        remark: undefined,
        postIds: [],
        roleId: undefined,
      };
      this.resetForm("form");
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




    handleSole(row) {
      const userIds = row.userId || this.ids;
      this.$modal
        .confirm('是否确认上架书籍？')
        .then(function () {
          return delUser(userIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess(this.$t("DELETE_SUCCESSFULLY"));
        })
        .catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "business/book/export",
        {
          ...this.queryParams,
        },
        `book_${new Date().getTime()}.xlsx`
      );
    },



  },
};
</script>

