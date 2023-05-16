<template>
  <div class="option" @mouseleave="mouseleave">
    <div @mouseenter="mouseenter">
      <el-checkbox v-model="checkbox" @change="checkboxChange" :disabled="provincialDisabled">{{ data.regionName }}
        <span style="color: red">{{ checkList.length }}/{{ sumLength }}</span></el-checkbox>
    </div>
    <div v-if="isShowCascader" class="cascaderPanel">
      <div class="content">
        <el-scrollbar style="height: 100px; width: 180px" :native="false">
          <el-checkbox-group v-model="checkList" @change="checkListChange">
            <el-checkbox :disabled="disabled(item.regionId)" v-for="(item, index) of data.children" :key="index"
              :label="item.regionId">{{ item.regionName }}</el-checkbox>
          </el-checkbox-group>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
    selectOption: Array,
    selectDisabled: Boolean,
  },
  data () {
    return {

      disabledList: [],
      checkbox: false,
      checkList: [],
      selectData: [],
      isShowCascader: false,
      props: {
        multiple: true,
        value: "regionCode",
        label: "regionName",
        children: "children",
      },
    };
  },
  computed: {
    sumLength () {
      // if (this.selectDisabled) {
      //   return this.data.children.length - this.disabledList.length;
      // } else {
      return this.data.children.length;
      // }
    },
    provincialDisabled () {
      if (this.disabledList.length == this.data.children.length) {
        return true
      } else {
        return false
      }
    },
    disabled () {
      return (id) => {
        return this.disabledList.indexOf(id) != -1;
      };
    },
    selectCheckbox () {
      return this.checkbox
        ? {
          regionId: this.data.regionId,
          regionName: this.data.regionName,
          isAllSelect: this.checkList.length == this.data.children.length,
        }
        : null;
    },
    selectCheckList () {
      return this.selectData;
    },
  },
  watch: {
    checkList: {
      immediate: true,
      deep: true,
      handler (val) {

        this.selectData = val.map((item) => {
          let name = null;
          this.data.children.forEach((childItem) => {
            if (childItem.regionId == item) name = childItem.regionName;
          });
          return {
            regionId: item,
            regionName: name,
          };
        });

      },
    },
  },
  created () {
    console.log(this.selectOption, "市级的this.selectOption")
    if (this.selectOption && this.selectOption.length) {
      if (!this.selectDisabled) {
        this.checkbox = true;
      }
      console.log(this.data.children, "市级的this.data.children")
      this.data.children.forEach((item) => {
        if (this.selectOption.indexOf(item.regionId) != -1) {
          this.checkList.push(item.regionId)
          console.log(this.selectDisabled, "有有有有有有有有有有有有有有有有有有有有")
          if (this.selectDisabled) {
            this.disabledList.push(item.regionId)
          }


        }
      });
    }

    console.log(this.checkList, "市级的this.checkList")

  },
  methods: {
    checkboxChange (n) {
      if (n) {
        let list = this.data.children;
        if (this.selectDisabled) {
          list = this.data.children.filter((item) => {
            return this.disabledList.indexOf(item.regionId) === -1;
          });
        }
        this.checkList = list.map((item) => item.regionId);
      } else {
        this.checkList = [];
      }
    },
    checkListChange (n) {
      if (n.length) {
        this.checkbox = true;
      } else {
        this.checkbox = false;
      }
    },
    mouseenter () {
      this.isShowCascader = true;
    },
    mouseleave () {
      this.isShowCascader = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.option {
  display: flex;
  position: relative;
  padding-bottom: 20px;
}
.cascaderPanel {
  position: absolute;
  left: 0;
  top: 20px;
  z-index: 1000;
  .content {
    padding: 10px;
    border: 1px solid #eee;
    background: #fff;
    border-radius: 5px;
    ::v-deep.el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
}
</style>