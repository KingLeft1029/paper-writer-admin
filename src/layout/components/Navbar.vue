<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
      v-if="!topNav"
    />
    <top-nav id="topmenu-container" class="topmenu-container" v-if="topNav" />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!--<el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>-->
      </template>

      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" style="border-radius: 50%" />
          <i class="el-icon-caret-bottom" style="margin-left: 10px" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>{{ $t("PERSONAL_CENTER") }}</el-dropdown-item>
          </router-link>
          <!--<el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>-->
          <el-dropdown-item divided @click.native="logout">
            <span>{{ $t("LOG_OFF") }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <router-link to="/">
        <i
          class="el-icon-s-home"
          style="font-size: 18px; margin-right: 30px"
        ></i
      ></router-link>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          {{ $t("LANGUAGE") }}
          <i class="el-icon-caret-bottom" style="margin-left: 5px" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="language('zh')">
            <span>简体中文</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="language('en')">
            <span>English</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i
        class="el-icon-switch-button"
        @click="logout"
        style="font-size: 18px; margin-right: 40px; cursor: pointer"
      ></i>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import Cookies from "js-cookie";

export default {
  components: {
    Breadcrumb,
    TopNav,
    Hamburger,
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    topNav: {
      get() {
        return this.$store.state.settings.topNav;
      },
    },
  },
  created(){
    document.title=this.$t('MZZJ_TITLE')
  },
  methods: {
    language(val) {

      Cookies.set("language", val);
      store.commit('SET_LANG', val);
      this.$i18n.locale = val;
      document.title=this.$t('MZZJ_TITLE')

    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$warnMag(`${this.$t("ARE_YOU_SURE_TO_LOGOUT")}？`)
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/index";
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;

  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      &:last-child {
        margin-right: 30px;
      }

      .avatar-wrapper {
        height: 100%;
        position: relative;
        font-size: 14px;
        display: flex;
        align-items: center;
        margin-right: 30px;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
