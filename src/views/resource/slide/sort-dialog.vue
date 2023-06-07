<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="show" width="720px" append-to-body>
    <div class="dialog-box">
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('修改顺序')" prop="userName" style="position:relative">
          <el-input type="number" v-model="form.rate"  clearable
           />

        </el-form-item>

      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">

      <el-button @click="cancel">{{ $t("Cancel") }}</el-button>
      <el-button type="primary" @click="submitForm">{{
        $t("Confirm")
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>

export default {
  name: '',
  components: {},
  data() {
    return {
      title: '排序',
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
    open(num) {

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
</style>
