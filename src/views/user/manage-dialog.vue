<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="show" width="700px" append-to-body>
    <div class="dialog-box">
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('Nickname')+'：'"  required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('Email')+'：'"  required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('PERMISSIONDISABLING')+'：'" prop="userName">
          <el-radio-group v-model="form.radio">
            <el-radio :label="1">{{$t('ALL_DISABLED')}}</el-radio>
            <el-radio :label="2">{{$t('Partial')}}</el-radio>
            <el-radio :label="2">{{$t('ALL_ENABLED')}}</el-radio>
          </el-radio-group>
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
      title: '用户管理',
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
    open() {
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
/* @import url(); 引入公共css类 */
</style>
