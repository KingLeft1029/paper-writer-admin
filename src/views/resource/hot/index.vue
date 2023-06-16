<template>
  <div class="app-container">
    <!--用户数据-->
    <el-form style="margin-bottom: 20px; border-radius: 5px" :model="queryParams" ref="queryForm" :inline="true"
      v-show="showSearch">
      <el-form-item prop="name">
        <el-input v-model="queryParams.name" :placeholder="$t('SRMC')" clearable style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item prop="status">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="-"
          :start-placeholder="$t('START_DATE')" :end-placeholder="$t('END_DATE')">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="createBy">
        <el-input v-model="queryParams.createBy" :placeholder="$t('CREATOR')" clearable style="width: 220px"
          @keyup.enter.native="handleQuery" />
      </el-form-item>



      <el-form-item prop="isTop">
        <el-select v-model="queryParams.isTop" :placeholder="$t('ZDZT')">
          <el-option :label="$t('PT')" :value="false"></el-option>
          <el-option :label="$t('ZD')" :value="true"></el-option>
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

      <el-table v-loading="loading" :data="list" :header-cell-style="{ 'background-color': '#EDF4FC' }">
        <el-table-column :label="$t('ID')" align="center" prop="id" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('RMTIMC')" align="center" prop="name"  width="220" :show-overflow-tooltip="true" />

        <el-table-column :label="$t('TJLX')" align="center"  width="220" :show-overflow-tooltip="true" prop="type"
          :formatter="formatterA" />
        <el-table-column :label="$t('Name')" align="center" :show-overflow-tooltip="true" prop="name" />
        <el-table-column :label="$t('Sorting')" align="center" :show-overflow-tooltip="true" prop="sort" />
        <el-table-column :label="$t('Status')" align="center" :show-overflow-tooltip="true" prop="status"
          :formatter="formatterS" />
        <el-table-column :label="$t('ZD')" align="center" :show-overflow-tooltip="true" key="isTop">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.isTop" :active-value="true" :inactive-value="false">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column :label="$t('CREATOR')" align="center" width="140" :show-overflow-tooltip="true"
          prop="createName" />
        <el-table-column :label="$t('CREATION_TIME')" align="center" width="140" :show-overflow-tooltip="true"
          prop="createTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Operate')" label="操作" width="280" align="center"
        class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  type="text"  @click="handleUpdate(scope.row)">{{ $t('Edit')
          }}</el-button>
          <el-button  type="text"  @click="handleDelete(scope.row)">{{ $t('Delete')
          }}</el-button>
          <el-button v-if="scope.row.status==0"  type="text"  @click="handleWork(scope.row)">{{ $t('ENA')
          }}</el-button>
          <el-button v-if="scope.row.status==1"  type="text"  @click="handleSort(scope.row)">{{ $t('Dis')
          }}</el-button>
          <el-button  type="text"  @click="handleSort(scope.row)">{{ $t('Sorting')
          }}</el-button>
        </template>
      </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
        @pagination="getList" />
    </div>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="900px" append-to-body>
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item :label="$t('Name') + '：'" prop="name">
          <el-input v-model="form.name" :placeholder="$t('Enter')" style="width:320px" maxlength="30" />
        </el-form-item>
        <el-form-item :label="$t('Status') + '：'" prop="status">
          <!-- 0 停用 1启用 -->
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.busines_status" :label="dict.value">{{ dict.value == 0 ? $t('Dis') :
              $t('ENA') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('TJLX') + '：'">
          <!-- 推荐类型 -->
          <el-radio-group v-model="form.type">
            <el-radio v-for="dict in dict.type.recommended_type" :label="dict.value">{{ dict.value == 1 ? $t('Threads') :
              $t('Videos') }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('name') + '：'" prop="name" v-if="form.type == 1 || form.type == 2">
          <!-- <el-select v-model="form.name" :placeholder="$t('QXZ')">
            <el-option :label="$t('PT')" v-for="item in formList" :key="item"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item :label="$t('Remarks') + '：'">
          <el-input show-word-limit maxlength="200" v-model="form.remark" type="textarea"
            :placeholder="$t('PLEASE_INPUT')"></el-input>
        </el-form-item>
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
  listApi,
  addApi,
  delApi,
  editApi,
  exportApi,
  detailApi,
} from "@/api/hot";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { listRole } from "@/api/system/role";
import SortDialog from '../slide/sort-dialog.vue'
export default {
  name: "User",
  dicts: ["busines_status", "recommended_type"],
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
      list: null,
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
        name: undefined,
        createBy: undefined,
        isTop: undefined,
      },
      // 日期范围
      dateRange: [],
      // 表单校验
      rules: {
        name: [
          {
            required: true,
            message: this.$t("BNWK"),
            trigger: "blur",
          },
        ],
        status: [
          {
            required: true,
            message: this.$t("BNWK"),
            trigger: "change",
          },

        ],

      },
    };
  },

  created() {
    this.getList();

  },
  methods: {
    //状态
    formatterS(row) {
      const dictObj = this.dict.type.busines_status.find(i => i.value == row.status)
      if (dictObj.value == 0) {
        return this.$t('TYZ')
      } else {
        return this.$t('QYZ')
      }


    },
    //推荐
    formatterA(row) {
      const dictObj = this.dict.type.recommended_type.find(i => i.value == row.type)
      if (dictObj.value == 1) {
        return this.$t('Threads')
      } else {
        return this.$t('Videos')
      }

    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listApi(this.addDateRange(this.queryParams, this.dateRange)).then(
        (response) => {
          this.list = response.data.records;
          console.log(this.list,"cccccccccc")
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
        name: undefined,
        status: undefined,
        type: undefined,
        remark: undefined,
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
      const id = row.id
      detailApi(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = this.$t('Edit');
      });
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != undefined) {
            editApi(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t("OPERTATE_SUCCESS"));
              this.open = false;
              this.getList();
            });
          } else {
            addApi(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t("XZCG"));
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
      this.$confirm($t('QRSCM'), $t('Warning'), {
        confirmButtonText: $t('Confirm'),
        cancelButtonText: $t('Cancel'),
        type: "warning",
      })
        .then(function () {
          return delApi(row.id);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess($t('OPERTATE_SUCCESS'));
        })
        .catch(() => { });
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
