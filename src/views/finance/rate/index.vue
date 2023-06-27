<template>
  <div class="app-container">
    <!--用户数据-->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item prop="userName">
        <el-input v-model="queryParams.userName" :placeholder="$t('Operators')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item prop="roleId">
        <el-select v-model="queryParams.roleId" :placeholder="$t('Operators')" >
          <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"
            :disabled="item.status == 1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="status">
        <el-date-picker  v-model="pickerVal" type="daterange" range-separator="-"
          :start-placeholder="$t('START_DATE')" :end-placeholder="$t('END_DATE')">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search"   @click="handleQuery">{{
          $t("Search") }}</el-button>
        <el-button icon="el-icon-refresh"  @click="resetQuery">{{
          $t("Clear")
        }}</el-button>
      </el-form-item>
    </el-form>

    <div>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5" >
          <el-button @click="add(1)"> <i class="el-icon-plus"></i> {{ $t('CONFIG_A') }}</el-button>
        </el-col>
        <el-col :span="1.5" >
          <el-button @click="add(2)"><i class="el-icon-plus"></i> {{ $t('CONFIG_C') }}</el-button>
        </el-col>

      </el-row>

      <el-table v-loading="loading" :default-sort="{ prop: 'date', order: 'descending' }" :data="list"

        :header-cell-style="{ 'background-color': '#EDF4FC' }">

        <el-table-column :label="$t('CONFIG_P')" align="center"  prop="proportion" />

        <el-table-column :label="$t('SHARE_TYPE')" align="center"  prop="type"  :formatter="formatter" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('Operators')" align="center"  prop="phonenumber" />
        <el-table-column :label="$t('Status')" align="center"  prop="phonenumber" />
        <el-table-column :label="$t('EX_TIME')" sortable align="center"  prop="phonenumber" />
        <el-table-column :label="$t('EFF_TIME')" sortable align="center"  prop="phonenumber" />
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>
    <addDialog ref="rate" getList="getList"></addDialog>
  </div>
</template>

<script>
import {
  listApi
} from "@/api/finace";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import addDialog from "./add-dialog.vue"
export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: { Treeselect, addDialog },
  data() {
    return {
      // 遮罩层
      loading: true,

      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,

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
    formatter(row){
     let val=''
     if(row.type==1){
      val=this.$t('Threads')
     }else{
      val=this.$t('Videos')
     }
     return val
    },
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
    add(num) {
      console.log("11111")
      this.$refs.rate.open(num)

    }




  },
};
</script>

