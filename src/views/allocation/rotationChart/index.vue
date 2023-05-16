<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item label="轮播名称" prop="title">
        <el-input v-model="queryParams.title" placeholder="请输入轮播名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button plain size="mini" @click="batchDelet">批量删除</el-button>
      </el-col>
    </el-row>

    <el-table v-loading="loading" :data="rotationChartList" :row-key="rowKey" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" reserve-selection />
      <el-table-column prop="picUrl" align="center" label="轮播图">
        <template slot-scope="scope">
          <el-image style="width: 100px; height: 100px" :src="baseUrl + scope.row.picUrl"
            :preview-src-list="scope.row.srcList">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="轮播名称" align="center" prop="title" />
      <el-table-column label="排序" align="center" prop="sort" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改轮播图配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-form-item label="轮播名称" prop="title">
          <el-input style="width: 350px" v-model="form.title" placeholder="请输入轮播名称" />
        </el-form-item>
        <el-form-item label="轮播图片" prop="picUrl">
          <image-upload v-model="form.picUrl"></image-upload>
          <span style="color:red;">尺寸建议</span>
          <span style="color:red;">1200 * 380</span>
        </el-form-item>

        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="form.sort" :min="0" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ImageUpload from "@/components/UploadCommon/index.vue";

import {
  listRotationChart,
  getRotationChart,
  delRotationChart,
  addRotationChart,
  updateRotationChart,
  exportRotationChart,
} from "@/api/allocation/rotationChart";
export default {
  name: "RotationChart",
  components: { ImageUpload },

  data () {
    return {
      //跨页多选key
      rowKey: "retationId",
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
      rotationChartList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        title: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // title: [
        //   { required: true, message: "轮播名称不能为空", trigger: "change" },
        // ],
        picUrl: [
          { required: true, message: "轮播图片不能为空", trigger: "change" },
        ],
        sort: [{ required: true, message: "排序不能为空", trigger: "change" }],
      },
    };
  },

  computed: {
    baseUrl () {
      return process.env.VUE_APP_BASE_API;
    },
  },

  created () {
    this.getList();
  },

  methods: {
    batchDelet () {
      if (!this.ids.length) {
        this.$message.warning("请选择需要批量删除的数据");
        return;
      }
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          return delRotationChart({ ids: this.ids });
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => { });
    },
    /** 查询轮播图配置列表 */
    getList () {
      this.loading = true;
      listRotationChart(this.queryParams).then((response) => {
        this.rotationChartList = response.data.records;
        this.total = response.data.total;
        this.loading = false;
        this.rotationChartList.forEach((item) => {
          item["srcList"] = [this.baseUrl + item.picUrl];
        });
      });
    },
    // 取消按钮
    cancel () {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset () {
      this.form = {
        retationId: undefined,
        title: undefined,
        picUrl: undefined,
        sort: undefined,
        createTime: undefined,
        updateTime: undefined,
        createName: undefined,
        updateName: undefined,
        delFlag: undefined,
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery () {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery () {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map((item) => item.retationId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加轮播图配置";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const retationId = row.retationId || this.ids;
      getRotationChart(retationId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改轮播图配置";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.retationId != null) {
            updateRotationChart(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRotationChart(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete (row) {
      this.$confirm("是否确认删除?", "警告", {
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
  }
};
</script>

