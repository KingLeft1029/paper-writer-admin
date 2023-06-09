<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="120px">
    <el-form-item :label="$t('USER_NAME')+'：'" prop="nickName">
      <el-input v-model="user.nickName" maxlength="30" />
    </el-form-item>
    <el-form-item :label="$t('PHONE_NO')+'：'" prop="phonenumber">
      <el-input v-model="user.phonenumber" maxlength="11" />
    </el-form-item>
    <el-form-item :label="$t('EMAIL')+'：'" prop="email">
      <el-input v-model="user.email" maxlength="50" />
    </el-form-item>
    <el-form-item :label="$t('GENDER')+'：'">
      <el-radio-group v-model="user.sex">
        <el-radio label="0">{{$t('Male')}}</el-radio>
        <el-radio label="1">{{$t('Female')}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"  @click="submit">{{$t('Confirm')}}</el-button>
      <el-button type="danger"  @click="close">{{$t('Cancel')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserProfile } from "@/api/system/user";

export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      // 表单校验
      rules: {
        nickName: [
          { required: true, message: this.$t('BNWK'), trigger: "blur" }
        ],
        email: [
          { required: true, message: this.$t('BNWK'), trigger: "blur" },
          {
            type: "email",
            message: this.$t('ZQDYX'),
            trigger: ["blur", "change"]
          }
        ],
        phonenumber: [
          { required: true, message: this.$t('BNWK'), trigger: "blur" },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: this.$t('ZQDSJ'),
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserProfile(this.user).then(response => {
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
