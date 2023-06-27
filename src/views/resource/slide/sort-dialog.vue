<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="show" width="720px" append-to-body :close-on-click-modal="false">
    <div class="dialog-box">
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('Sorting')" prop="sort" style="position:relative">
          <el-input type="number" v-model="form.sort" clearable />

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
import {

  editApi,

} from "@/api/slide";
export default {
  name: '',
  components: {},
  data() {
    return {
      title: '',
      show: false,
      form: {

      },
      rules: {
        sort: [
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
    open(form) {
      this.form = form
      this.show = true
      this.title=this.$t('Sorting')
      this.resetForm("form");
    },

    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate((valid) => {
        if (valid) {

          editApi(this.form).then((response) => {
            this.$modal.msgSuccess(this.$t("OPERTATE_SUCCESS"));
            this.show = false;
            this.$emit('getList');
          });

        }
      });
    },
    // 取消按钮
    cancel() {
      this.show = false;

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
