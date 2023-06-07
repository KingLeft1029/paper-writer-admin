<template>
  <div class="app-container">
    <!--用户数据-->
    <el-form style="margin-bottom: 20px; border-radius: 5px" :model="queryParams" ref="queryForm" :inline="true"
      v-show="showSearch">
      <el-form-item prop="userName">
        <el-input v-model="queryParams.userName" :placeholder="$t('SRMC')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item prop="status">
        <el-date-picker v-model="queryParams.date" type="daterange" range-separator="-"
          :start-placeholder="$t('START_DATE')" :end-placeholder="$t('END_DATE')">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="nickName">
        <el-input v-model="queryParams.nickName" :placeholder="$t('CREATOR')" clearable  style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>



      <el-form-item prop="roleId">
        <el-select v-model="queryParams.roleId" :placeholder="$t('ZDZT')">
          <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"
            :disabled="item.status == 1"></el-option>
        </el-select>
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
        <el-col :span="1.5">
          <el-button type="primary" plain icon="el-icon-plus"  @click="handleAdd">{{ $t("ADD") }}
          </el-button>
        </el-col>
      </el-row>

      <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName" :header-cell-style="{ 'background-color': '#EDF4FC' }">
        <el-table-column type="selection" width="50" align="center" />

        <el-table-column :label="$t('ID')" align="center" key="userName" prop="userName" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('RMTIMC')" align="center" key="nickName" prop="nickName"
          :show-overflow-tooltip="true" />

        <el-table-column :label="$t('TJLX')" align="center" key="phonenumber" prop="phonenumber" />
        <el-table-column :label="$t('Name')" align="center" key="deptName" prop="dept.deptName" />
        <el-table-column :label="$t('Sorting')" align="center" key="deptName" prop="dept.deptName" width="120" />
        <el-table-column :label="$t('Status')" align="center" key="deptName" prop="dept.deptName" width="120" />
        <el-table-column :label="$t('ZD')" align="center" key="status">
          <template slot-scope="scope">
            <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949" active-value="100"
              inactive-value="0">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CREATOR')" align="center" key="deptName" prop="dept.deptName" width="120" />
        <el-table-column :label="$t('CREATION_TIME')" align="center" key="deptName" prop="dept.deptName" width="120" />
        <el-table-column :label="$t('Operate')" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope" v-if="scope.row.userId !== 1">
            <el-button type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{
              $t("EDIT") }}
            </el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">{{
              $t("DELETE") }}</el-button>
            <el-button type="text" icon="el-icon-key" @click="handleWork(scope.row)">{{ $t("ENA")
            }}</el-button>
                        <el-button type="text" icon="el-icon-key" @click="handleWork(scope.row)">{{ $t("Dis")
            }}</el-button>
            <el-button type="text" icon="el-icon-key" @click="handleSort(scope.row)">{{ $t("Sorting")
            }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row>
          <el-col :span="18">
            <el-form-item v-if="form.userId == undefined" :label="$t('Name')" prop="userName">
              <el-input v-model="form.userName" :placeholder="$t('Enter')" maxlength="30" />
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item :label="$t('Status')" prop="nickName">
              <el-radio-group v-model="radio">
                <el-radio :label="3">{{ $t('ENA') }}</el-radio>
                <el-radio :label="6">{{ $t('Dis') }}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item prop="roleId" :label="$t('TJLX')">
              <el-radio-group v-model="radio">
    <el-radio :label="3">{{ $t('Threads') }}</el-radio>
    <el-radio :label="6">{{ $t('Videos') }}</el-radio>
  </el-radio-group>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item :label="$t('Remarks')">
              <el-input  show-word-limit   maxlength="200" v-model="form.remark" type="textarea" :placeholder="$t('PLEASE_INPUT')"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">{{
          $t("Confirm")
        }}</el-button>
        <el-button @click="cancel">{{ $t("Cancel") }}</el-button>
      </div>
    </el-dialog>
    <SortDialog ref="sort"></SortDialog>
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
import SortDialog from '../slide/sort-dialog.vue'
export default {
  name: "User",
  dicts: ["sys_normal_disable", "sys_user_sex"],
  components: { Treeselect, SortDialog },
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
    handleWork() {
      this.$confirm("是否确定停用数据？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delRotationChart({ ids: [row.retationId] });
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => { });
    },
    handleSort() {
      this.$refs.sort.open()
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
<style lang="scss" scoped>
::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td {
  border-top: 1px solid #9bcbfc;
  border-bottom: 1px solid #9bcbfc;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td:nth-child(1) {
  border-left: 1px solid #9bcbfc;
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover>td:last-child {
  border-right: 1px solid #9bcbfc;
  border-bottom: 1px solid #9bcbfc;
}
</style>
<style lang="scss" >
::v-deep .el-form-item__content {
  width: 234px;
}

.el-pager li.active {
  background: #3880fe !important;
}

.el-table .warning-row {
  background: #f4fbff !important;
}

::v-deep .vue-treeselect__control {
  width: 234px;
}

::v-deep .el-textarea {
  width: 715px;
}
</style>
