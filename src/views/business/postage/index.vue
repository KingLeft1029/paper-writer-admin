<template>
  <div class="app-container">
    <form-container :selection="true" ref="content" :formList="formList" :total="total" :tableList="tableList"
      :tableData="tableData" @search="getList" @paginationChange="getList" @recharge="getList">
      <template slot="button">
        <el-button class="button" icon="el-icon-edit" @click="addData" size="small">添加</el-button>
      </template>
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link :underline="false" type="primary" @click="lookInfo(scope.row)">查看详情</el-link>
              <el-link :underline="false" type="primary" @click="editData(scope.row)">编辑</el-link>
              <el-link :underline="false" type="primary" @click="deleteData(scope.row)">删除</el-link>
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" v-if="dialogVisible">
      <el-form label-width="130px" :model="dialogTableData" ref="form">
        <el-form-item label="模板名称:" prop="modelName" :rules="[
            { required: true, message: '请输入模板名称', trigger: 'change' },
          ]">
          <el-input :disabled="looKInfo" v-model="dialogTableData.modelName"></el-input>
        </el-form-item>
        <el-form-item label="配送区域与邮费:" prop="modelDetails" :rules="[
            {
              required: true,
              message: '请选择配送区域与邮费',
              trigger: 'change',
            },
          ]">
          <el-table style="width: 100%" :data="dialogTableData.modelDetails">
            <el-table-column prop="regionName" label="配送区域" show-overflow-tooltip></el-table-column>
            <el-table-column label="包邮金额（元）">
              <template slot-scope="scope">
                <el-input :disabled="looKInfo" v-model="scope.row.freeShipPrice"
                  @change="change(scope.row, 'freeShipPrice')" maxlength="8"></el-input>
              </template></el-table-column>
            <el-table-column label="运费（元）">
              <template slot-scope="scope">
                <el-input v-model="scope.row.postage" @change="change(scope.row, 'postage')" :disabled="looKInfo"
                  maxlength="8"></el-input>
              </template></el-table-column>
            <el-table-column label="操作" v-if="!looKInfo">
              <template slot-scope="scope">
                <el-link :underline="false" type="primary" @click="deletePostage(scope.row)">删除</el-link>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item v-if="!looKInfo">
          <el-button type="success" @click="addRegion">
            添加配送区域
          </el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  postagePage,
  getMark,
  postageModelById,
  postageUpdate,
  postageSave,
  postageModelDelete,
} from "@/api/postage";
import FormContainer from "@/views/components/FormContainer";
import RegionSelect from "./components/regionSelect.vue";
import { tableList, formList } from "./config";
import Provide from "@/views/components/mixin/provide";
export default {
  mixins: [Provide],

  components: {
    FormContainer,
    RegionSelect,
  },

  data () {
    return {
      looKInfo: false,
      selectRegion: [],
      tableList,
      formList,
      total: 0,
      dialogVisible: false,
      tableData: [],
      dialogTableData: {
        modelName: null,
        modelDetails: [],
      },
      dialogTitle: "新增",
    };
  },

  computed: {},
  created () { },

  mounted () {
    this.getList();
  },

  methods: {
    change (row, name) {
      if (!Number(row[name]) && Number(row[name]) != 0) {
        this.$message.warning("输入正确格式的金额");
        row[name] = "";
        return;
      } else {
        row[name] = Number(row[name]).toFixed(2); //不足补位
      }
    },

    dialogSubmit () {

      if (this.looKInfo) {
        this.dialogVisible = false;
        return;
      }
      let data = this.dialogTableData.modelDetails.find((item) => {
        return (
          (!item.freeShipPrice && item.freeShipPrice != 0) ||
          (!item.postage && item.postage != 0)
        );
      });
      if (data) {
        this.$message.warning("请填写完整邮费信息");
        return;
      }
      this.$refs.form.validate((flag) => {
        if (flag) {
          let params = JSON.parse(JSON.stringify(this.dialogTableData))
          let regionIdArr = []
          params.modelDetails.forEach((item) => {
            item.regionId = item.regionId.indexOf(',') == -1 ? [parseInt(item.regionId)] : item.regionId.split(',')
            item.regionId.forEach((e) => {
              regionIdArr.push({
                freeShipPrice: item.freeShipPrice,
                postage: item.postage,
                regionId: parseInt(e)
              })
            })
          })
          params.modelDetails = regionIdArr
          if (this.dialogTableData.modelId) {
            postageUpdate(this.dialogTableData).then((res) => {
              this.$message.success("保存成功！");
              this.getList();
            });
          } else {
            postageSave(params).then((res) => {
              this.$message.success("保存成功！");
              this.getList();
            });
          }
          this.dialogVisible = false;
        }
      });
    },

    deleteData (row) {
      this.$confirm("确认删除选中的数据吗？", "删除").then((res) => {
        postageModelDelete(row.modelId).then((res) => {
          this.$message.success("删除成功");
          this.getList();
        });
      });
    },
    deletePostage (data) {
      console.log(data, "data222222")
      let ids = data.regionId.split(",");
      console.log(ids, "ids")
      this.$confirm("是否删除？", "删除").then((res) => {
        // this.selectRegion.forEach(item=>{

        // })
        ids.forEach((item) => {
          if (this.selectRegion.indexOf(item) != -1) {
            this.$delete(this.selectRegion, this.selectRegion.indexOf(item));
          }
        });
        this.$delete(
          this.dialogTableData.modelDetails,
          this.dialogTableData.modelDetails.indexOf(data)
        );

        console.log(this.selectRegion, "删除后的this.selectRegion")
      });

    },
    switchChange (data) {
      this.$confirm("是否保存该操作？", "提示")
        .then((res) => {
          postageUpdate(data)
            .then((res) => {
              this.$message.success("保存成功！");
              this.getList();
            })
            .catch((err) => {
              data.useFlag == "0" ? (data.useFlag = "1") : (data.useFlag = "0");
            });
        })
        .catch((err) => {
          data.useFlag == "0" ? (data.useFlag = "1") : (data.useFlag = "0");
        });
    },
    addRegion () {
      console.log(this.selectRegion, "编辑的时候，默认的配送区域this.selectRegion")
      this.$openDialog({
        title: "添加邮费管理",
        width: "1000px",
        data: {
          selectOption: this.selectRegion,
          selectDisabled: true,
        },
        components: RegionSelect,
        beforeClose: function (flag, content, done) {
          if (flag) {
            let data = {
              regionId: null,
              regionName: null,
              freeShipPrice: null,
              postage: null,
            };
            //let id = [];

            let selectData = content.getCurSelect();
            console.log(selectData, "用户选择的配送区域 selectData")
            console.log(this.dialogTableData.modelDetails, "展示在配送区域和邮费的list   modelDetails")
            this.dialogTableData.modelDetails.forEach(item => {

            })
            let name = [];
            let newList = []
            selectData.forEach(item => {
              // 全选 北京市  天津市 直辖市
              if (item.checkBox.isAllSelect) {
                name.push(item.checkBox.regionName);
                item.checkList.forEach(next => {
                  newList.push(next.regionId)
                })
              } else {
                // 河北省-保定市 非全选  非直辖市
                let names = [];

                item.checkList.forEach(next => {
                  if (this.selectRegion.indexOf(next.regionId) == -1) {
                    names.push(next.regionName);
                    newList.push(next.regionId)
                  }
                })
                name.push(`${item.checkBox.regionName}-${names.join(",")}`);
              }

            })
            data.regionName = name.join("/");
            data.regionId = newList.join(",");
            this.dialogTableData.modelDetails.push(data);
            this.selectRegion = [
              ...this.selectRegion,
              ...newList,
            ];

            // data.regionName = name.join("/");
            // const regionIdArr = content.getSelectValList().filter(item1 => !this.selectRegion.some(item2 => item2 === item1))
            // console.log(regionIdArr, "regionIdArr")
            // data.regionId = regionIdArr.join(",");
            // this.dialogTableData.modelDetails.push(data);
            // this.selectRegion = [
            //   ...this.selectRegion,
            //   ...regionIdArr,
            // ];

            console.log(this.selectRegion, "this.selectRegion")


            // if (selectData.length > 0) {
            //   selectData.forEach((item) => {
            //     if (item.checkBox.isAllSelect) {
            //       name.push(item.checkBox.regionName);
            //     } else {
            //       let names = [];
            //       item.checkList.forEach((childItem) => {
            //         //id.push(childItem.regionId);
            //         names.push(childItem.regionName);
            //       });
            //       name.push(`${item.checkBox.regionName}-${names.join(",")}`);
            //     }
            //   });
            //   data.regionName = name.join("/");
            //   const regionIdArr = content.getSelectValList().filter(item1 => !this.selectRegion.some(item2 => item2 === item1))
            //   console.log(regionIdArr, "regionIdArr")
            //   data.regionId = regionIdArr.join(",");
            //   this.dialogTableData.modelDetails.push(data);
            //   this.selectRegion = [
            //     ...this.selectRegion,
            //     ...content.getSelectValList(),
            //   ];
            // }
            // console.log(selectData, "selectData")



            // console.log(this.selectRegion, ...content.getSelectValList(), "this.selectRegion ")
            done();
          } else {
            done();
          }
        },
      });
    },
    mergeRegion (a, b) {
      let arr = JSON.parse(JSON.stringify(a));
      b.forEach((item, index) => {
        let data = a.find((childItem) => {
          return item.regionId == childItem.regionId;
        });
        if (data) {
          arr[index].children = [...arr[index].children, ...data.children];
        } else {
          arr.push(item);
        }
      });
      return arr;
    },
    filter () {
      return this.$refs.content.filter();
    },
    addData () {
      this.dialogTitle = "新增";
      this.dialogVisible = true;
      this.looKInfo = false;
      this.dialogTableData = {};
      this.dialogTableData.modelDetails = [];
      this.selectRegion = [];
    },
    lookInfo (row) {
      this.dialogTitle = "查看详情";
      this.looKInfo = true;
      postageModelById(row.modelId).then((res) => {
        this.dialogTableData = res.data;
      });
      this.dialogVisible = true;
    },
    editData (row) {
      this.looKInfo = false;
      this.dialogTitle = "编辑";
      postageModelById(row.modelId).then((res) => {
        this.dialogTableData = res.data;
        this.selectRegion = [];
        res.data.modelDetails.forEach((item) => {
          item.regionId = item.regionId + ''
          this.selectRegion = [
            ...this.selectRegion,
            ...item.regionId.split(","),
          ];
        });
      });
      this.dialogVisible = true;
    },
    /** 查询商家管理平台端列表 */
    getList () {
      let params = {
        ...this.filter(),
      };
      postagePage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  }
};
</script>

