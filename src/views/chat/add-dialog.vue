<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="show" width="720px" append-to-body>
    <div class="dialog-box">
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('QUN_M')" prop="userName" style="position:relative">
          <el-input v-model="form.rate" :placeholder="$t('Enter')" clearable
           />
        </el-form-item>
        <el-form-item :label="$t('QUN_M')" prop="userName" style="position:relative">
        	<el-select clearable v-model="checkboxList"  style="width:100%">
					<el-option v-for="item in 31" :key="item" :value="item">{{item}}</el-option>
				</el-select>
        </el-form-item>
        <el-form-item :label="$t('QUN_ZI')" prop="userName" style="position:relative">
          <el-input v-model="form.rate" :placeholder="$t('Enter')" disabled clearable
           />
        </el-form-item>
        <el-form-item :label="$t('Administrator')" prop="userName" style="position:relative">
        	<el-select clearable v-model="checkboxList"  style="width:100%">
					<el-option v-for="item in 31" :key="item" :value="item">{{item}}</el-option>
				</el-select>
        </el-form-item>
        <el-form-item :label="$t('AdministratorID')" prop="userName" style="position:relative">
          <el-input v-model="form.rate" :placeholder="$t('Enter')" disabled clearable
           />
        </el-form-item>
        <el-form-item :label="$t('GROUP_AVATAR')" prop="userName" style="position:relative">
          <el-input v-model="form.rate" :placeholder="$t('Enter')" disabled clearable
           />
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{ $t("Cancel") }}</el-button>
      <el-button type="primary" @click="submitForm">{{
        $t("Confirm")
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: '',
  components: {},
  data() {
    return {
      title: '',
      show: false,
      form: {
        radio: 1
      },
      rules: {
        userName: [
          {
            required: true,
            message: this.$t("PLEASE_SELECT_WHETHER"),
            trigger: "change",
          },
        ],

      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    open(num) {
      if (num == 1) {
        this.title = '配置文章佣金比例'
      } else {
        this.title = '配置课程佣金比例'
      }
      this.show = true
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
      };
      this.resetForm("form");
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t("UPDATED_SUCCESS"));
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t("ADD_SUCCESS"));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.show = false;
      this.reset();
    },
  },
  created() {

  },
  mounted() {

  },
}
</script>
<style scoped>
.rate-box{
  position: absolute;
right: 0;
  top:3px ;
  height: 31px;
width: 32px;
text-align: center;
  line-height: 31px;
  border-left: 1px solid #DCDFE6;
}
/* @import url(); 引入公共css类 */
</style>
