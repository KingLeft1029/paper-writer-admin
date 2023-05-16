<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="login-title">
        <img src="../assets/images/index/log.png" alt="" />
        <h3 class="title">用户登录</h3>
      </div>
      <el-form-item prop="pwdBackNumber" label-width="100px" label="注册手机:">
        <el-input
          v-model="loginForm.pwdBackNumber"
          type="text"
          auto-complete="off"
          placeholder="请输入注册手机号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
          <div class="log-green"></div>
        </el-input>
      </el-form-item>
      <el-form-item prop="newPwd" label-width="100px" label="新密码:">
        <el-input
          v-model="loginForm.newPwd"
          type="password"
          auto-complete="off"
          placeholder="请输入新密码"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
          <div class="log-green"></div>
        </el-input>
      </el-form-item>
      <el-form-item prop="pwdBackCode" label="验证码:" label-width="100px">
        <el-input
          v-model="loginForm.pwdBackCode"
          auto-complete="off"
          placeholder="请输入短信验证码"
        >
          <svg-icon
            slot="prefix"
            icon-class="validCode"
            class="el-input__icon input-icon"
          />
          <template slot="suffix">
            <div class="copy-button">
              <el-link :underline="false" @click="copy">{{ copyText }}</el-link>
            </div>
          </template>
        </el-input>
      </el-form-item>
      <div
        style="display: flex; justify-content: flex-end; padding-right: 10px"
      >
        <el-link
          :underline="false"
          @click="
            () => {
              $router.push({ path: '/login' });
            }
          "
          >去登陆</el-link
        >
      </div>
      <el-form-item style="width: 100%">
        <div style="padding-top: 20px">
          <el-button
            size="medium"
            type="primary"
            style="width: 100%; background: #00706c"
            @click.native.prevent="handleLogin"
          >
            <span>下一步</span>
          </el-button>
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2018-2021 ruoyi.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { pwdBackGetCode, pwdBackCheck, pwdBackSet } from "@/api/login";
export default {
  name: "Login",
  data() {
    return {
      copyText: "发送验证码",
      setInterval: null,
      loginForm: {
        pwdBackNumber: null,
        pwdBackCode: null,
        newPwd: null,
      },
      loginRules: {
        pwdBackNumber: [
          { required: true, trigger: "blur", message: "请输入注册的手机号" },
        ],
        pwdBackCode: [
          { required: true, trigger: "blur", message: "请输入验证码" },
        ],
        newPwd: [{ required: true, trigger: "blur", message: "请输入新密码" }],
      },
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {},
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate((flag) => {
        if (flag) {
          const { pwdBackNumber, pwdBackCode, newPwd } = this.loginForm;
          pwdBackCheck(pwdBackNumber, pwdBackCode)
            .then((res) => {
              if (res.code == 200) {
                return pwdBackSet(pwdBackNumber, newPwd);
              }
            })
            .then((res) => {
              this.$message.success("密码修改成功！");
              this.$router.push({
                path: "/login",
              });
            });
        }
      });
    },
    copy() {
      if (!this.loginForm.pwdBackNumber) {
        this.$message.warning("请输入手机号");
        return;
      }
      if (this.setInterval) {
        this.$message.warning("请勿重复获取验证码");
        return;
      }
      this.copyText = "60秒重新获取";
      let num = 59;

      pwdBackGetCode(this.loginForm.pwdBackNumber).then((res) => {
        this.$message.success("验证码已发送");
      });
      this.setInterval = setInterval(() => {
        this.copyText = `${num--}秒重新获取`;
        if (num === 0) {
          this.copyText = "发送验证码";
          clearInterval(this.setInterval);
          this.setInterval = null;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.copy-button {
  height: 100%;
  padding-right: 5px;
  display: flex;
  align-items: center;
}
.retrieve {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-input__inner {
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}
.login {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/index/newlogin-background.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.title {
  font-size: 24px;
  letter-spacing: 2.8px;
  line-height: 50px;
  font-weight: 500;
  margin-top: 50px;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  margin-right: 25%;
  .login-title {
    padding-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-input {
    height: 38px;

    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
