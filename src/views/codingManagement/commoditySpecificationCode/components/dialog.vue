<template>
  <div>
    <!-- Form -->

    <el-dialog
      title="添加/编辑商品规格编码"
      ppend-to-body
      width="900px"
      :visible.sync="dialogFormVisible"
      destroy-on-close
      :before-close="close"
      ref="elDialog"
    >
      <el-form
        :inline="true"
        style="text-align: center"
        :model="form"
        ref="formVaild"
        class="demo-form-inline"
        :rules="rules"
        label-width="100px"
        :disabled="formDisabled"
      >
        <el-form-item label="规格名称" prop="attrName">
          <el-input
            v-model="form.attrName"
            placeholder="请输入规格名称"
            :maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item label="代码" prop="attrValue">
          <el-input
            v-model="form.attrValue"
            placeholder="请输入代码"
            :maxlength="20"
          ></el-input>
        </el-form-item>
        <el-form-item> </el-form-item>
      </el-form>
      <div v-for="(item, index) in form.details" :key="index">
        <el-form
          :inline="true"
          style="text-align: center"
          :model="item"
          :ref="`formVaild2${index}`"
          class="demo-form-inline"
          label-width="100px"
          :disabled="formDisabled"
        >
          <el-form-item
            :rules="[
              {
                required: true,
                message: '请填写规格值',
                trigger: 'blur',
              },
            ]"
            label="规格值"
            prop="attrDetailName"
          >
            <el-input
              v-model="item.attrDetailName"
              placeholder="请输入规格值"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="代码"
            :rules="[
              {
                required: true,
                message: '请填写代码',
                trigger: 'blur',
              },
              {
                validator: repeat,
                trigger: 'change',
              },
            ]"
            prop="attrDetailValue"
          >
            <!--  , -->
            <el-input
              v-model="item.attrDetailValue"
              placeholder="请输入代码"
              :maxlength="20"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div v-show="!formDisabled">
              <i
                v-show="index != form.details.length - 1"
                class="el-icon-close"
                style="fontsize: 20px; font-weight: 600"
                @click="clearEvent(index)"
              ></i>
              <i
                class="el-icon-plus"
                v-show="index == form.details.length - 1"
                style="fontsize: 20px; font-weight: 600"
                @click="addDetails(index)"
              ></i>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="!form.showButton" slot="footer" class="dialog-footer">
        <el-button @click="cannl">取 消</el-button>
        <el-button type="primary" @click="enterEvent(EditStatus, formDisabled)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogFormVisible: {
      type: Boolean,
      default: false,
    },
    newForm: {
      type: Object,
      default: (_) => {},
    },
    EditStatus: {
      type: Boolean,
      default: false,
    },
    formDisabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      form: {
        details: [],
      },
      rules: {
        attrName: [
          { required: true, message: "规格名称不能为空", trigger: "blur" },
        ],
        attrValue: [
          { required: true, message: "代码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    dialogFormVisible() {
      if (!this.dialogFormVisible) {
        this.$refs.formVaild.resetFields();
        this.form.details.forEach(($v1, index) => {
          this.$refs[`formVaild2${index}`][0].resetFields();
        });
      }
    },
  },
  computed: {
    editForm() {
      return this.newForm || {};
    },
  },
  mounted() {
    this.form.details.push({
      attrDetailName: "",
      attrDetailValue: "",
    });
    if (this.editForm.obj?.id) {
      this.form = this.editForm.obj;
    }
  },
  methods: {
    repeat(rule, value, callback) {
      let formList = this.form.details;
      let indexS = formList.findIndex(($v1) => {
        return $v1.attrDetailValue == value;
      });
      let newList = formList.filter(($v1, index) => {
        if (index != indexS) {
          return $v1;
        }
      });
      let validList = newList.map(($v1) => $v1.attrDetailValue);
      if (validList.indexOf(value) == -1) {
        callback();
      } else {
        return callback(new Error("代码不能重复"));
      }
    },
    clearEvent(indexS) {
      this.form.details.splice(indexS, 1);
    },
    addDetails(indexS) {
      this.$refs[`formVaild2${indexS}`][0].validate((Flag) => {
        if (Flag) {
          this.form["details"].push({
            attrDetailName: undefined,
            attrDetailValue: undefined,
          });
        }
      });
    },
    enterEvent(Status, viewStatus) {
      let newValid = [];

      this.$refs.formVaild.validate((valid) => {
        if (valid) {
          this.form.details.forEach(($v1, index) => {
            this.$refs[`formVaild2${index}`][0].validate((Flag) => {
              newValid.push(Flag);
            });
          });

          if (newValid.indexOf(false) == -1) {
            this.$emit("enterEvent", this.form, Status, viewStatus);
          }
        }
      });
    },
    cannl() {
      this.$emit("update:dialogFormVisible", false);
      this.$refs.elDialog;
    },
    close() {
      this.$emit("update:dialogFormVisible", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>