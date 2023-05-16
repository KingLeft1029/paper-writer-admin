<template>
  <div class="edit app-container" ref="app">
    <div class="form">
      <el-form label-width="140px" :model="formData" ref="form" :disabled="isReadonly">
        <el-form-item label="商品列表图：" prop="listPic" :rules="{ message: '请上传商品列表图', required: true }">
          <img-upload :isReadonly="isReadonly" :limit="1" :value="formData.listPic"
            @input="(val) => imgInput(val, 'listPic')" :isShowTip="false"></img-upload>
        </el-form-item>
        <el-form-item label="商品轮播图：" prop="rotationPics" :rules="rules('请上传商品轮播图')">
          <img-upload :isReadonly="isReadonly" :limit="10" :value="formData.rotationPics"
            @input="(val) => imgInput(val, 'rotationPics')" :isShowTip="false"></img-upload>
          <p class="tips">最多上传十张轮播图</p>
        </el-form-item>
        <el-form-item label="商品名称：" prop="goodsName" :rules="{ required: true, message: '请输入商品名称' }">
          <el-input :disabled="isReadonly" v-model="formData.goodsName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="">
          {{ formData.goodsCode }}
        </el-form-item> -->
        <el-form-item label="商品分类：" prop="typeName" :rules="rules('请选择商品分类')">
          <z-tree-select :isReadonly="isReadonly" :inputInfo="{
            name: '商品分类',
            options: goodsTypeList,
            prop: treeSelectProp,
          }" :formData.sync="formData" @change="selectTypeName"></z-tree-select>
        </el-form-item>
        <el-form-item label="发货地：" prop="regionIds" :rules="rules('请选择发货地')">
          <el-cascader :disabled="isReadonly" @change="cascaderChange" v-model="formData.regionIds" :options="regionData"
            :props="regionProp" clearable></el-cascader>
        </el-form-item>
        <el-form-item v-if="preSaleFlag == 1" label="交定金时间" prop="depositRange" :rules="rules('请选择交定金时间')"
          value-format="yyyy-MM-dd HH:mm:ss">
          <el-date-picker v-model="formData.depositRange" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"
            @change="changeDepositRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-if="preSaleFlag == 1" label="付尾款时间" prop="paymentRange" :rules="rules('请选择付尾款时间')"
          value-format="yyyy-MM-dd HH:mm:ss">
          <el-date-picker v-model="formData.paymentRange" type="datetimerange" range-separator="至"
            start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"
            @change="changePaymentRange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="邮费：" prop="postageModelId" :rules="rules('请选择邮费')">
          <el-select :disabled="isReadonly" v-model="formData.postageModelId">
            <el-option v-for="(item, index) of postageOptions" :disabled="postageModelId == item.modelId ? false : item.useFlag != '1'
              " :key="index" :value="item.modelId" :label="item.modelName"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item v-if="formData.deliveryTimeType" prop="deliveryTime" :rules="
            formData.deliveryTimeType
              ? [
                  { required: true, message: '请输入时间', trigger: 'change' },
                  {
                    validator: intNumber,
                    trigger: 'change',
                  },
                ]
              : ''
          ">
          <span style="margin-right: 5px">付款后</span>
          <el-input :disabled="isReadonly" v-model="formData.deliveryTime"></el-input><span
            style="margin-left: 5px">{{ formData.deliveryTimeType == 1 ? "小时" : "天" }}内发货</span>
        </el-form-item> -->
        <el-form-item label="是否为新品：" prop="newFlag" :rules="rules('请选择是否为新品')">
          <el-radio-group :disabled="isReadonly" v-model="formData.newFlag">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上下架状态：" prop="onSaleFlag" :rules="rules('请选择上下架状态')">
          <el-radio-group :disabled="isReadonly" v-model="formData.onSaleFlag">
            <el-radio label="0">下架</el-radio>
            <el-radio label="1">上架</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品详情:" prop="goodsDetail" :rules="rules('请编辑商品详情')">
          <editor :readOnly="isReadonly" :value="formData.goodsDetail" @input="(val) => (formData.goodsDetail = val)">
          </editor>
        </el-form-item>
        <!-- <el-form-item label="驳回原因：" v-if="formData.checkStatus === '0'">
          <el-input :rows="2" type="textarea" v-model="formData.rejectReason" :disabled="true"></el-input>
        </el-form-item> -->
        <div class="divider"></div>
        <el-form-item label="规格：" prop="specLabelValue" :rules="rules('请添加商品规格')">
          <div class="button" v-if="!isReadonly && formData.specLabelValue.length < 5">
            <el-button type="success" size="small" @click="addDomain">添加规格</el-button>
          </div>
        </el-form-item>
        <div v-for="(item, index) of formData.specLabelValue" :key="index">
          <el-form-item label="规格名:" prop="name" :rules="{
            required: false,
            message: '请选择规格名',
            trigger: 'change',
          }">
            <el-select v-model="item.name" clearable placeholder="请选择" @input="changeSelect(index)"
              @clear="clearEvent(index, item)" :disabled="isReadonly">
              <el-option v-for="(e, y) in specifiCationsList" :key="y" :label="e" :value="e">
              </el-option>
            </el-select>
            <i @click="clear(index)" class="el-icon-close icon-close" />
          </el-form-item>

          <el-form-item label="规格值：" prop="value" :rules="{
            required: false,
            message: '请添加规格值',
            trigger: 'change',
          }">
            <div class="chenCkBoxStyle">
              <el-tag :key="tag" v-for="tag in item.value" closable :disable-transitions="false" :closable="!isReadonly"
                @close="handleClose(tag, index)">
                {{ tag }}
              </el-tag>
              <el-input class="input-new-tag" v-if="item.inputVisible" v-model="item.inputValue"
                :ref="'saveTagInput' + index" size="small" :disabled="isReadonly"
                @keyup.enter.native="handleInputConfirm(index)" @blur="handleInputConfirm(index)">
              </el-input>
              <el-button v-if="!item.inputVisible && item.value.length < 10" size="medium" class="button-new-tag"
                type="success" @click="showInput(index)" plain style="margin-right: 30px" :disabled="isReadonly">添加规格值
              </el-button>
            </div>
          </el-form-item>
        </div>
        <div v-if="formData.specLabelValue.length > 0 && formData.specLabelValue[0].value.length > 0"
          style="padding-left: 130px;margin-bottom: 15px">
          <el-button type="primary" @click="generate" :disabled="isReadonly">立即生成</el-button>
        </div>
        <div v-if="speDetailList && speDetailList.length > 0">
          <el-form-item label="规格明细"></el-form-item>
          <el-form-item label="">
            <el-table :data="speDetailList" style="width: 1200px">
              <el-table-column type="selection" width="50" align="center"></el-table-column>
              <el-table-column prop="goodsSpec" label="规格" width="180" align="center"></el-table-column>
              <el-table-column prop="price" label="市场价" width="180" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-model="scope.row.price" style="width: 160px" :maxlength="9"
                    @input="isNumber(scope.row.price) ? scope.row.price : scope.row.price = ''">
                    <template slot="append">元</template>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column v-if="preSaleFlag == 1" prop="depositPrice" label="市场价定金" width="180" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-model="scope.row.depositPrice" style="width: 160px" :maxlength="9"
                    @input="isNumber(scope.row.depositPrice) ? scope.row.depositPrice : scope.row.depositPrice = ''">
                    <template slot="append">元</template>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="innerPrice" label="内部价" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-model="scope.row.innerPrice" style="width: 160px" :maxlength="9"
                    @input="isNumber(scope.row.innerPrice) ? scope.row.innerPrice : scope.row.innerPrice = ''">
                    <template slot="append">元</template>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column v-if="preSaleFlag == 1" prop="innerDepositPrice" label="内部价定金" align="center">
                <template slot-scope="scope">
                  <el-input placeholder="请输入内容" v-model="scope.row.innerDepositPrice" style="width: 160px" :maxlength="9"
                    @input="isNumber(scope.row.innerDepositPrice) ? scope.row.innerDepositPrice : scope.row.innerDepositPrice = ''">
                    <template slot="append">元</template>
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column prop="stockNum" label="库存" align="center">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.stockNum" placeholder="请输入内容" style="width: 160px" :maxlength="9"
                    @input="isNumber(scope.row.stockNum) ? scope.row.stockNum : scope.row.stockNum = ''"></el-input>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label="批量设置">
            <span>市场价：</span>
            <el-input class="batch_inp" v-model="batchMarketValue" placeholder="请输入内容" :maxlength="9"
              @input="isNumber(batchMarketValue) ? batchMarketValue : batchMarketValue = ''" @change="setMarketValue">
              <template slot="append">元</template>
            </el-input>
            <template v-if="preSaleFlag == 1">
              <span>市场价定金：</span>
              <el-input class="batch_inp" v-model="batchDepositPrice" placeholder="请输入内容" :maxlength="9"
                @input="isNumber(batchDepositPrice) ? batchDepositPrice : batchDepositPrice = ''"
                @change="setDepositPrice">
                <template slot="append">元</template>
              </el-input>
            </template>
            <span>内部价：</span>
            <el-input class="batch_inp" v-model="batchLowPrice" placeholder="请输入内容" :maxlength="9"
              @input="isNumber(batchLowPrice) ? batchLowPrice : batchLowPrice = ''" @change="setLowPrice">
              <template slot="append">元</template>
            </el-input>
            <template v-if="preSaleFlag == 1">
              <span>内部价定金：</span>
              <el-input class="batch_inp" v-model="batchInnerDepositPrice" placeholder="请输入内容" :maxlength="9"
                @input="isNumber(batchInnerDepositPrice) ? batchInnerDepositPrice : batchInnerDepositPrice = ''"
                @change="setInnerDepositPrice">
                <template slot="append">元</template>
              </el-input>
            </template>
            <span>库存：</span>
            <el-input class="batch_inp" v-model="batchStock" placeholder="请输入内容" :maxlength="9"
              @input="isNumber(batchStock) ? batchStock : batchStock = ''" @change="setStock"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div>
        <el-button type="primary" :disabled="isReadonly" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ZVideo from "@/views/components/Z-Form/z-video";
import ImgUpload from "@/components/ImageUpload";
import { sysRegionTree } from "@/api/sysRegion/index";
import { postagePage } from "@/api/postage";
import Editor from "@/components/Editor";
import FormContainer from "@/views/components/FormContainer";
import {
  getGoodsInfo,
  addGoodsInfo,
  updateGoodsInfo,
  goodsAttrSave,
  goodsAttrUpdate,
  goodsAttrDelete,
  goodsFaqUpdate,
  goodsFaqlist,
  goodsApplicationIndustrylist,
  goodsApplicationIndustryUpdate,
  goodsFaqDetele,
  goodsApplicationIndustryDetele,
  getGoodsvalues,
} from "@/api/business/goodsInfo";
import { listGoodsType } from "@/api/business/goodsType";
import Upload from "@/components/FileUpload";
import ZTable from "@/views/components/Z-Table";
import {
  IndustryList,
  GoodsFaqList,
  IndustryFormList,
  GoodsFaqFormList,
  tableValueS,
  formList,
} from "./config";
import ZTreeSelect from "@/views/components/Z-Form/z-treeSelect";
import ZForm from "@/views/components/Z-Form/form-groud";
export default {
  name: "GoodsInfoIndex",

  components: {
    ImgUpload,
    Upload,
    Editor,
    ZTable,
    ZTreeSelect,
    ZVideo,
    FormContainer,
  },

  data() {
    return {
      // 这个id就是从别的页面传过来的goodsId
      id: undefined,
      formList,
      tableValueS,
      postageModelId: null,
      isReadonly: false,
      curEditGoodsAttr: "",
      isAddModels: false,
      treeSelectProp: { label: "typeName", value: "typeId" },
      IndustryList,
      GoodsFaqList,
      IndustryFormList,
      GoodsFaqFormList,
      treeCodeSelectProp: { label: "codeName", value: "goodsCodeId" },
      goodsTypeList: null,
      goodsAttrList: { detailList: [] },
      api: process.env.VUE_APP_BASE_API,
      addVisible: false,
      regionData: [],
      regionProp: {
        label: "regionName",
        value: "regionId",
      },
      isAdd: false,
      deliverTime: 1,
      formData: {
        listPic: null,
        rotationPics: null,
        goodsName: null,
        goodsCodeId: null,
        goodsCode: null,
        typeName: null,


        deliveryTimeType: null,
        deliveryTime: null,
        GoodsvaluesTable: null,
        specLabelValue: [],
      },
      postageOptions: null,
      specifiCationsList: [], // 规格列表
      addAttrValue: false, //显示规格值的弹窗
      total: 0,

      formInline: {
        attrDetailName: "",
        attrDetailValue: "",
        pageSize: 10,
        pageNum: 1,
      },
      SelectionChangeList: [],
      currentPage4: 1,
      detailListIndex: undefined,
      AddShow: true,
      dynamicTags: [],
      inputVisible: false,
      inputValue: '',
      speDetailList: [],  //规格明细列表
      batchMarketValue: null,
      batchLowPrice: null,
      batchStock: null,
      preSaleFlag: 0,
      batchDepositPrice: null,
      batchInnerDepositPrice: null,

    };
  },

  computed: {
    rules() {
      return (message) => [
        { required: true, message: message, trigger: "change" },
      ];
    },
  },

  watch: {
    addAttrValue(val) {
      //监听弹窗触发的事件
      // console.log(!val);
      if (!val) {
        this.$refs.multipleTable.clearSelection();
        this.formInline.attrDetailName = "";
        this.formInline.attrDetailValue = "";
      }
    },
  },

  created() {
    this.id = this.$route.query.id;
    this.preSaleFlag = this.$route.query.preSaleFlag;
    if (this.$route.query.isReadonly) this.isReadonly = true;
    postagePage({}).then((res) => {
      this.postageOptions = res.data.records;
    });


    // 商品分类
    listGoodsType({ pageNum: 1, pageSize: 999999, }).then((res) => {

      this.goodsTypeList = res.data.records;
      this.getGoodsInfo();
    });
    sysRegionTree().then((res) => {
      this.regionData = res.data;
      this.regionData.forEach(item => {
        if (item.children.length > 0) {
          item.children.forEach(val => {
            if (val.children.length > 0) {
              val.children.forEach(e => {
                if (e.children.length > 0) {
                } else {
                  delete e.children
                }
              })
            } else {
              delete val.children
            }
          })
        } else {
          delete item.children
        }
      })
    });
  },

  mounted() {

  },

  methods: {
    //在data里或者methods里
    // row 当前行数据
    getkey(row) {
      return row.id;
    },
    codeChange(val) {
      if (val === null) {
        this.$set(this.formData, "goodsCode", null);
        this.$set(this.formData, "codeName", null);
      } else {
        let code = this.handleCode(val, "");
        // 通过有商品ID，则商品编码拼接商品ID
        if (this.$route.query.id) {
          code = code + "-" + this.$route.query.id;
        }
        this.$set(this.formData, "goodsCode", code);

        const codeName = this.handleCodeName(val, "");
        this.$set(this.formData, this.treeCodeSelectProp.label, codeName);
        this.$set(this.formData, "goodsCodeName", codeName);
      }
    },
    treeFindPath(tree, func, field = "", path = []) {
      if (!tree) return [];
      for (const data of tree) {
        // 代码
        field === "" ? path.push(data) : path.push(data[field]);
        if (func(data)) return path;
        if (data.children) {
          const findChildren = this.treeFindPath(
            data.children,
            func,
            field,
            path
          );
          if (findChildren.length) return findChildren;
        }
        path.pop();
      }
      return [];
    },
    handleCode(id, str) {
      this.treeFindPath(
        this.goodsCodeList,
        (data) => data.codeId === id,
        "codeValue"
      ).map((item) => {
        str += item + "-";
      });

      return str === "" ? "" : str.substring(0, str.length - 1);
    },
    handleCodeName(id, str) {
      this.treeFindPath(
        this.goodsCodeList,
        (data) => data.codeId === id,
        "codeName"
      ).map((item) => {
        str += item + "-";
      });

      return str === "" ? "" : str.substring(0, str.length - 1);
    },
    getFaqList() {
      goodsFaqlist(this.$route.query.id).then((res) => {
        this.formData.goodsFaqList = res.data;
      });
    },
    getApplicationIndustrylist() {
      goodsApplicationIndustrylist(this.$route.query.id).then((res) => {
        this.formData.industryList = res.data;
      });
    },
    // 获取商品信息
    getGoodsInfo() {
      if (this.$route.query.id) {
        getGoodsInfo(this.$route.query.id).then((res) => {
          console.log(res.data, "11111111111")
          res.data.codeName = res.data.goodsCodeName;
          this.postageModelId = JSON.parse(
            JSON.stringify(res.data.postageModelId)
          );
          this.speDetailList = res.data.goodsSkuEntities
          let form = res.data
          form.depositRange = [res.data.depositStartTime, res.data.depositEndTime]
          form.paymentRange = [res.data.payStartTime, res.data.payEndTime]

          this.$set(this, "formData", form);
          console.log(this.formData, "vvvvvvvvvvvvv")
          // const { depositStartTime, depositEndTime, payStartTime, payEndTime } = res.data
          // console.log(depositStartTime, depositEndTime, payStartTime, payEndTime, "depositStartTime, depositEndTime, payStartTime, payEndTime")
          // this.formData.depositRange = [depositStartTime, depositEndTime]
          // this.formData.paymentRange = [payStartTime, payEndTime]
          this.goodsTypeList.forEach(val => {
            if (val.typeId == res.data.typeId) {
              this.specifiCationsList = val.attrNames
            } else {
              if (val.children && val.children.length > 0) {
                val.children.forEach(e => {
                  if (e.typeId == res.data.typeId) {
                    this.specifiCationsList = e.attrNames
                  }
                })
              }
            }
          })
        });
      }
    },
    imgInput(val, name) {
      this.$set(this.formData, name, val);
      this.$refs.form.clearValidate([name]);
    },
    intNumber(rule, value, callback) {
      if (value === "0") {
        return callback(new Error("不能小于等于0"));
      }
      if (
        !Number(value) ||
        !Number.isInteger(Number(value)) ||
        Number(value) < 0
      ) {
        return callback(new Error("请输入正整数"));
      } else {
        callback();
      }
    },
    number(rule, value, callback) {
      if (!Number(value) || Number(value) < 0) {
        return callback(new Error("请输入数值数并且不能小于0"));
      } else {
        callback();
      }
    },
    deleteData(row, prop) {
      this.$confirm("是否删除该条数据？").then((res) => {
        if (this.formData.goodsId) {
          if (prop == "goodsFaqList") {
            goodsFaqDetele(row.id).then((res) => {
              this.$message.success("删除成功");
            });
          } else {
            goodsApplicationIndustryDetele(row.id).then((res) => {
              this.$message.success("删除成功");
            });
          }
        } else {
          this.$delete(this.formData[prop], this.formData[prop].indexOf(row));
          this.$message.success("删除成功");
        }
      });
    },
    lookInfo(data, formList) {
      this.$openDialog({
        title: "查看详情",
        data: {
          formData: data,
          formList,
          inline: false,
          showButton: false,
          labelWidth: "130px",
          isReadonly: true,
        },
        components: ZForm,
        beforeClose: function (flag, content, done) {
          done();
        },
      });
    },
    editData(data, formList, prop) {
      this.$openDialog({
        title: "编辑",
        data: {
          formData: data,
          formList,
          inline: false,
          showButton: false,
          labelWidth: "130px",
        },
        components: ZForm,
        beforeClose: function (flag, content, done) {
          if (flag && content.validate()) {
            if (this.formData.goodsId) {
              if (prop == "goodsFaqList") {
                goodsFaqUpdate(content.getFormData, "PUT").then((res) => {
                  this.$message.success("修改成功");
                  done();
                });
              } else {
                goodsApplicationIndustryUpdate(content.getFormData, "PUT").then(
                  (res) => {
                    this.$message.success("修改成功");
                    done();
                  }
                );
              }
            } else {
              this.$message.success("添加成功");
              done();
            }
          } else if (flag === false) {
            done();
          }
        },
      });
    },
    addData(formList, prop) {
      this.$openDialog({
        title: "添加",
        data: {
          formList,
          inline: false,
          showButton: false,
          labelWidth: "130px",
        },
        components: ZForm,
        beforeClose: function (flag, content, done) {
          if (flag && content.validate()) {
            if (!this.formData[prop]) this.$set(this.formData, prop, []);
            if (this.formData.goodsId) {
              if (prop == "goodsFaqList") {
                let parasm = {
                  goodsId: this.formData.goodsId,
                  ...content.getFormData,
                };
                goodsFaqUpdate(parasm, "POST").then((res) => {
                  this.$message.success("添加成功");
                  done();
                });
              } else {
                let parasm = {
                  goodsId: this.formData.goodsId,
                  ...content.getFormData,
                };
                goodsApplicationIndustryUpdate(parasm, "POST").then((res) => {
                  this.$message.success("添加成功");
                  done();
                });
              }
            } else {
              this.formData[prop].push(content.getFormData);
              this.$message.success("添加成功");
              done();
            }
          } else if (flag === false) {
            done();
          }
        },
      });
    },
    cascaderChange(val) { },
    submit() {
      if (this.isReadonly) {
        this.$router.go(-1);
        return;
      }
      this.$refs.form
        .validate()
        .then((res) => {
          if (
            !this.formData.goodsAttrList ||
            !this.formData.goodsAttrList.length
          ) {
            this.$message.warning("请填写商品规格");
            return;
          }
          this.$confirm("是否保存？").then((res) => {


            if (this.$route.query.id) {
              updateGoodsInfo(this.formData).then((res) => {
                this.$message.success("保存成功");
                this.$router.go(-1);
              });
            } else {
              addGoodsInfo(this.formData).then((res) => {
                this.$message.success("保存成功");
                this.$router.go(-1);
              });
            }
          });
        })
        .catch((err) => {
          this.$message.warning("请填写完整内容");
        });
    },
    deleteModels(row) {
      this.$confirm("是否删除该条数据？").then((res) => {
        if (this.formData.goodsId) {
          goodsAttrDelete(row.id).then((res) => {
            this.$message.success("删除成功！");
            this.getGoodsInfo();
          });
        } else {
          this.$delete(
            this.formData.goodsAttrList,
            this.formData.goodsAttrList.indexOf(row)
          );
          this.$forceUpdate();
          this.$message.success("删除成功！");
        }
      });
    },
    clear(index) {
      this.$delete(this.formData.specLabelValue, index);
    },
    addModels() {
      if (this.isReadonly) return;
      this.isAddModels = true;
      this.goodsAttrList = {
        goodsModel: null,
        curPrice: null,
        oriPrice: null,
        stockNum: null,
        detailList: [],
      };

      this.addVisible = true;
    },
    addDomain() {
      this.formData.specLabelValue.push({
        attrName: null,
        name: null,
        value: [],
        attrValue: "",
        attrCodes: undefined,
        orderNum: "",
      });
    },

    rest() {
      //重置搜索

      this.formInline.attrDetailName = "";
      this.formInline.attrDetailValue = "";
    },

    handleSizeChange(val) {
      //条数
      this.formInline.pageSize = val;
    },
    handleCurrentChange(val) {
      //页数
      this.formInline.pageNum = val;
    },
    //=======================================================================================
    changeSelect(index) {
      this.$set(this.formData.specLabelValue[index], 'value', [])
    },
    clearEvent(indexS, val) {
      console.log(val, indexS);
      let list = this.formData.specLabelValue[indexS];
      (list.name = null), (list.attrCodes = null), (list.value = []);
    },
    //选择商品分类
    selectTypeName(e) {
      console.log(e, "e")
      this.specifiCationsList = e.attrNames
      this.formData.specLabelValue = []
      this.speDetailList = []

    },
    // 规格值删除
    handleClose(tag, index) {
      const arr = this.formData.specLabelValue[index].value
      arr.splice(arr.indexOf(tag), 1);
      this.$set(this.formData.specLabelValue[index], 'value', arr)
    },
    // 添加规格值
    showInput(index) {
      this.$set(this.formData.specLabelValue[index], 'inputVisible', true)
      this.$nextTick(_ => {
        this.$refs['saveTagInput' + index][0].$refs.input.focus();
      });
    },
    // 规格值
    handleInputConfirm(index) {
      let inputValue = this.formData.specLabelValue[index].inputValue;
      if (inputValue) {
        this.formData.specLabelValue[index].value.push(inputValue)
      }
      this.$set(this.formData.specLabelValue[index], 'inputVisible', false)
      this.$set(this.formData.specLabelValue[index], 'inputValue', '')
    },
    // 立即生成
    generate() {

      let otherList = JSON.parse(JSON.stringify(this.formData.specLabelValue));

      const arr = otherList.map(item => {
        item.value.forEach((next, nextIndex) => {

          this.$set(item.value, nextIndex, `${item.name}:${next}`)
        })
        return item.value
      })


      this.speDetailList = []
      const detailArr = this.allGroups(arr)
      console.log(detailArr, "detailArr")
      detailArr.forEach(item => {
        if (this.preSaleFlag == 1) {
          this.speDetailList.push({ goodsSpec: item, price: null, innerPrice: null, stockNum: null, innerDepositPrice: null, depositPrice: null })
        } else {
          this.speDetailList.push({ goodsSpec: item, price: null, innerPrice: null, stockNum: null })
        }

      })
    },
    multi(arr1, arr2) {
      console.log(arr1, arr2, "arr1,arr2")
      if (arr1.length == 0) { // arr1 是空数组 []
        return arr2;
      }
      if (arr2.length == 0) {
        return arr1;
      }
      let res = [];
      for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
          res.push(String(arr1[i]) + ';' + String(arr2[j]))
        }
      }
      return res;
    },
    //生成明细函数 2
    allGroups(arr) {
      return arr.reduce((total, cur) => {
        console.log(total, cur, "total,cur")
        let ress = this.multi(total, cur);
        console.log(ress, "ress")
        return ress;
      }, []);
    },
    // 批量设置
    setMarketValue(val) {
      this.speDetailList.forEach((e, i) => {
        e.price = val
      })
    },
    setLowPrice(val) {
      this.speDetailList.forEach((e, i) => {
        e.innerPrice = val
      })
    },
    setStock(val) {
      this.speDetailList.forEach((e, i) => {
        e.stockNum = val
      })
    },
    setDepositPrice(val) {
      this.speDetailList.forEach((e, i) => {
        e.depositPrice = val
      })
    },
    setInnerDepositPrice(val) {
      this.speDetailList.forEach((e, i) => {
        e.innerDepositPrice = val
      })
    },
    // 保存
    save() {

  if(this.speDetailList.length<=0){
    this.$message.warning("请立即生成规格明细");
    return false
  }
      let flag = true
      this.speDetailList.forEach(item => {
        if (item.price == '' || (!item.price && item.price !== 0)) {
          flag = false
        }
        if (item.innerPrice == '' || (!item.innerPrice && item.innerPrice !== 0)) {
          flag = false
        }
        if (item.stockNum == '' || (!item.stockNum )) {
          flag = false
        }
      })
      if(!flag){
        this.$message.warning("请填写规格明细信息");
        return false
      }

      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.preSaleFlag == 1) {
            this.formData.depositStartTime = this.formData.depositRange[0]
            this.formData.depositEndTime = this.formData.depositRange[1]
            this.formData.payStartTime = this.formData.paymentRange[0]
            this.formData.payEndTime = this.formData.paymentRange[1]
          }
          this.formData.preSaleFlag = this.preSaleFlag
          const arr = this.speDetailList.map(ele => {
            const strArr = ele.goodsSpec.split(',')
            const arr1 = strArr.map((value, index) => {
              return { name: this.formData.specLabelValue[index].name, value: value }
            })
            ele.goodsSpecList = arr1
          })
          this.formData.goodsSkuEntities = this.speDetailList
          // 如果商品id已经存在，说明是从编辑页面点进来的。走编辑接口，否则走保存接口
          if (this.id === undefined) {
            addGoodsInfo(this.formData).then((res) => {
              this.$message.success('保存成功')
              this.$router.go(-1)
            })
          } else {
            updateGoodsInfo(this.formData).then((res) => {
              this.$message.success("编辑成功");
              this.$router.go(-1);
            });
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 取消
    cancel() {
      this.$router.go(-1);
    },
    changeDepositRange(val) {
      this.formData.depositRange = val
    },
    changePaymentRange(val) {
      this.formData.paymentRange = val
    },
    isNumber(value) {
      return !isNaN(parseFloat(value)) && isFinite(value)
    }
  }
};
</script>

<style lang="scss" scoped>
.icon-close {
  font-size: 18px;
  margin-left: 5px;
}

.icon-close:hover {
  color: rgb(16, 103, 233);
}

.edit {
  .submit {
    margin-top: 100px;
    display: flex;
    justify-content: center;
  }

  ::v-deep .el-link--inner {
    margin-right: 10px;
  }

  .divider {
    height: 5px;
    background: #eee;
    margin: 10px 0;
  }
}

.el-input {
  width: 220px;
}

.itemBox {
  display: flex;
  margin-top: 20px;

  flex-wrap: wrap;

  .chexboxList {
    // flex: 1;
    position: relative;
    // padding: 10px 20px;
    // line-height: 0 !important;
    display: inline-block;
    // text-align: center;
    align-items: center;
    border: 1px solid #c2e7b0;
    border-radius: 10px;
    margin-right: 10px;
    margin-bottom: 20px;
  }

  .labelCheckbox {

    // line-height: 0 !important;
    // padding: 10px 20px;
    // display: inline-block;
    span {
      display: inline-block;
      padding-left: 5px;
      padding-right: 5px;
    }
  }

  .potions {
    position: absolute;
    right: -8px;
    top: -8px;
  }
}

.tips {
  color: #f56c6c;
  font-size: 12px;
  padding: 0;
  margin: 0;
}

.el-tag+.el-tag {
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

.batch_inp {
  width: 170px;
  margin-left: 5px;
  margin-right: 53px;
}</style>
