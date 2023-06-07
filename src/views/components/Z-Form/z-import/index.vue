<template>
  <div class="container">
    <el-upload
      ref="upload"
      :limit="1"
      accept=".xlsx, .xls"
      :headers="headers"
      :action="api + url"
      :disabled="disabled"
      :on-change="handleFileChange"
      :on-exceed="exceed"
      :auto-upload="false"
      drag
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip text-center" slot="tip">
        <span>仅允许{{ fileType.join(",") }}格式文件。</span>
      </div>
    </el-upload>
  </div>
</template>
<script>
import { getToken } from "@/utils/auth";
export default {
  props: {
    fileType: {
      type: Array,
      default: () => [" xls", "xlsx"],
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    url: String,
  },
  data() {
    return {
      api: window.g.api,
      headers: { Authorization: "Bearer " + getToken() },
      fileList: [],
    };
  },
  methods: {
    exceed(files, fileList) {
      this.$message.warning("已超出文件添加限制！");
    },
    handleFileChange(file, fileList) {
      this.fileList = fileList;
    },
  },
};
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>