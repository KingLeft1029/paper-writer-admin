<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <div class="login-title">
        <h3 class="title">{{ $t("USER_LOGIN") }}</h3>
      </div>
      <div class="language">
        <span>{{ $t("LANGUAGE") }}：</span>
        <el-radio-group v-model="radio" @change="radioChange">
          <el-radio label="zh"
            ><span >简体中文</span></el-radio
          >
          <el-radio label="en"
            ><span >English</span></el-radio
          >
        </el-radio-group>
      </div>
      <el-form-item prop="username">
        <div

        >
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            :placeholder="$t('PLEASE_USER')"
          >
            <svg-icon
              slot="prefix"
              icon-class="user"
              class="el-input__icon input-icon"
            />
            <div class="log-green"></div>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item prop="password">
        <div

        >
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            :placeholder="$t('Password')"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon input-icon"
            />
          </el-input>
        </div>
      </el-form-item>
      <el-form-item prop="code" v-if="captchaOnOff">
        <div

        >
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            :placeholder="$t('ENTER_THE_VER')"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </div>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        >{{ $t("REMEMBER") }}</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">{{ $t("LOG_IN") }}</span>
          <span v-else>{{ $t("LOADING") }}</span>
        </el-button>
        <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'"
            >{{$t('REGISTER_NOW')}}</router-link
          >
        </div>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
      <span>Copyright © 2018-2021 ruoyi.vip All Rights Reserved.</span>
    </div> -->
  </div>
</template>

<script>
import store from "@/store";
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
export default {
  name: "Login",
  data() {
    return {
      radio: Cookies.get("language") || "en",
      codeUrl: "",
      loginForm: {
        username: "admin",
        password: "admin123",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("PLEASE_INPUT_YOUR_ACCOUNT"),
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: this.$t("PLEASE_INPUT_YOUR_PASSWORD"),
          },
        ],
        code: [
          {
            required: true,
            trigger: "change",
            message: this.$t("PLEASE_INOUT_YOUR_VERIFICATION_CODE"),
          },
        ],
      },
      loading: false,
      // 验证码开关
      captchaOnOff: true,
      // 注册开关
      register: false,
      redirect: undefined,
    };
  },
  components: {},
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCode();
    this.getCookie();
    document.title=this.$t('MZZJ_TITLE')
  },
  methods: {
    radioChange(val) {

      Cookies.set("language", val);
      store.commit('SET_LANG', val);
      this.$i18n.locale = val;
      document.title=this.$t('MZZJ_TITLE')
    },
    getCode() {
      getCodeImg().then((res) => {
        this.captchaOnOff =
          res.captchaOnOff === undefined ? true : res.captchaOnOff;
        if (this.captchaOnOff) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          Cookies.set("language", this.radio);
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              if (this.captchaOnOff) {
                this.getCode();
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
// .el-checkbox__inner {
//   background-color: rgba(255, 255, 255, 0);
// }
.language {
  // color: #fff;
  font-size: 14px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}
// .el-input__inner {
//   background-color: rgba(255, 255, 255, 0);
//   color: #fff;
// }
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}
.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .login-title {
    // color: #fff;
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
