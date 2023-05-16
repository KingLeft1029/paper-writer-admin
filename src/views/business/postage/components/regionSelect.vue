<template>
  <div>
    <div class="checkbox" id="checkbox">
      <el-row>
        <el-col :span="4" v-for="(city, index) of options" :key="index">
          <options :selectDisabled="selectDisabled" :ref="`option${index}`" :selectOption="selectOption" :data="city">
          </options>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { sysRegionTree } from "@/api/sysRegion/index";
import Options from "./options.vue";
export default {
  components: {
    Options,
  },

  props: {
    selectOption: Array,
    selectDisabled: {
      type: Boolean,
      default: true,
    },
  },

  data () {
    return {
      options: [],
    };
  },

  computed: {},

  created () {
    sysRegionTree().then((res) => {
      this.options = res.data;
    });
  },

  mounted () {
    console.log(this.selectOption, "省级的子组件中 打开区域选择弹窗后的 默认的配送区域this.selectRegion")
  },

  methods: {
    // 获取当前选中项的 ID 列表
    getSelectValList () {
      let arr = [];
      this.options.forEach((item, index) => {
        let disabledList = this.$refs["option" + index][0].disabledList;
        let checkList = this.$refs["option" + index][0].checkList;
        if (disabledList.length) {
          arr = [...arr, ...disabledList];
        } else {
          arr = [...arr, ...checkList];
        }
      });
      return JSON.parse(JSON.stringify(arr));
    },
    // 获取全部已选中数据
    selectData () {
      let arr = [];
      this.options.forEach((item, index) => {
        if (this.$refs["option" + index][0].selectCheckbox) {
          arr.push({
            ...this.$refs["option" + index][0].selectCheckbox,
            children: this.$refs["option" + index][0].selectCheckList,
          });
        }
      });
      return JSON.parse(JSON.stringify(arr));
    },

    getCurSelect () {
      let arr = [];
      this.options.forEach((item, index) => {
        if (this.$refs["option" + index][0].selectCheckbox) {
          arr.push({
            checkBox: this.$refs["option" + index][0].selectCheckbox,
            checkList: this.$refs["option" + index][0].selectCheckList,
          });
        }
      });
      return JSON.parse(JSON.stringify(arr));
    },
  }
};
</script>

<style lang="scss" scoped></style>