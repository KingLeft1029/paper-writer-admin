<template>
  <div class="app-container">
    <img class="mb20 back" @click="back" src="@/assets/icons/back.png" alt="">
    <!--用户数据-->
    <el-form  :model="queryParams" ref="queryForm"
      :inline="true" v-show="showSearch">

      <el-form-item  prop="userName">
        <el-input v-model="queryParams.userName" :placeholder="$t('COURSE_TITLE')" clearable  style="width: 220px"
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
        <el-select v-model="queryParams.roleId" :placeholder="$t('Hot')">
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
        <el-button type="primary" icon="el-icon-search"     @click="handleQuery">{{
          $t("Search") }}</el-button>
        <el-button icon="el-icon-refresh"  @click="resetQuery">{{
          $t("Clear")
        }}</el-button>
      </el-form-item>
    </el-form>

    <div >

      <el-table v-loading="loading"   :default-sort = "{prop: 'date', order: 'descending'}" :data="userList" @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName" :header-cell-style="{ 'background-color': '#EDF4FC' }">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column :label="$t('SER_NUM')" align="center" key="userId" prop="userId" />
        <el-table-column :label="$t('COURSE_TITLE')" align="center" key="userName" prop="userName"
          :show-overflow-tooltip="true" />
        <el-table-column :label="$t('TYPE_COURSE')" align="center" key="nickName" prop="nickName"
          :show-overflow-tooltip="true" />

        <el-table-column :label="$t('Author')" align="center" key="phonenumber" prop="phonenumber" />

        <el-table-column :label="$t('Hot')" align="center" key="status">
          <template slot-scope="scope">
            {{ scope.row.status == "0" ? $t("male") : $t("female") }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('PAYMENT_TYPE')" align="center" key="deptName" prop="dept.deptName" />
        <el-table-column :label="$t('COURSE_INK_R')" align="center" key="deptName" prop="dept.deptName" />
        <el-table-column :label="$t('USE_COUPONS')" sortable align="center" key="deptName" prop="dept.deptName" />
        <el-table-column :label="$t('COUPON_INK')" sortable align="center" key="deptName" prop="dept.deptName" />
        <el-table-column :label="$t('ACTUAL_INK')"  sortable align="center" key="deptName" prop="dept.deptName" />


        <el-table-column :label="$t('REGIST_TIME')" sortable align="center" key="deptName" prop="dept.deptName" />
        <el-table-column :label="$t('COMPLETION_RATE')" sortable align="center" key="deptName" prop="dept.deptName" />
        <el-table-column :label="$t('Status')" align="center" key="status">
          <template slot-scope="scope">
            {{ scope.row.status == "0" ? $t("ENABLE") : $t("DISABLE") }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('REGIST_TIME')" sortable align="center" key="deptName" prop="dept.deptName" />

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
    back(){
      this.$router.go(-1)
    },
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
        this.title = this.$t("ADD");
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
        this.title = this.$t("EDIT");
        this.form.password = "";
      });
    },
    // 发送邮件
    handleEmail(){
      if(this.ids.length<=0){
        this.$modal.msgError(this.$t("PLEASE_CHECK"));
        return false
      }
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
  },
};
</script>
