<!--商品编码-->
<template>
  <div class="app-container">
    <!--搜索框-->
    <el-form
      ref="queryForm"
      :inline="true"
      :model="queryParams"
    >
      <el-form-item label="编码名称">
        <el-input
          v-model="queryParams.codeName"
          clearable
          placeholder="请输入编码名称"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="代码">
        <el-input
          v-model="queryParams.codeValue"
          clearable
          placeholder="请输入代码"
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="级别">
        <el-select
          v-model="queryParams.codeLevel"
          clearable
          placeholder="请选择级别"
          style="width: 220px;"
        >
          <el-option
            v-for="item in queryLevelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="是否显示" prop="showFlag">
        <el-select
          v-model="queryParams.showFlag"
          clearable
          placeholder="请选择是否显示"
          style="width: 220px;"
        >
          <el-option
            v-for="item in isShowOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button
          icon="el-icon-search"
          size="mini"
          type="primary"
          @click="handleQuery">
          搜索
        </el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <!--操作按钮-->
    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          icon="el-icon-plus"
          plain
          size="mini"
          type="primary"
          @click="handleAdd"
        >
          添加
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          icon="el-icon-delete"
          plain
          size="mini"
          type="primary"
          :disabled="ids.length === 0"
          @click="batchDelete"
        >
          批量删除
        </el-button>
      </el-col>
    </el-row>
    <!--数据表格-->
    <el-table
      ref="content"
      v-loading="loading"
      :data="lists"
      :row-key="rowKey"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        align="center"
        reserve-selection
        type="selection"
        width="55"
      />
      <el-table-column align="left" label="编码名称" prop="codeName" />
      <el-table-column align="center" label="代码" prop="codeValue" />
      <el-table-column align="center" label="级别" prop="codeLevel">
        <template slot-scope="scope">
          {{ numberToChinese(scope.row.codeLevel || "1") }}级分类
        </template>
      </el-table-column>
      <el-table-column align="center" label="是否展示" prop="showFlag">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.showFlag"
            active-value="1"
            inactive-value="0"
            @change="(f) => handleIsShow(f, scope.row, '展示', 'showFlag')"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        class-name="small-padding fixed-width"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            @click="handleUpdate(scope.row)"
          >
            修改
          </el-button>
          <el-button
            icon="el-icon-delete"
            size="mini"
            type="text"
            @click="handleDelete(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :limit.sync="queryParams.pageSize"
      :page.sync="queryParams.pageNum"
      :total="total"
      @pagination="getList"
    />

    <!-- 添加或修改goodsType对话框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" append-to-body width="800px">
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="编码名称" prop="codeName">
          <el-input
            v-model="form.codeName"
            placeholder="请输入编码名称"
            style="width: 220px;"
          />
        </el-form-item>
        <el-form-item label="代码" prop="codeValue">
          <el-input
            v-model="form.codeValue"
            placeholder="请输入代码"
            style="width: 220px;"
          />
        </el-form-item>
        <el-form-item label="上级" prop="parentId">
          <goods-level ref="level" v-model="form.parentId" :options="levelOptions" @change="levelChange"></goods-level>
        </el-form-item>
        <el-form-item label="是否展示" prop="showFlag">
          <el-switch
            v-model="form.showFlag"
            active-value="1"
            inactive-value="0"
          >
          </el-switch>
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
import GoodsLevel from '@/components/GoodsLevel'
import { addGoodsCode, delGoodsCode, getGoodsCode, listGoodsCode, updateGoodsCode } from '@/api/business/goodsCode'
import { cloneDeep, numberToChinese } from '@/utils'

const defaultForm = {
  codeName: undefined, // 编码名称
  codeValue: undefined, // 代码
  codeLevel: "1", // 级别
  showFlag: "1", // 是否展示
  parentId: "0", // 上级分类id
}

export default {
  name: "GoodsCode",
  components: { GoodsLevel },
  data() {
    return {
      //跨页多选key
      rowKey: "codeId",
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 总条数
      total: 0,
      // goodsType表格数据
      lists: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        delFlag: 0,
        codeName: undefined, // 编码名称
        codeValue: undefined, // 编码代码
        parentId: undefined, // 编码级别
        codeLevel: undefined, // 编码级别
        showFlag: undefined, // 是否展示
      },
      queryLevelOptions: [],
      levelOptions: [],
      // 是否展示
      isShowOptions: [
        {
          value: "1",
          label: "是",
        },
        {
          value: "0",
          label: "否",
        },
      ],

      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑编码",
        create: "添加编码",
      },
      // 表单参数
      form: cloneDeep(defaultForm),
      // 表单校验
      rules: {
        codeName: [{ required: true, message: "请输入编码名称", trigger: "blur" }],
        codeValue: [{ required: true, message: "请输入代码", trigger: "blur" }],
        parentId: [{ required: true, message: "请选择级别", trigger: "blur" }],
        showFlag: [{ required: true, message: "请选择是否展示", trigger: "blur" }],
      },
    };
  },
  computed: {
    baseUrl() {
      return process.env.VUE_APP_BASE_API;
    },
  },
  created() {
    this.getList();
  },
  methods: {
    numberToChinese,
    loadOptions() {
      listGoodsCode({
        delFlag: 0,
      }).then(res => {
        const data = cloneDeep(res.data);
        function getArrayLayer(arr, attr, index = 0) {
          let newIndex = index;
          for (const iterator of arr) {
            let tempIndex = index
            if (iterator[attr]) {
              tempIndex = getArrayLayer(iterator[attr], attr, index + 1)
              if (tempIndex > newIndex) {
                newIndex = tempIndex
              }
            }
          }
          return newIndex
        }
        const level = getArrayLayer(data, 'children')

        const levelOptions = []
        for (let i = 0; i < level; i++) {
          levelOptions.push({
            value: String(i + 1),
            label: numberToChinese(i + 1) + "级分类",
          })
        }

        this.queryLevelOptions = levelOptions;
        const children = this.handleTreeOptions(cloneDeep(res.data));
        this.levelOptions = [{ value: "0", label: "顶级", level: "1", children: children }]
      });
    },
    batchDelete() {
      if (!this.ids.length) {
        this.$message.warning("请选择需要删除的数据");
        return;
      }
      this.$confirm("是否删除选中数据", "提示").then((res) => {
        const str = this.ids.join(",");
        delGoodsCode(str).then(() => {
          this.$message.success("删除成功！");
          this.getList();
        });
      });
    },
    /** 查询goodsType列表 */
    getList() {
      this.loadOptions();
      this.loading = true;
      listGoodsCode(this.queryParams).then((res) => {
        this.lists = res.data;
        //this.total = res.data.total;
      }).finally(() => {
        this.loading = false;
      });
    },
    handleTreeOptions(data) {
      const arr = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (item.showFlag === "1") {
          arr.push({
            value: String(item.codeId),
            label: item.codeName,
            level: String(Number(item.codeLevel) + 1),
            children: this.handleTreeOptions(item.children)
          });
        }
      }
      return arr;
    },
    // 取消按钮
    cancel() {
      this.dialogFormVisible = false;
      this.dialogStatus = "";
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = cloneDeep(defaultForm);
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        delFlag: 0,
        codeName: undefined, // 编码名称
        codeValue: undefined, // 编码代码
        parentId: undefined, // 编码级别
        codeLevel: undefined, // 编码级别
        showFlag: undefined, // 是否展示
      }
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.codeId);
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.dialogFormVisible = true;
      this.dialogStatus = "create";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.codeId;
      getGoodsCode(id).then((res) => {
        res.data.parentId = String(res.data.parentId) || "0";
        this.form = res.data;
        this.dialogFormVisible = true;
        this.dialogStatus = "update";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.dialogStatus === "create") {
            addGoodsCode(this.form).then(() => {
              this.$message.success("添加成功");
              this.dialogFormVisible = false;
              this.getList();
            });
          } else if (this.dialogStatus === "update") {
            updateGoodsCode(this.form).then(() => {
              this.$message.success("修改成功");
              this.dialogFormVisible = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm("确认删除的数据吗？", "删除")
        .then(() => {
          return delGoodsCode(row.codeId);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        });
    },
    treeFindPath(tree, func, field = "", path = []) {
      if (!tree) return []
      for (const data of tree) {
        // 代码
        field === "" ? path.push(data) : path.push(data[field]);
        if (func(data)) return path
        if (data.children) {
          const findChildren = this.treeFindPath(data.children, func, field, path)
          if (findChildren.length) return findChildren
        }
        path.pop()
      }
      return []
    },
    // 是否展示
    handleIsShow(f, row, text, name) {
      let arr = this.treeFindPath(this.lists, data => data.codeId === row.codeId, "showFlag")
      let upperLevelFlag = true;
      if (arr.length > 1) {
        // 上一级是否展示
        upperLevelFlag = arr[arr.length - 2] === "1";
      } else if (arr.length === 1) {
        upperLevelFlag = true;
      } else {
        upperLevelFlag = false;
      }

      if (row.children.length) {
        let data = row.children.find((item) => {
          return item[name] === "1";
        });
        if (data && f === "0") {
          this.$message.warning(`请先关闭子类${text}`);
          row[name] = f === "1" ? "0" : "1";
          return;
        }
      }

      let confirmText = "";
      if (!upperLevelFlag  && f === "1") {
        confirmText = "上级未开启展示，需将上级展示才可进行正常操作";
      } else {
        const flag = f === "1" ? "" : "取消";
        confirmText = "是否" + flag + text + "?";
      }

      this.$confirm(confirmText, "提示")
        .then(() => {
          updateGoodsCode(row).then(() => {
            this.getList();
            this.$message.success("修改成功");
          });
        })
        .catch(() => {
          row[name] = f === "1" ? "0" : "1";
          this.$forceUpdate();
        });
    },
    // 上级改变
    levelChange(obj) {
      this.form.codeLevel = obj.level || undefined;
    }
  },
};
</script>
