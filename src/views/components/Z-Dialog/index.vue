<!--
 * @Author: mikeShn
 * @Date: 2022-03-18 18:06:04
 * @LastEditTime: 2022-04-19 14:17:51
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\Z-Dialog\index.vue
 * @Description: 文件说明
-->
<template>
  <el-dialog class="dialog" ref="myDialog" :title="title" :visible="dialogVisible" :width="width" :before-close="done">
    <dialog-content class="dialog-content" v-bind="$data" ref="content"></dialog-content>
    <template v-slot:footer>
      <div v-if="seeButton" class="dialog-button">
        <el-button type="primary" @click="close(true)" :loading="loadingBotton">{{ $t('Confirm') }}</el-button>
        <el-button @click="close(false)" :loading="loadingBotton">{{ $t('Cancel') }}</el-button>
      </div>
    </template>

  </el-dialog>
</template>
<script>
export default {

  provide() {
    return {
      $CD: this.that,
    };
  },
  data() {
    return {
      title: "提示",
      dialogVisible: true,
      beforeClose: null,
      width: "50%",
      seeButton: true,
      loadingBotton: false

    };
  },
  methods: {
    done() {
      this.dialogVisible = false;
    },
    close(flag) {
      this.loadingBotton = true
      if (this.beforeClose && this.beforeClose.constructor == Function) {
        this.beforeClose.call(this.that, flag, this.$refs.content, this.done);
        this.loadingBotton = false
      }
      setTimeout(() => {
        this.loadingBotton = false
      })
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
.dialog {
  .dialog-button {

    display: flex;
    justify-content: flex-end;
  }

}

::v-deep .el-dialog__header {
  border-bottom: 1px solid #EEEEEE;
}

::v-deep .el-dialog__footer {
  padding: 16px 24px 20px;
  border-top: 1px solid #EEEEEE;
}
</style>
