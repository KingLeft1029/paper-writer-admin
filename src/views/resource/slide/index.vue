<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item label="" prop="name">
        <el-input v-model="queryParams.name" :placeholder="$t('SRMC')" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item prop="status">
        <el-date-picker v-model="dateRange" type="daterange" range-separator="-" :start-placeholder="$t('START_DATE')"
          :end-placeholder="$t('END_DATE')">
        </el-date-picker>
      </el-form-item>
      <el-form-item prop="createBy">
        <el-select v-model="queryParams.createBy" :placeholder="$t('CREATOR')">
          <el-option v-for="item in roleOptions" :key="item.roleId" :label="item.roleName" :value="item.roleId"
            :disabled="item.status == 1"></el-option>
        </el-select>
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

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus"  @click="handleAdd">{{ $t('Add') }}</el-button>
      </el-col>

    </el-row>

    <el-table v-loading="loading" :data="list"  >
      <el-table-column label="ID" align="center" prop="id" :show-overflow-tooltip="true" />
      <el-table-column prop="image" align="center" width="140" :label="$t('ILL_PIC')">
        <template slot-scope="scope">
          <!-- {{ scope.row.image }} -->
          <el-image style="width: 100px; height: 100px" :src="scope.row.image" :preview-src-list="scope.row.image">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column :label="$t('Name')" align="center" :show-overflow-tooltip="true" prop="name" />
      <el-table-column :label="$t('LJFS')" align="center"  width="140"  :show-overflow-tooltip="true" prop="linkMethod"
        :formatter="formatterA" />
      <el-table-column :label="$t('LJDZ')" align="center"  width="140"  :show-overflow-tooltip="true" prop="linkId" />
      <el-table-column :label="$t('Sorting')" align="center" :show-overflow-tooltip="true" prop="sort" />
      <el-table-column :label="$t('Status')" align="center" :show-overflow-tooltip="true" prop="status"
        :formatter="formatterS" />
      <el-table-column :label="$t('ZD')" align="center" :show-overflow-tooltip="true" key="isTop">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.isTop" :active-value="true" :inactive-value="false">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column :label="$t('CREATOR')" align="center"  width="140"  :show-overflow-tooltip="true" prop="createName" />
      <el-table-column :label="$t('CREATION_TIME')" align="center"  width="140"  :show-overflow-tooltip="true" prop="createTime">
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

    <!-- 添加或修改轮播图配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">

        <el-form-item :label="$t('ILL_PIC') + '：'" prop="image">
          <image-upload v-model="form.image"></image-upload>
          <span class="red">{{ $t('JYSC') }}：</span>
          <span class="red">1920 * 400</span>
        </el-form-item>
        <el-form-item :label="$t('Name') + '：'" prop="name">
          <el-input v-model="form.name" :placeholder="$t('Enter')" />
        </el-form-item>
        <el-form-item :label="$t('Status') + '：'" prop="status">
          <!-- 0 停用 1启用 -->
          <el-radio-group v-model="form.status">
            <el-radio v-for="dict in dict.type.busines_status" :label="dict.value">{{ dict.value == 0 ? $t('Dis') :
              $t('ENA') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('LJFS') + '：'" prop="linkMethod">
          <!-- 1链接 2文章 3课程 -->
          <el-radio-group v-model="form.linkMethod">
            <el-radio v-for="dict in dict.type.link_method" :label="dict.value">{{ dict.value == 1 ? $t('URL') :
              dict.value == 2 ? $t('Threads') : $t('Videos') }}</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 原文链接 -->
        <el-form-item :label="$t('YWLJ') + '：'" prop="linkId" v-if="form.linkMethod == 1">
          <el-input style="width: 350px" v-model="form.linkId" :placeholder="$t('Enter')" />
        </el-form-item>
        <!-- 文章 课程-->
        <el-form-item :label="$t('name') + '：'" prop="name" v-if="form.linkMethod == 2 || form.linkMethod == 3">
          <el-select v-model="form.name" :placeholder="$t('QXZ')">
            <el-option :label="$t('PT')" v-for="item in formList" :key="item"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item :label="$t('Remarks') + '：'">
          <el-input show-word-limit maxlength="200" v-model="form.remark" type="textarea"
            :placeholder="$t('PLEASE_INPUT')"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">{{ $t("Cancel") }}</el-button>
        <el-button type="primary" @click="submitForm">{{
          $t("Confirm")
        }}</el-button>
      </div>
    </el-dialog>
    <SortDialog ref="sort"></SortDialog>
  </div>
</template>

<script>
import ImageUpload from "@/components/UploadCommon/index.vue";
import SortDialog from './sort-dialog.vue'

import {
  listApi,
  addApi,
  delApi,
  editApi,
  exportApi,
  detailApi,
} from "@/api/slide";
export default {
  dicts: ['busines_status', 'link_method'],
  name: "RotationChart",
  components: { ImageUpload, SortDialog },

  data() {
    return {
      // 日期范围
      dateRange: [],

      // 遮罩层
      loading: true,
      // 导出遮罩层
      exportLoading: false,
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
      // 轮播图配置表格数据
      list: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: undefined,
        createBy: undefined,
        isTop: undefined,
      },
      // 表单参数
      form: {},
      formList: [],
      // 表单校验
      rules: {
        image: [
          { required: true, message: this.$t('BNWK'), trigger: "change" },
        ],
        name: [
          { required: true, message: this.$t('BNWK'), trigger: "blur" },
        ],
        status: [{ required: true, message: this.$t('BNWK'), trigger: "change" }],
      },
    };
  },

  computed: {
    baseUrl() {
      return window.g.api
    },
  },

  created() {

    this.getList();
  },

  methods: {

    /** 查询轮播图配置列表 */
    getList() {
      this.loading = true;
      listApi(this.addDateRange(this.queryParams, this.dateRange)).then((response) => {
        this.list = response.data.records;
        this.total = response.data.total;
        this.loading = false;
        this.list.forEach((item) => {
          item["image"] = [this.baseUrl + item.image];
        });
      });
    },
    //链接方式
    formatterA(row) {
      const dictObj = this.dict.type.link_method.find(i => i.value == row.linkMethod)
      if (dictObj.value == 1) {
        return this.$t('URL')
      } else if (dictObj.value == 2) {
        return this.$t('Threads')
      } else {
        return this.$t('Videos')
      }

    },
    //状态
    formatterS(row) {
      const dictObj = this.dict.type.busines_status.find(i => i.value == row.status)
      if (dictObj.value == 0) {
        return this.$t('TYZ')
      } else {
        return this.$t('QYZ')
      }

    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        image: undefined,
        name: undefined,
        status: true,
        linkMethod: undefined,
        remark: undefined,
        linkId: undefined,

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
      this.title = this.$t('Add');
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
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            editApi(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t('OPERTATE_SUCCESS'));
              this.open = false;
              this.getList();
            });
          } else {
            addApi(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t('XZCG'));
              this.open = false;
              this.getList();
            });
          }
        }
      });
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
    handleWork() {
      this.$confirm($t('QRTY'), $t('Warning'), {
        confirmButtonText: $t('Confirm'),
        cancelButtonText: $t('Cancel'),
        type: "warning",
      })
        .then(function () {
          return delRotationChart({ ids: [row.id] });
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess($t('SCCCL'));
        })
        .catch(() => { });
    },
    handleSort() {
      this.$refs.sort.open()
    }
  }
};
</script>

