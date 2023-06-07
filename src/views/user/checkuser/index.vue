<template>
  <div class="app-container">
    <img class="back" src="@/assets/icons/back.png" @click="back" alt="">

    <div class="box-shadow">
      <div class="box-title">{{ $t('BASE_INFORMATION') }}</div>
      <el-row :gutter="20">
        <el-col>
          <span>{{ $t('AVATAR') }}：</span>
          <img :src="avatar" class="user-avatar" style="border-radius: 50%" />
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt25">
        <el-col :span="6">
          <span>{{ $t('UserID') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('Nickname') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('Email') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('Gender') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt25">
        <el-col :span="6">
          <span>{{ $t('Country') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('Phone') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('Birthday') }}：</span>
          <span>0230407000000</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('Age') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt25">
        <el-col :span="6">
          <span>{{ $t('IDENTIFY') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="eidt">{{ $t('CHANGE_IDENTIFY') }}</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('LOGON_MODE') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
    </div>
    <div class="box-shadow">
      <div class="box-title">{{ $t('Post') }}</div>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>{{ $t('PUBLISHED_COURSE') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/content/coursesmanage')">{{ $t('More') }}</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('COMPLETION_RATE') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/content/articlemanage')">{{ $t('More') }}</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('PUBLISHED_ARTICLE') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/content/book')">{{ $t('More') }}</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('PUBLISHED_BOOKS') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/content/couresaudit')">{{ $t('More') }}</span>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="mt25">
        <el-col :span="6">
          <span>{{ $t('IDENTIFY') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/content/audit')">{{ $t('More') }}</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('ARTICLE_UNDER_REVIEW') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/content/book')">{{ $t('More') }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="box-shadow">
      <div class="box-title">{{ $t('PAID_INFORMATION') }}</div>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>{{ $t('RECHAGE_INK') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/finance/recharge')">{{ $t('More') }}</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('STUDY_INK') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/user/apply')">{{ $t('More') }}</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('Inkjet') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/user/give')">{{ $t('More') }}</span>
        </el-col>
      </el-row>
    </div>
    <div class="box-shadow">
      <div class="box-title">{{ $t('INK_COST') }}</div>
      <el-row :gutter="20">
        <el-col :span="6">
          <span>{{ $t('ENROLL_COURSE') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/user/apply')">{{ $t('More') }}</span>
        </el-col>
        <el-col :span="6">
          <span>{{ $t('REWARD_ARTICLE') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20" @click="toMore('/user/give')">{{ $t('More') }}</span>
        </el-col>

      </el-row>
    </div>

    <edit-dialog ref="edit"></edit-dialog>
  </div>
</template>

<script>
import EditDialog from './edit-dialog.vue'
import { mapGetters } from "vuex";
export default {
  components: {
    EditDialog
  },
  computed: {
    ...mapGetters(["avatar"]),
  },
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    // 修改身份
    eidt() {
      this.$refs.edit.open()
    },
    toMore(path) {
      this.$router.push(path)
    }
  }
};
</script>

<style lang="scss" scoped>
.user-avatar {
  cursor: pointer;
  width: 60px;
  height: 60px;
  vertical-align: middle;

}
</style>
