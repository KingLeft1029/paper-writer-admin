<template>
  <div class="app-container">
    <!--用户数据-->
    <el-form  :model="queryParams" ref="queryForm"
      :inline="true" v-show="showSearch">
      <el-form-item  prop="userName">
        <el-input v-model="queryParams.userName"  :placeholder="$t('UserID')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item  prop="nickName">
        <el-input v-model="queryParams.nickName" :placeholder="$t('Nickname')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item  prop="phonenumber">
        <el-input v-model="queryParams.phonenumber" :placeholder="$t('Email')" clearable
          style="width: 220px" @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item prop="roleId">
        <el-select v-model="queryParams.roleId" :placeholder="$t('FULL_USER_INDENTIFY')">
          <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"
            :disabled="item.status == 1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-select v-model="queryParams.status" :placeholder="$t('Status')" clearable  style="width: 220px">
          <el-option :label="$t('ALL_DISABLED')" value="0" />
          <el-option :label="$t('ALL_ENABLED')" value="1" />
          <el-option :label="$t('ARTICLE_DISAVLED')" value="2" />
          <el-option :label="$t('COURSE_DISABLED')" value="3" />
          <el-option :label="$t('PERMISSIONDISABLING')" value="4" />
        </el-select>
      </el-form-item>
      <el-form-item prop="status">
        <el-date-picker v-model="pickerVal" type="daterange" range-separator="-" :start-placeholder="$t('START_DATE')"
          :end-placeholder="$t('END_DATE')">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search"     @click="handleQuery">{{
          $t("Search") }}</el-button>
        <el-button icon="el-icon-refresh"  @click="resetQuery">{{
          $t("Clear")
        }}</el-button>
      </el-form-item>
    </el-form>

    <div  >
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button type="primary" plain icon="el-icon-plus"  @click="handleAdd">{{ $t("Add") }}
          </el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="warning" plain icon="iconfont icon-daochu"  @click="handleExport">{{ $t("Export")
          }}</el-button>
        </el-col>
        <el-col :span="1.5">
          <el-button type="primary" plain  icon="el-icon-s-promotion" @click="handleEmail">{{ $t("SEND_MAIL") }}</el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading"   :default-sort = "{prop: 'date', order: 'descending'}" :data="userList" @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName" :header-cell-style="{ 'background-color': '#EDF4FC' }">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column :label="$t('SER_NUM')" width="50" align="center"  prop="userId" />
        <el-table-column :label="$t('UserID')" width="100" align="center" show-overflow-tooltip="true" prop="userName"
          :show-overflow-tooltip="true" />
        <el-table-column :label="$t('Nickname')" width="100" align="center"  show-overflow-tooltip="true" prop="nickName"
          :show-overflow-tooltip="true" />

        <el-table-column :label="$t('Email')" width="100" align="center"  show-overflow-tooltip="true" prop="phonenumber" />

        <el-table-column :label="$t('Gender')" width="100" align="center" >
          <template slot-scope="scope">
            {{ scope.row.status == "0" ? $t("male") : $t("female") }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('Country')" align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('Birthday')" align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('Age')" align="center" width="100" prop="dept.deptName" />
        <el-table-column :label="$t('IDENTIFY')" align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('Ink')" sortable align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('REVENUE_INK')" sortable align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('COMPLETION_RATE')" sortable align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('LOGON_MODE')" align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('DATE_OF_CERTIFICATION')"  sortable align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('REGISTRATIOB_DATE')" sortable align="center" width="100"  show-overflow-tooltip="true" prop="dept.deptName" />
        <el-table-column :label="$t('Status')" align="center" key="status">
          <template slot-scope="scope">
            {{ scope.row.status == "0" ? $t("ENABLE") : $t("DISABLE") }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('Operate')" align="center" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="scope" >
            <el-button  type="text"
              @click="handleDetail(scope.row)">{{ $t("USER_DETAILS") }}
            </el-button>
            <el-button  type="text"
              @click="handlemanage(scope.row)">{{ $t("USER_MANAGEMENT") }}</el-button>

          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <div class="dialog-box">
        <span class="red">{{ $t('NEWLY') }}</span>
        <el-form class="mt25" label-position="right" ref="form" :model="form" :rules="rules" label-width="120px">

          <el-form-item v-if="form.userId == undefined" :label="$t('Email')" prop="userName">
              <el-input v-model="form.userName" :placeholder="$t('Email')" maxlength="30" />
            </el-form-item>
            <el-form-item v-if="form.userId == undefined" :label="$t('Password')" prop="password">
              <el-input v-model="form.password" :placeholder="$t('Enter')" type="password" maxlength="20"
                show-password />
            </el-form-item>
      </el-form>
      </div>
      <div slot="footer" class="dialog-footer">

        <el-button @click="cancel">{{ $t("Cancel") }}</el-button>
        <el-button type="primary" @click="submitForm">{{
          $t("Confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <ManageDialg ref="manage"> </ManageDialg>
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

import ManageDialg from "./manage-dialog.vue"
export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: { Treeselect ,ManageDialg},
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.userId);
      this.single = selection.length != 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      getUser().then((response) => {
        this.postOptions = response.posts;
        // this.roleOptions = response.roles;
        this.open = true;
        this.title = this.$t("Add");
        this.form.password = this.initPassword;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const userId = row.userId || this.ids;
      getUser(userId).then((response) => {
        this.form = response.data;
        this.postOptions = response.posts;
        // this.roleOptions = response.roles;
        this.form.status = response.data.status;
        this.form.postIds = response.postIds;
        this.form.roleIds = response.roleIds;
        this.open = true;
        this.title = this.$t("Edit");
        this.form.password = "";
      });
    },
    // 发送邮件
    handleEmail(){
      if(this.ids.length<=0){
        this.$modal.msgError(this.$t("PLEASE_CHECK"));
        return false
      }
      this.$router.push({path:'/user/send',params:{}})
      this.$modal.msgSuccess(this.$t("OPERTATE_SUCCESS"));

    },
    /** 重置密码按钮操作 */
    handleResetPwd(row) {
      this.$prompt(this.$t("PLEASE_INPUT_NEW_PASSWORD"), this.$t("HINT"), {
        confirmButtonText: this.$t("Confirm"),
        cancelButtonText: this.$t("Cancel"),
        closeOnClickModal: false,
        inputPattern: /^.{5,20}$/,
        inputErrorMessage: this.$t("PASSWORD_LENGTH"),
      })
        .then(({ value }) => {
          resetUserPwd(row.userId, value).then((response) => {
            this.$modal.msgSuccess(
              `${this.$t("UPDATED_SUCCESS")} ${this.$t(
                "NEW_PASSWORD"
              )}：${value}`
            );
          });
        })
        .catch(() => { });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t("UPDATED_SUCCESS"));
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t("ADD_SUCCESS"));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.userId || this.ids;
      this.$modal
        .confirm('是否确认删除用户编号为"' + userIds + '"的数据项？')
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
        "system/user/export",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },

    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    },
    getRoleKyList() {
      listRole().then((res) => {
        let { code, rows } = res;
        if (code === 200) {
          let roleArr = rows.filter((item) => {
            if (
              (item.roleKey !== null && item.roleName !== null) ||
              (item.roleKey !== undefined && item.roleName !== undefined)
            ) {
              return item;
            }
          });
          let newArr = roleArr
            .reduce(function (tempArr, item) {
              if (
                tempArr.findIndex((ele) => ele.roleKey === item.roleKey) === -1
              ) {
                tempArr.push(item);
              }
              return tempArr;
            }, [])
            .map((item) => item);
          this.roleOptions = newArr;
        }
      });
    },
    // 用户详情
    handleDetail(){
      this.$router.push({path:'/user/checkuser',query:{id:1}})
    },
    handlemanage(){
      this.$refs.manage.open()
    }
  },
};
</script>

