<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item label="分类名称" prop="typeName">
        <el-input v-model="queryParams.typeName" placeholder="请输入分类名称" clearable size="small"
          @keyup.enter.native="handleQuery" />
      </el-form-item>

      <el-form-item label="分类级别" prop="level">
        <el-select clearable v-model="queryParams.level" placeholder="请选择分类级别" style="width: 220px"
          @change="(f) => handleType(f, 'queryParams')">
          <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item
        label="上级分类"
        prop="parentId"
        v-if="queryParams.level == 2"
      >
        <el-select
          clearable
          v-model="queryParams.parentId"
          placeholder="请选择上级分类"
          style="width: 220px"
        >
          <el-option
            v-for="item in parentList"
            :key="item.typeId"
            :label="item.typeName"
            :value="item.typeId"
          >
          </el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item label="是否显示" prop="showFlag">
        <el-select clearable v-model="queryParams.showFlag" placeholder="请选择是否显示" style="width: 220px">
          <el-option v-for="item in isShowOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否推荐到首页" prop="homePageFlag">
        <el-select clearable v-model="queryParams.homePageFlag" placeholder="请选择是否推荐到首页" style="width: 220px">
          <el-option v-for="item in isShowOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">添加</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="batchDelete"
          >批量删除</el-button
        >
      </el-col> -->
    </el-row>

    <el-table v-loading="loading" :data="goodsTypeList" ref="content" :row-key="rowKey"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" reserve-selection />
      <el-table-column label="分类名称" align="left" prop="typeName" />
      <el-table-column label="类型级别" align="center" prop="level">
        <template slot-scope="scope">
          {{ scope.row.level == "1" ? "一级分类" : "二级分类" }}
        </template>
      </el-table-column>
      <el-table-column prop="typePic" align="center" label="分类图片">
        <template slot-scope="scope">

          <el-image v-if="scope.row.level==2" style="width: 100px; height: 100px" :src="baseUrl + scope.row.typePic"
            :preview-src-list="[baseUrl + scope.row.typePic]">
          </el-image>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" align="center" prop="showFlag">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.showFlag" active-value="1" inactive-value="0"
            @change="(f) => handleIsShow(f, scope.row, '显示', 'showFlag')">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="是否首页推荐" align="center" prop="homePageFlag">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.homePageFlag" active-value="1" inactive-value="0" @change="
              (f) => handleIsShow(f, scope.row, '首页推荐', 'homePageFlag')
            ">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="规格名" align="left" prop="attrNames" show-overflow-tooltip>
        <template slot-scope="scope">
          {{scope.row.attrNames.join(',')}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改goodsType对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="商品分类" prop="typeName">
          <el-input style="width: 220px" v-model="form.typeName" placeholder="请输入分类名称" clearable />
        </el-form-item>
        <el-form-item label="分类级别" prop="level">
          <el-select v-model="form.level" placeholder="请选择分类级别" style="width: 220px" :disabled="form.children"
            @change="(f) => handleType(f -1, 'form')">
            <el-option v-for="item in levelOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类图片" prop="typePic" v-if="form.level=='2'">
          <image-upload v-model="form.typePic"></image-upload>
        </el-form-item>

        <el-form-item label="上级分类" prop="parentId" v-if="form.level == 2">
          <el-select v-model="form.parentId" placeholder="请选择上级分类" style="width: 220px">
            <el-option v-for="item in parentList" :key="item.typeId" :label="item.typeName" :value="item.typeId">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item
          label="抽取此分类下商品价格的"
          prop="cutNum"
          v-if="form.level == 2"
        >
          <el-input
            v-model.number="form.cutNum"
            placeholder="请输入抽取此分类下商品价格"
            style="width: 220px"
          >
            <span style="color:#000" slot="suffix">%</span>
          </el-input>
        </el-form-item> -->
        <el-form-item label="规格名" prop="attrNames" v-if="form.level=='2'">
          <el-tag :key="tag" v-for="tag in form.attrNames" closable :disable-transitions="false"
            @close="handleClose(tag)">
            {{tag}}
          </el-tag>
          <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
            @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">请输入规格名</el-button>
        </el-form-item>
        <el-form-item label="是否展示" prop="showFlag">
          <el-select v-model="form.showFlag" placeholder="请选择" style="width: 220px">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否" value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否首页推荐" prop="homePageFlag" v-if="form.level=='2'">
          <el-select v-model="form.homePageFlag" placeholder="请选择" style="width: 220px">
            <el-option label="是" value="1"> </el-option>
            <el-option label="否" value="0"> </el-option>
          </el-select>
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
  listGoodsType,
  getGoodsType,
  delGoodsType,
  addGoodsType,
  updateGoodsType,
} from "@/api/business/goodsType";
export default {
  name: "GoodsType",
  components: { ImageUpload },
  data () {
    return {
      nameList: [],
      //跨页多选key
      rowKey: "typeId",
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
      // goodsType表格数据
      goodsTypeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        typeName: undefined,
        showFlag: undefined,
        handleIsShow: undefined,
        parentId: undefined,
        level: undefined,
      },

      // 表单参数
      form: {
        attrNames: []
      },
      // 分类级别
      levelOptions: [
        {
          value: 1,
          label: "一级",
        },
        {
          value: 2,
          label: "二级",
        },
      ],
      // 是否显示
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
      // 上级分类列表
      parentList: [],
      // 表单校验
      rules: {
        typeName: [
          { required: true, message: "类型名称不能为空", trigger: "blur" },
        ],
        level: [{ required: true, message: "请选择分类级别", trigger: "blur" }],
        typePic: [
          { required: true, message: "请上传分类图片", trigger: "blur" },
        ],
        parentId: [
          { required: true, message: "请选择上级分类", trigger: "blur" },
        ],
        showFlag: [
          { required: true, message: "请选择是否显示", trigger: "blur" },
        ],
        homePageFlag: [
          { required: true, message: "请选择是否首页推荐", trigger: "blur" },
        ],
        attrNames: [
          { required: true, message: "请添加规格名", trigger: "blur" }
        ]
      },
      inputVisible: false,
      inputValue: ''
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
    batchDelete () {
      if (!this.ids.length) {
        this.$message.warning("请选择需要删除的数据");
        return;
      }
      this.$confirm("是否删除选中数据", "提示").then((res) => {
        delGoodsType(this.ids).then((res) => {
          this.$message.success("删除成功！");
        });
      });
    },
    /** 查询goodsType列表 */
    getList () {
      this.loading = true;
      listGoodsType(this.queryParams).then((response) => {
        this.goodsTypeList = response.data.records;
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
      this.nameList = []
      this.form = {
        typeId: undefined,
        typeName: undefined,
        remark: undefined,
        parentId: undefined,
        typePic: undefined,
        showFlag: undefined,
        homePageFlag: undefined,
        level: undefined,
        attrNames: [],
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
      this.queryParams = {
        pageNum: 1,
        pageSize: 10,
        typeName: undefined,
        showFlag: undefined,
        parentId: undefined,
        level: undefined,
      }
      this.resetForm("queryForm");
      this.getList();
    },
    // 多选框选中数据
    handleSelectionChange (selection) {
      this.ids = selection.map((item) => item.typeId);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd () {
      this.reset();
      this.open = true;
      this.title = "添加商品分类";
    },
    /** 修改按钮操作 */
    handleUpdate (row) {
      this.reset();
      const typeId = row.typeId || this.ids;
      getGoodsType(typeId).then((response) => {
        this.form = response.data;
        console.log(this.form, "this.form ")
        this.open = true;
        this.title = "修改商品分类";
        this.handleType(this.form.level)
      });
    },
    /** 提交按钮 */
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.form.typeId != null) {
            updateGoodsType(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGoodsType(this.form).then((response) => {
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
      this.$confirm("确认删除选中的数据吗？", "删除")
        .then(function () {
          return delGoodsType([row.typeId]);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => { });
    },
    // 是否显示
    handleIsShow (f, row, text, name) {
      let that = this;
      if (row.children.length) {
        let data = row.children.find((item) => {
          return item[name] == "1";
        });

        if (data) {
          this.$message.warning(`请先关闭子类${text}`);
          row[name] = f == "1" ? "0" : "1";
          return;
        }
      }
      const flag = f == 1 ? "" : "取消";
      this.$confirm("是否确认" + flag + text + "?", "提示")
        .then(function () {
          updateGoodsType(row).then((response) => {
            that.getList();
            that.$message.success("修改成功");
          });
        })
        .catch((err) => {
          row[name] = f == "1" ? "0" : "1";
          this.$forceUpdate();
        });
    },
    // 上级分类回调
    handleType (f, name) {

      listGoodsType({ level: f }).then((response) => {
        this.parentList = response.data.records;

      })
      this.handleQuery()
    },
    handleClose (tag) {
      this.form.attrNames.splice(this.form.attrNames.indexOf(tag), 1);
    },

    showInput () {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm () {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.attrNames.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    }
  },
};
</script>

<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>