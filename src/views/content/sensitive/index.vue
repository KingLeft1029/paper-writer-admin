<template>
  <div class="app-container">
    <!--用户数据-->
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item prop="userName">
        <el-input v-model="queryParams.userName" :placeholder="$t('ENTER_SEARCH_TREMS')" clearable style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item prop="nickName">
        <el-date-picker v-model="queryParams.pickerVal" type="date" :placeholder="$t('CREATION_TIME')">
        </el-date-picker>
      </el-form-item>


      <el-form-item prop="roleId">
        <el-select v-model="queryParams.roleId" :placeholder="$t('CREATOR')">
          <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"
            :disabled="item.status == 1"></el-option>
        </el-select>
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

        <el-col :span="1.5">
          <el-button type="primary" plain icon="el-icon-plus" @click="handleAdd">{{ $t("Add") }}
          </el-button>
        </el-col>

      </el-row>

      <el-table v-loading="loading" :default-sort="{ prop: 'date', order: 'descending' }" :data="list"
        :header-cell-style="{ 'background-color': '#EDF4FC' }">

        <el-table-column :label="$t('ID')" align="center" key="id" prop="id" />
        <el-table-column :label="$t('SEN_WORD')" align="center"  prop="word"
          :show-overflow-tooltip="true" />
          <el-table-column :label="$t('CREATION_TIME')" align="center"  width="140"  :show-overflow-tooltip="true" prop="createTime">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
        <el-table-column :label="$t('Operators')" align="center"  prop="CREATOR" />
        <el-table-column :label="$t('Status')" align="center">
          <template slot-scope="scope">
            {{ scope.row.status == "0" ? $t("Disabled") : $t("Enabled") }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('Operate')" align="center" fixed="right" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="text" @click="handleUpdate(scope.row)">{{ $t("Edit") }}
            </el-button>
            <el-button type="text" @click="handleDelete(scope.row)"  v-if="scope.row.status==0">{{ $t("ENA") }}</el-button>
            <el-button type="text" style="color: #fe3838" @click="handleDelete(scope.row)" v-else>{{ $t("Dis") }}</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body :close-on-click-modal="false">
      <div class="dialog-box">
        <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="130px">
          <el-form-item :label="$t('SEN_WORD') + '：'" prop="word">
            <el-input v-model="form.word" :placeholder="$t('shit')" type="textarea" :rows="10" maxlength="200"
              show-word-limit />
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
  </div>
</template>

<script>
import {
  listApi,
  addApi,
  editApi,
  detailApi
} from "@/api/sensitive";


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
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
        nickName: undefined,
        roleId: undefined,
        pickerVal: undefined
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
        word: [
          {
            required: true,
            message: this.$t("BNWK"),
            trigger: "blur",
          },
        ],
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
      word:''
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

    /** 新增按钮操作 */
    handleAdd() {

      this.reset();


      this.open = true;
      this.title = this.$t("Add");


    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id;
      detailApi(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t("Edit");

      });
    },

    /** 提交按钮 */
    submitForm: function () {

      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            editApi({word:this.form.word,id:this.form.id}).then((response) => {
              this.$modal.msgSuccess(this.$t("OPERTATE_SUCCESS"));
              this.open = false;
              this.getList();
            });
          } else {
            addApi({ words: this.form.word.split('\n')}).then((response) => {
              this.$modal.msgSuccess(this.$t("XZCG"));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const userIds = row.id || this.ids;
      this.$modal
        .confirm('是否确定启用敏感词？')
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

  },
};
</script>

