<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="show" width="520px" append-to-body :close-on-click-modal="false">
    <div class="dialog-box" v-if="flag">
      <el-form label-position="right" ref="form" :model="form" :rules="rules"
        :label-width="language == 'en' ? 180 + 'px' : 110 + 'px'">
        <el-form-item :label="$t('CONFIG_P') + ':'" prop="proportion" style="position:relative">
          <el-input v-model="form.proportion" :placeholder="$t('CONFIG_P')" />
          <div class="rate-box">%</div>
        </el-form-item>
        <p class="p-word" v-html="$t('DES')"></p>
      </el-form>
    </div>
    <div class="padding20" v-else>
      <div class="info-title">
        {{ $t('XPZDEY') }} <span class="red">“ {{ this.form.proportion }} ”</span> <span v-if="language = 'en'">吗</span> ？
      </div>
      <div class="info-word">
        {{ $t('XTJYJBL') }}
      </div>
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
import { addApi } from "@/api/finace"
import { mapGetters } from "vuex";
export default {
  name: '',
  components: {},
  computed: {
    ...mapGetters(["language"]),
  },
  data() {
    return {
      title: '',
      show: false,
      form: {
        proportion: '',
        type: ''
      },
      rules: {
        proportion: [
          {
            required: true,
            message: this.$t("PLEASE_SELECT_WHETHER"),
            trigger: "blur",
          },
        ],

      },
      flag: true
    };
  },
  computed: {},
  watch: {},
  methods: {
    open(num) {
      if (num == 1) {
        // 文章
        this.title = this.$t('CONFIG_A')
        this.form.type = num
      } else {
        this.form.type = num
        this.title = this.$t('CONFIG_C')
      }
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
      if (!this.flag) {
        if (this.form.userId != undefined) {
          editApi(this.form).then((response) => {
            this.$modal.msgSuccess(this.$t("UPDATED_SUCCESS"));
            this.show = false;
            this.$emit('getList')
          });
        } else {
          addApi(this.form).then((response) => {
            this.$modal.msgSuccess(this.$t("OPERTATE_SUCCESS"));
            this.show = false;
            this.$emit('getList')
          });
        }
        return
      }
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.flag = false
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
.rate-box {
  position: absolute;
  right: 0;
  top: 3px;
  height: 31px;
  width: 32px;
  text-align: center;
  line-height: 31px;
  border-left: 1px solid #DCDFE6;
}

.p-word {
  line-height: 24px;
}

/* @import url(); 引入公共css类 */
</style>
