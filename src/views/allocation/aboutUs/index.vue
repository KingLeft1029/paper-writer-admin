<template>
  <div class="editor app-container">
    <editor :minHeight="400" ref="editor" :value="aboutUs" @input="(val) => (aboutUs = val)"></editor>
    <div class="button">
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="primary" @click="success">确定</el-button>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor";

import { startPage, updateShopConfig } from "@/api/allocation/shopConfig";
export default {
  components: {
    Editor,
  },

  data () {
    return {
      aboutUs: null,
    };
  },

  created () {
    startPage(2).then((res) => {
      this.aboutUs = res.data.aboutUs;
    });
  },

  methods: {
    success () {
      updateShopConfig({ aboutUs: this.aboutUs }).then((res) => {
        this.$message.success("保存成功");
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.button {
  margin: 20px 10px;
}
</style>