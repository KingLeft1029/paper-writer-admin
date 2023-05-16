<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item label="机构名称" prop="companyName">
        <el-input v-model="queryParams.companyName" placeholder="请输入机构名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="邀请码" prop="code">
        <el-input v-model="queryParams.code" placeholder="请输入邀请码" clearable size="small"
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
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="questionManagerList" :row-key="rowKey"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" reserve-selection />
      <el-table-column label="机构名称" show-overflow-tooltip align="center" prop="companyName" />
      <el-table-column label="邀请码" show-overflow-tooltip align="center" prop="code" />
      <el-table-column label="可用次数" show-overflow-tooltip align="center" prop="effectiveNum" />
      <el-table-column label="已用次数" show-overflow-tooltip align="center" prop="usedNum" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button size="mini" type="text" icon="el-icon-view" @click="handleRead(scope.row)">查看详情</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改常见问题对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body v-if="open">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-row :gutter="10">

          <el-col :span="12">
            <el-form-item label="机构名称" prop="companyName" :hide-required-asterisk="isShow">
              <el-input v-model="form.companyName" placeholder="请输入机构名称" :disabled="isShow" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="邀请码可用次数" prop="effectiveNum">
              <el-input-number v-model="form.effectiveNum" :min="0" :disabled="isShow" :max="100"></el-input-number> 次
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="!isShow">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listInvitationCode,
  getInvitationCode,
  delInvitationCode,
  addInvitationCode,
  updateInvitationCode,
  exportInvitationCode,
} from "@/api/allocation/invitationCode";

function getText (str) {
  return str.replace(/<[^<>]+>/g, "").replace(/&nbsp;/gi, "");
}
export default {
  name: "QuestionManager",
  data () {
    return {
      //跨页多选key
      rowKey: "codeId",
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
      // 常见问题表格数据
      questionManagerList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyName: undefined,
        code: undefined,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyName: [
          { required: true, message: "机构名称不能为空", trigger: "change" },
        ],
        effectiveNum: [
          { required: true, message: "邀请码可用次数不能为空", trigger: "change" },
        ],
      },
      // 查看详情
      isShow: false,
    };
  },
  created () {
    this.getList();
  },
  methods: {
    /** 查询常见问题列表 */
    getList () {
      this.loading = true;
      listInvitationCode(this.queryParams).then((response) => {
        this.questionManagerList = response.data.records;
        //this.questionManagerList.forEach((item) => item.answer = getText(item.answer));
        this.total = response.data.total;
        this.loading = false;
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
        codeId: undefined,
        companyName: undefined,
        answer: undefined,
        createTime: undefined,
        updateTime: undefined,
        createName: undefined,
        updateName: undefined,
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
      this.ids = selection.map((item) => item.codeId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加";
      this.isShow = false;
    },
    /** 查看详情按钮操作 */
    handleRead (row) {
      this.reset();
      this.isShow = true;
      const codeId = row.codeId || this.ids;
      getInvitationCode(codeId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "查看详情";
      });
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      this.$set(this, 'isShow', false)
      const codeId = row.codeId || this.ids;
      getInvitationCode(codeId).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改";
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.codeId != null) {
            updateInvitationCode(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInvitationCode(this.form).then((response) => {
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
      const questionIds = row.codeId || this.ids;
      this.$confirm("是否确认删除?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(function () {
          return delInvitationCode(questionIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport () {
      const queryParams = this.queryParams;
      this.$confirm("是否确认导出所有常见问题数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportLoading = true;
          return exportInvitationCode(queryParams);
        })
        .then((response) => {
          this.download(response.msg);
          this.exportLoading = false;
        })
        .catch(() => { });
    },
  },
};
</script>

