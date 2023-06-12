<template>
  <div class="app-container">

    <div>


      <el-table v-loading="loading" :data="list" :header-cell-style="{ 'background-color': '#EDF4FC' }">


        <el-table-column :label="$t('ID')" align="center" prop="id" :show-overflow-tooltip="true" />
        <el-table-column :label="$t('PTXX')" align="center" prop="name" :show-overflow-tooltip="true"
          :formatter="formatterS" />

        <el-table-column :label="$t('Operators')" align="center" prop="createName" />
        <el-table-column :label="$t('CREATION_TIME')" align="center" width="140" :show-overflow-tooltip="true"
          prop="createTime">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('Operate')" align="center" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" @click="handleCheck(scope.row)">{{
              $t("View") }}</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)">{{
              $t("Edit") }}
            </el-button>


          </template>
        </el-table-column>
      </el-table>


    </div>

    <!-- 添加或修改用户配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="180px">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('PTXX') + ':'" prop="name">
              <span>{{ language == 'en' ? form.keyWord : form.name }}</span>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('Content') + ':'" prop="content">
              <editor :html="form.content" v-if="editFlag"></editor>
              <div v-html="form.content" v-else>
              </div>
            </el-form-item>
          </el-col>

        </el-row>


      </el-form>
      <div slot="footer" class="dialog-footer" v-if="form.id">
        <el-button type="primary" @click="submitForm">{{
          $t("Confirm")
        }}</el-button>
        <el-button @click="cancel">{{ $t("Cancel") }}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  listApi,

  editApi,

  detailApi,
} from "@/api/info";

import { mapGetters } from "vuex";

export default {
  name: "User",

  computed: {
    ...mapGetters(["language"]),
  },
  data() {
    return {
      // 遮罩层
      loading: true,

      enFlag: false,



      // 用户表格数据
      list: null,
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,


      // 表单参数
      form: {},


      // 表单校验
      rules: {
        content: [
          { required: true, message: this.$t('BNWK'), trigger: "blur" },
        ],
      },
      editFlag:false

    };
  },

  created() {

    this.getList();


  },
  methods: {

    formatterS(row) {
      if (this.language == 'en') {
        return row.keyWord
      } else {
        row.name
      }


    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listApi().then(
        (response) => {
          this.list = response.data;
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
        content: undefined,

      };
      this.resetForm("form");
    },
    // 查看
    handleCheck(row) {
      this.reset();
      const id = row.id
      detailApi(id).then((response) => {
        this.editFlag=false
        this.form = response.data;

        this.open = true;
        this.title = this.$t("View");

      });

    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id

      detailApi(id).then((response) => {
        this.editFlag=true
        this.form = response.data;
        this.open = true;
        this.title = this.$t("Edit");

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
          }
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
