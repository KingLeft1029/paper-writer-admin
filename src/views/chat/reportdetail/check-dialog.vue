<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="show" width="700px" append-to-body>
    <div class="dialog-box">
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item :label="$t('群聊名称')" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('群聊人数')" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('群主')" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('状态')" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('举报人数')" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('举报原因')" required>
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('举报图片')" required>
<div class="img-report" ></div>
        </el-form-item>
        <el-form-item :label="$t('举报时间')" required>
          xxxx
        </el-form-item>
      </el-form>
    </div>

  </el-dialog>
</template>

<script>

export default {
  name: '',
  components: {},
  data() {
    return {
      title: '查看',
      show: false,
      form: {
        radio: 1
      },
      rules: {
        userName: [
          {
            required: true,
            message: this.$t("PLEASE_SELECT_WHETHER"),
            trigger: "change",
          },
        ],

      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    open() {
      this.show = true
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
      };
      this.resetForm("form");
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.userId != undefined) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t("UPDATED_SUCCESS"));
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
              this.$modal.msgSuccess(this.$t("ADD_SUCCESS"));
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    // 取消按钮
    cancel() {
      this.show = false;
      this.reset();
    },
  },
  created() {

  },
  mounted() {

  },
}
</script>
<style scoped>
/* @import url(); 引入公共css类 */
.img-report{
  width: 100px;
}
</style>
