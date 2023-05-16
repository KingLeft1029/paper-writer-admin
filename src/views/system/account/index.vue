<template>
  <div class="app-container">
    <div class="user-info-head" @click="editCropper()"><img v-bind:src="options.img" title="点击上传头像"
        class="img-circle img-lg" /></div>
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body @opened="modalOpened"
      @close="closeDialog">
      <el-row>
        <el-col :xs="24" :md="12" :style="{height: '350px'}">
          <vue-cropper ref="cropper" :img="options.img" :info="true" :autoCrop="options.autoCrop"
            :autoCropWidth="options.autoCropWidth" :autoCropHeight="options.autoCropHeight" :fixedBox="options.fixedBox"
            @realTime="realTime" v-if="visible" />
        </el-col>
        <el-col :xs="24" :md="12" :style="{height: '350px'}">
          <div class="avatar-upload-preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :lg="2" :md="2">
          <el-upload action="#" :http-request="requestUpload" :show-file-list="false" :before-upload="beforeUpload">
            <el-button size="small">
              选择1
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-col>
        <el-col :lg="{span: 1, offset: 2}" :md="2">
          <el-button icon="el-icon-plus" size="small" @click="changeScale(1)"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-minus" size="small" @click="changeScale(-1)"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-refresh-left" size="small" @click="rotateLeft()"></el-button>
        </el-col>
        <el-col :lg="{span: 1, offset: 1}" :md="2">
          <el-button icon="el-icon-refresh-right" size="small" @click="rotateRight()"></el-button>
        </el-col>
        <el-col :lg="{span: 2, offset: 6}" :md="2">
          <el-button type="primary" size="small" @click="uploadImg()">提 交</el-button>
        </el-col>
      </el-row>
    </el-dialog>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属角色">
            {{form.roleGroup}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名">
            {{form.realName}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号">
            {{form.phonenumber}}
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="账号" prop="realName">
            <el-input v-model="form.realName" placeholder="账号" maxlength="30" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="user.newPassword" placeholder="请输入新密码" type="password" show-password />
          </el-form-item>form
        </el-col>
        <el-col :span="12">
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword" placeholder="请确认密码" type="password" show-password />
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm">提 交</el-button>
      <el-button @click="cancel">重 置</el-button>
    </div>
  </div>
</template>

<script>
import { uploadAvatar } from "@/api/system/user";
export default {
  data () {
    return {
      // 是否显示弹出层
      open: false,
      // 是否显示cropper
      visible: false,
      // 弹出层标题
      title: "修改头像",
      options: {
        img: store.getters.avatar, //裁剪图片的地址
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 200, // 默认生成截图框宽度
        autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true // 固定截图框大小 不允许改变
      },
      previews: {},
      form: {
        realName: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        realName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 编辑头像
    editCropper () {
      this.open = true;
    },
    // 打开弹出层结束时的回调
    modalOpened () {
      this.visible = true;
    },
    // 覆盖默认的上传行为
    requestUpload () {
    },
    // 向左旋转
    rotateLeft () {
      this.$refs.cropper.rotateLeft();
    },
    // 向右旋转
    rotateRight () {
      this.$refs.cropper.rotateRight();
    },
    // 图片缩放
    changeScale (num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    // 上传预处理
    beforeUpload (file) {
      if (file.type.indexOf("image/") == -1) {
        this.$modal.msgError("文件格式错误，请上传图片类型,如：JPG，PNG后缀的文件。");
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.options.img = reader.result;
        };
      }
    },
    // 上传图片
    uploadImg () {
      this.$refs.cropper.getCropBlob(data => {
        let formData = new FormData();
        formData.append("avatarfile", data);
        uploadAvatar(formData).then(response => {
          this.open = false;
          this.options.img = process.env.VUE_APP_BASE_API + response.imgUrl;
          store.commit('SET_AVATAR', this.options.img);
          this.$modal.msgSuccess("修改成功");
          this.visible = false;
        });
      });
    },
    // 实时预览
    realTime (data) {
      this.previews = data;
    },
    // 关闭窗口
    closeDialog () {
      this.options.img = store.getters.avatar
      this.visible = false;
    },
    submitForm () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserPwd(this.form).then(response => {
            this.$modal.msgSuccess("提交成功");
          });
        }
      });
    },
    cancel () {
      this.form = {
        realName: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      }
      this.resetForm("form");
    }
  }
}
</script>

<style  scoped lang="scss">
.user-info-head {
  position: relative;
  display: inline-block;
  height: 120px;
}
.user-info-head:hover:after {
  content: "+";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  color: #eee;
  background: rgba(0, 0, 0, 0.5);
  font-size: 24px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
  line-height: 110px;
  border-radius: 50%;
}
</style>