<template>
  <el-form ref="form" :model="formData" class="start-pages app-container" label-width="140px">
    <el-form-item label="系统引导页图片:" :rules="[{ required: true, message: '请上传图片', trigger: 'blur' }]" prop="guidePic">
      <img-upload @input="(val) => (formData.guidePic = val)" :limit="5" :value="formData.guidePic" :isShowTip="false">
      </img-upload>
    </el-form-item>
    <el-form-item label="是否开启:" :rules="[{ required: true, message: '请选择', trigger: 'blur' }]" prop="guideOpen">
      <el-radio v-model="formData.guideOpen" label="1">是</el-radio>
      <el-radio v-model="formData.guideOpen" label="0">否</el-radio>
    </el-form-item>
    <el-form-item>
      <el-button @click="$router.go(-1)">取消</el-button>
      <el-button type="success" @click="success"> 确认</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import ImgUpload from "@/components/ImageUpload";
import { startPage, updateShopConfig } from "@/api/allocation/shopConfig";
export default {
  components: {
    ImgUpload,
  },

  data () {
    return {
      formData: {
        guideOpen: null,
        guidePic: null,
      },
    };
  },

  created () {
    startPage(1).then((res) => {
      const { guideOpen, guidePic } = res.data;
      this.formData.guideOpen = guideOpen;
      this.formData.guidePic = guidePic;
    });
  },

  methods: {
    success () {
      this.$refs.form.validate((flag) => {
        if (flag) {
          updateShopConfig(this.formData).then((res) => {
            this.$message.success("保存成功");
          });
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-input {
  width: 220px;
}
</style>