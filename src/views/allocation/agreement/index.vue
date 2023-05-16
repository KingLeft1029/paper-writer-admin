<template>
  <div class="editor app-container">
    <editor :minHeight="400" ref="editor" :value="value" @input="(val) => (value = val)"></editor>
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
      value: null,
    };
  },

  created () {
    startPage(3).then((res) => {
      this.value = res.data.agreement;
    });
  },

  methods: {
    success () {
      updateShopConfig({ agreement: this.value }).then((res) => {
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