<template>
  <div
    :style="{ width: width, height: height }"
    @mousemove="isShowClose = true"
    @mouseleave="isShowClose = false"
  >
    <div class="close" v-if="hideClose">
      <i
        v-if="isShowClose"
        class="el-icon-circle-close icon-close"
        @click="close"
      ></i>
    </div>
    <video class="video" :src="`${api}${inputVal}`" controls="controls">
      您的浏览器不支持 video 标签。
    </video>
  </div>
</template>
<script>
import IconsDialog from "../../../tool/build/IconsDialog.vue";
export default {
  components: { IconsDialog },
  props: {
    hideClose: {
      type: Boolean,
      default: true,
    },
    value: [String, Array],
    width: {
      type: String,
      default: "400px",
    },
    height: {
      type: String,
      default: "190px",
    },
  },
  data() {
    return {
      isShowClose: false,
      api: process.env.VUE_APP_BASE_API,
      inputVal: null,
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(val) {
        this.inputVal = val;
      },
    },
  },
  created() {},
  methods: {
    close() {
      this.$emit("update:value", null);
      this.$emit("close");
    },
  },
};
</script>
<style lang="scss" scoped>
.icon-close {
  font-size: 20px;
}
.icon-close:hover {
  color: rgb(31, 121, 224);
}
.close {
  height: 20px;
  display: flex;
  justify-content: flex-end;
}
.video {
  padding-right: 30px;
  video {
    height: 100%;
    width: 100%;
  }
}
</style>
