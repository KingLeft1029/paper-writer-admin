<!--
 * @Author: mikeShn
 * @Date: 2022-03-18 18:06:04
 * @LastEditTime: 2022-04-19 14:17:51
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\Z-Dialog\index.vue
 * @Description: 文件说明
-->
<template>
  <el-dialog
    class="dialog"
    ref="myDialog"
    :title="title"
    :visible="dialogVisible"
    :width="width"
    :before-close="() => close(false)"
  >
    <dialog-content
      class="dialog-content"
      v-bind="$data"
      ref="content"
    ></dialog-content>
    <div class="dialog-button">
      <el-button type="primary" @click="close(true)">确 定</el-button>
      <el-button @click="close(false)">取 消</el-button>
    </div>
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
    };
  },
  methods: {
    done() {
      this.dialogVisible = false;
    },
    close(flag) {
      if (this.beforeClose && this.beforeClose.constructor == Function) {
        this.beforeClose.call(this.that, flag, this.$refs.content, this.done);
        //  console.log(this.$refs.content)
      }
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.dialog {
  .dialog-content {
    padding: 20px 0;
  }
  .dialog-button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
