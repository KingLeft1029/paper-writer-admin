<template>
  <el-form ref="form" :model="formData" class="start-pages app-container" label-width="130px">
    <el-form-item label="系统启动页图片:" :rules="[{ required: true, message: '请上传图片', trigger: 'blur' }]" prop="startPic">
      <img-upload @input="(val) => (formData.startPic = val)" :limit="1" :value="formData.startPic" :isShowTip="false">
      </img-upload>
    </el-form-item>
    <el-form-item label="启动页缓冲时长:" :rules="[
        { required: true, message: '请输入时长', trigger: 'blur' },
        { validator: checkAge, trigger: 'blur' },
      ]" prop="startTime">
      <el-input v-model="formData.startTime"></el-input> 秒
    </el-form-item>
    <el-form-item label="是否开启:" :rules="[{ required: true, message: '请选择', trigger: 'blur' }]" prop="startOpen">
      <el-radio v-model="formData.startOpen" label="1">是</el-radio>
      <el-radio v-model="formData.startOpen" label="0">否</el-radio>
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
        startOpen: null,
        startPic: null,
        startTime: null,
      },
    };
  },

  created () {
    startPage(0).then((res) => {
      const { startOpen, startPic, startTime } = res.data;
      this.formData.startOpen = startOpen;
      this.formData.startPic = startPic;
      this.formData.startTime = startTime;
    });
  },

  methods: {
    checkAge (rules, val, callback) {
      if (!Number.isInteger(Number(val))) {
        return callback("请输入整数数值");
      } else {
        return callback()
      }
    },
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