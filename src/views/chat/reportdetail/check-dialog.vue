<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="show" width="750px" append-to-body :close-on-click-modal="false">
    <div class="dialog-box">
      <el-form label-position="right" ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item :label="$t('QUN_M')+'：'" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('QUN_R')+'：'" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('QUN_Z')+'：'" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('Status')+'：'" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('JBRS')+'：'" required>
          xxxx
        </el-form-item>
        <el-form-item :label="$t('JBYY')+'：'" required>
          <el-input type="textarea" disabled :rows="2" :placeholder="$t('Enter')" v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('JBTP')+'：'" required>
<div class="img-report" ></div>
        </el-form-item>
        <el-form-item :label="$t('JBSJ')+'：'" required>
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
      title: this.$t('View'),
      show: false,
      form: {
        radio: 1
      },
      rules: {
        userName: [
          {
            required: true,
            message: this.$t("BNWK"),
            trigger: "blur",
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
