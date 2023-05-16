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
        <search id="header-search" class="right-menu-item" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
        @visible-change="getTotalNotice"
      >
        <div>
          <el-badge :value="backTotalCount" :max="99" class="item">
            <i class="el-icon-message-solid" />
          </el-badge>
        </div>
        <el-dropdown-menu slot="dropdown">
          <div class="dropdown-item">
            <div style="padding-left: 14px">消息提示</div>
            <div></div>
          </div>
          <router-link to="/allocation/notice" v-if="this.deptId != '110'">
            <el-dropdown-item>
              <div class="dropdown-item">
                <div>系统消息</div>
                <div>（{{ systemMsg }}）</div>
              </div>
            </el-dropdown-item>
          </router-link>
          <router-link to="/message/orderMessage">
            <el-dropdown-item>
              <div class="dropdown-item">
                <div>订单消息</div>
                <div>（{{ orderMsg }}）</div>
              </div>
            </el-dropdown-item>
          </router-link>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/user/profile">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <el-dropdown-item @click.native="setting = true">
            <span>布局设置</span>
          </el-dropdown-item>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import TopNav from "@/components/TopNav";
import Hamburger from "@/components/Hamburger";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import { getTotalNoticeCount } from "@/api/index/index.js";

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
  data() {
    return {
      backTotalCount: 0,
      systemMsg: 0,
      orderMsg: 0,
    };
  },
  computed: {
    deptId() {
      return this.$store.getters.deptId;
    },
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
  created() {
    getTotalNoticeCount().then((res) => {
      this.orderMsg = res.data.orderCount;
      this.systemMsg = res.data.systemCount;
      if (this.deptId == "110") {
        this.backTotalCount = res.data.orderCount;
      } else {
        this.backTotalCount = res.data.backTotalCount;
      }
    });
  },
  methods: {
    getTotalNotice(flag) {
      if (flag) {
        getTotalNoticeCount().then((res) => {
          this.orderMsg = res.data.orderCount;
          this.systemMsg = res.data.systemCount;
          if (this.deptId == "110") {
            this.backTotalCount = res.data.orderCount;
          } else {
            this.backTotalCount = res.data.backTotalCount;
          }
        });
      }
    },
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    async logout() {
      this.$confirm("确定退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$store.dispatch("LogOut").then(() => {
            location.href = "/admin";
          });
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.dropdown-item {
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 400px;
  height: 50px;
  align-items: center;
}
.el-icon-message-solid {
  font-size: 24px;
  margin: 0;
}
.navbar {
  padding-top: 10px;
  height: 60px;
  //overflow: hidden;
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
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
