<template>
  <div class="app-container">
    <form-container
      class="form-container"
      :selection="true"
      ref="content"
      :formList="formList"
      :total="total"
      :tableList="tableList"
      :tableData="tableData"
      @search="getList"
      @paginationChange="getList"
      @recharge="getList"
    >
      <template slot="button">
        <el-button
          class="button"
          icon="el-icon-download"
          @click="handleExport"
          plain
          size="small"
          type="primary"
          >导出模板</el-button
        >
        <!-- <el-button
          class="button"
          icon="el-icon-edit"
          plain
          size="small"
          type="primary"
          @click="importEvent"
          >导入</el-button
        > -->
        <el-upload
          class="upload-demo"
          action
          :http-request="importEvent"
          :file-list="fileList"
          :show-file-list="false"
          :before-upload="beforeUupload"
        >
          <el-button size="small" icon="el-icon-upload2" type="primary" plain
            >导入</el-button
          >
        </el-upload>
        <el-button
          class="button"
          icon="el-icon-delete-solid"
          plain
          size="small"
          type="primary"
          @click="batchDelete"
          >批量删除</el-button
        >

        <el-button
          class="button"
          icon="el-icon-plus"
          plain
          size="small"
          type="primary"
          @click="addTO"
          >添加</el-button
        >
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link
                :underline="false"
                type="primary"
                @click="viewEvent(scope.row)"
                >查看</el-link
              >
              <el-link
                :underline="false"
                type="primary"
                @click="Edit(scope.row)"
                >编辑</el-link
              >
              <el-link
                :underline="false"
                type="primary"
                @click="deleteData(scope.row)"
                >删除</el-link
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
    <Dialog1
      v-if="dialogFormVisible"
      :dialogFormVisible.sync="dialogFormVisible"
      @enterEvent="enterEvent"
      :newForm="newForm"
      :EditStatus="EditStatus"
      :formDisabled="formDisabled"
      ref="Dialog12"
    ></Dialog1>
  </div>
</template>
 <script>
import { tableList, formList } from "./config";
import FormContainer from "@/views/components/FormContainer";
import Provide from "@/views/components/mixin/provide";
import Dialog1 from "./components/dialog.vue";

import {
  newGoods,
  getGoodsList,
  editGoods,
  deleteGodds,
  clearGodds,
  getdetails,
  improtFile,
} from "@/api/codingManagement/commoditySpecificationCode.js";
export default {
  name: "commoditySpecificationCode",
  mixins: [Provide],
  components: {
    FormContainer,
    Dialog1,
  },
  data() {
    return {
      tableList,
      formList,
      tableData: [],
      total: 0,
      dialogFormVisible: false,
      newForm: {},
      EditStatus: false,
      disStatus: false,
      formDisabled: true,
      fileList: [],
      fileType: ["xlsx"],
    };
  },
  beforeCreate() {},
  mounted() {
    this.getList();
  },
  updated() {},

  methods: {
    handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件!!!`);
        // 本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件
      },
    beforeUupload(file) {
      console.log();
      if (file.type != "" || file.type != null || file.type != undefined) {
        const FileExt = file.name.replace(/.+\./, "").toLowerCase();
        //如果文件类型不在允许上传的范围内
        if (this.fileType.includes(FileExt)) {
          return true;
        } else {
          this.$message.error("上传文件格式不正确!");
          return false;
        }
      }
    },

    switchChange(data) {
      let text = data.showFlag == "1" ? "启用" : "取消启用";
      this.$confirm(`是否${text}？`, "提示")
        .then((res) => {
          editGoods(data).then((res) => {
            const { code, msg } = res;
            if (code == 200) {
              this.getList();
              this.$message.success(msg);
            }
          });
        })
        .catch((err) => {
          data.showFlag = data.showFlag == "1" ? "0" : "1";
        });
    },
    enterEvent(obj, EditStatus, viewStatus) {
      console.log(EditStatus);
      if (EditStatus) {
        editGoods(obj).then((res) => {
          const { code, msg } = res;
          if (code == 200) {
            this.$message.success(msg);
            this.dialogFormVisible = false;
            this.getList();
          }
        });
      } else if (viewStatus) {
        this.dialogFormVisible = false;
      } else if (!EditStatus) {
        newGoods(obj).then((res) => {
          console.log(res);
          const { code, msg } = res;
          if (code == 200) {
            this.$message.success(msg);
            this.dialogFormVisible = false;
            this.getList();
          }
        });
      }
    },
    batchDelete() {
      let length = this.$refs.content.getSelectList.length;
      if (!length > 0) {
        this.$message.warning("请选择需要批量删除的数据");
        return;
      }
      let idList = this.$refs.content.getSelectList.map(($v1) => {
        return $v1.id;
      });
      this.$confirm("确认删除选中的数据吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: 'warning'
      })
        .then((_) => {
          clearGodds({ ids: idList }).then((res) => {
            const { code, msg } = res;
            if (code == 200) {
              this.$message.success(msg);
              this.getList();
            }
            // console.log(res);
          });
        })
        .catch((_) => {});
    },
    addTO() {
      this.formDisabled = false;
      this.dialogFormVisible = true;
      this.newForm = {};
      this.EditStatus = false;
    },
    Edit(row) {
      // this.newForm = {};
      this.EditStatus = true;
      this.formDisabled = false;
      getdetails(row.id).then((res) => {
        const { code, data } = res;
        if (code == 200) {
          // console.log(res);
          this.$nextTick(() => {
            this.$set(this.newForm, "obj", data);
            this.dialogFormVisible = true;
          });
        }
      });
    },
    deleteData(row) {
      this.$confirm("确认删除选中的数据吗？", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        // type: 'warning'
      })
        .then((_) => {
          deleteGodds(row.id).then((res) => {
            const { code, msg } = res;
            if (code == 200) {
              this.getList();
              this.$message.success(msg);
            }
          });
        })
        .catch((_) => {});
    },
    viewEvent(row) {
      this.formDisabled = true;
      getdetails(row.id).then((res) => {
        const { code, data } = res;
        if (code == 200) {
          // console.log(res);
          data.showButton = true
          this.$nextTick(() => {
            this.$set(this.newForm, "obj", data);
            this.dialogFormVisible = true;
          });
        }
      });
    },
    importEvent(item) {
      let FormDatas = new FormData();
      FormDatas.append("file", item.file);
      console.log(FormDatas);
      improtFile(FormDatas).then((res) => {
        console.log(res);
        const { code, msg } = res;
        if (code == 200) {
          this.$message.success(msg);
          this.getList();
        }
      });
    },
    handleExport() {
      this.$confirm("是否确认导出模板?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // getEport({}).then((res) => {
          //   let text = `商品编码规格模板_${new Date().getTime()}.xlsx`;
          //   const blob = new Blob([res]);
          //   saveAs(blob, text);
          //   console.log(res);
          // });
          let params = {};
          this.download(
            "/deGoodsModelAttrDetail/export",
            params,
            `商品编码规格模板_${new Date().getTime()}.xlsx`
          ).then((res) => {
            console.log(res);
          });
        })
        .then((response) => {});
    },
    filter() {
      return this.$refs.content.filter();
    },
    getList() {
      let params = {
        ...this.filter(),
      };
      getGoodsList(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  },
};
</script>
 <style lang="scss" scoped>
.form-container {
  .upload-demo {
    display: inline-block !important;
    margin: 0 10px;
  }
  ::v-deep {
    .el-table .cell.el-tooltip {
      div {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>