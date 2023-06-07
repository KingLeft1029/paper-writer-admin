<template>
  <div class="app-container">
    <!--用户数据-->
    <el-form  :model="queryParams" ref="queryForm"
      :inline="true" v-show="showSearch">
      <el-form-item  prop="userName">
        <el-input v-model="queryParams.userName" :placeholder="$t('Title')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item  prop="nickName">
        <el-input v-model="queryParams.nickName" :placeholder="$t('Tags')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item  prop="phonenumber">
        <el-input v-model="queryParams.phonenumber" :placeholder="$t('Author')" clearable
          style="width: 220px" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item prop="roleId">
        <el-select v-model="queryParams.roleId" :placeholder="$t('Status')">
          <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"
            :disabled="item.status == 1"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item prop="status">
        <el-date-picker v-model="pickerVal" type="daterange" range-separator="-" :start-placeholder="$t('START_DATE')"
          :end-placeholder="$t('END_DATE')">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search"  @click="handleQuery">{{
          $t("Search") }}</el-button>
        <el-button icon="el-icon-refresh"  @click="resetQuery">{{
          $t("Clear")
        }}</el-button>
      </el-form-item>
    </el-form>

    <div  >
      <el-row :gutter="10" class="mb8" >
        <el-col :span="1.5"  class="mt5">
          {{ $t('Total') }}2{{$t('data')}}
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="iconfont icon-daochu"  @click="handleExport">{{ $t("Export")
          }}</el-button>
        </el-col>

      </el-row>

      <el-table v-loading="loading"   :default-sort = "{prop: 'date', order: 'descending'}" :data="userList" @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName" :header-cell-style="{ 'background-color': '#EDF4FC' }">

        <el-table-column :label="$t('SER_NUM')" width="50" align="center" key="userId" prop="userId" />
        <el-table-column :label="$t('ARTICLE_ID')" align="center" key="userName" prop="userName"
          :show-overflow-tooltip="true" />
        <el-table-column :label="$t('Title')" align="center" show-overflow-tooltip="true" prop="nickName"
          :show-overflow-tooltip="true" />

        <el-table-column :label="$t('Cover')" align="center" show-overflow-tooltip="true"  prop="phonenumber" />
        <el-table-column :label="$t('Tags')" align="center" show-overflow-tooltip="true"  prop="phonenumber" />
        <el-table-column :label="$t('Author')" align="center" show-overflow-tooltip="true"  prop="phonenumber" />
        <el-table-column :label="$t('Newest')" width="100" show-overflow-tooltip="true" sortable align="center"  prop="phonenumber" />
        <el-table-column :label="$t('Status')" align="center"  show-overflow-tooltip="true">
          <template slot-scope="scope">
            {{ scope.row.status == "0" ? $t("ENABLE") : $t("DISABLE") }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('Operate')" align="center" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="scope" >
            <el-button  type="text"  icon="el-icon-view"
              @click="handleCheck(scope.row)">{{ $t("View") }}
            </el-button>
            <el-button  type="text" icon="el-icon-edit-outline"
              @click="handleAudit(scope.row)">{{ $t("Review") }}</el-button>

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
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  resetUserPwd,
  changeUserStatus,
} from "@/api/system/user";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { listRole } from "@/api/system/role";
export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: { Treeselect },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      postOptions: [],
      // 角色选项
      roleOptions: [],
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label",
      },
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

      // 表单校验
      rules: {
        status: [
          {
            required: true,
            message: this.$t("PLEASE_SELECT_WHETHER"),
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: this.$t("ACCOUNT_CANNOT"),
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: this.$t("ACCOUNT_LENGTH"),
            trigger: "blur",
          },
        ],
        deptId: [
          {
            required: true,
            message: this.$t("PLEASE_SELECT_ROLE"),
            trigger: "blur",
          },
        ],
        nickName: [
          {
            required: true,
            message: this.$t("USER_NAME_CANNOT"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: this.$t("PASSWORD_CANNOT"),
            trigger: "blur",
          },
          {
            min: 5,
            max: 20,
            message: this.$t("PASSWORD_LENGTH"),
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            message: this.$t("PLEASE_INPUT_EMAIL_ADDRESS"),
            trigger: ["blur", "change"],
          },
        ],
        phonenumber: [
          {
            required: true,
            message: this.$t("PHONE_NUMBER_CANNOT"),
            trigger: "blur",
          },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: this.$t("PLEASE_INPUT_CORRECT_PHONE"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    this.getList();
    this.getRoleKyList();
    getUser().then((response) => {
      this.postOptions = response.postName;
      // this.roleOptions = response.postSort;
      this.form.password = this.initPassword;
    });
    //this.getConfigKey("sys.user.initPassword").then((response) => {
    //  this.initPassword = response.msg;
    //});
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2) {
        return "warning-row";
      } else {
        return "";
      }
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.userList = response.rows;
          this.total = response.total;
          // let roleArr = this.userList.filter(item => {
          //   if (item.dept !== null) {
          //     return item
          //   }
          // })

          // const newArr = roleArr.reduce(function (tempArr, item) {
          //   if (tempArr.findIndex((ele) => ele.deptId === item.deptId) === -1) {
          //     tempArr.push(item)
          //   }
          //   return tempArr

          // }, []).map(item => {
          //   return {

          //     ...item
          //   }
          // })
          // this.roleOptions = newArr
          this.loading = false;
        }
      );
    },

    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.getList();
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


    handleCheck(){
this.$router.push({path:'/content/checkarticle',query:{id:1}})
    },
    handleAudit(){
      this.$router.push({path:'/content/auditarticle',query:{id:1}})
},
  },
};
</script>

