<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="160px">
    <el-form-item :label="$t('JMM')+'：'" prop="oldPassword">
      <el-input v-model="user.oldPassword" :placeholder="$t('Enter')" type="password" show-password/>
    </el-form-item>
    <el-form-item :label="$t('XMM')+'：'" prop="newPassword">
      <el-input v-model="user.newPassword" :placeholder="$t('Enter')" type="password" show-password/>
    </el-form-item>
    <el-form-item :label="$t('QRMM')+'：'" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" :placeholder="$t('Enter')" type="password" show-password/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  @click="submit">{{$t('Confirm')}}</el-button>
      <el-button type="danger"  @click="close">{{$t('Cancel')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/user";

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error(this.$t('TWO_PASSWORDS')));
      } else {
        callback();
      }
    };
    return {
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: this.$t('BNWK'), trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: this.$t('BNWK'), trigger: "blur" },
          { min: 6, max: 20, message: this.$t('PASSWORD_LENGTH'), trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: this.$t('BNWK'), trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
            this.$modal.msgSuccess(this.$t('OPERTATE_SUCCESS'));
          });
        }
      });
    },
    close() {
      this.$tab.closePage();
    }
  }
};
</script>
