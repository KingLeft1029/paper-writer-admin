<!--  -->
<template>
  <el-dialog :title="title" :visible.sync="show" width="580px" append-to-body>
   <slot></slot>
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
  props:{
    title:{
      type:String,
      default:()=>''
    }
  },
  data() {
    return {
      show: false,

    };
  },
  computed: {},
  watch: {},
  methods: {
    open() {
      this.show = true
    },

    /** 提交按钮 */
    submitForm: function () {

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
