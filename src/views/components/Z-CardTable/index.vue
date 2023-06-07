<template>
  <div class="card-table app-container">
    <div class="button">
      <slot name="button"></slot>
      <div v-if="isSelect">
        <el-checkbox v-model="selectAll" @change="allChange">{{
          $t("SELECT_ALL")
        }}</el-checkbox>
      </div>
    </div>
    <div class="card">
      <div
        class="card-container"
        :style="{
          width: `${cardWidth}px`,
        }"
        v-for="(item, index) of tableData"
        :key="index"
      >
        <div style="width: 100%">
          <div class="card-title">
            <div class="checkbox" v-if="isSelect">
              <el-checkbox
                v-model="checkList[index]"
                @change="selectChange(checkList[index], index, item)"
              ></el-checkbox>
            </div>
            <slot name="cardTitle" v-bind:scope="item"></slot>
          </div>
          <div class="card-content">
            <slot name="card" v-bind:scope="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isSelect: {
      type: Boolean,
      default: true,
    },
    cardWidth: {
      type: String,
      default: "200",
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      checkList: [],
      selectAll: false,
      selectData: [],
    };
  },
  computed: {
    getSelectList() {
      return JSON.parse(JSON.stringify(this.selectData));
    },
  },
  watch: {
    tableData: {
      immediate: true,
      handler(val) {
        if (!val) return;
        let arr = [];
        if (this.selectData.length) {
          this.selectData.forEach((item) => {
            val.forEach((findItem, findIndex) => {
              item.robotId == findItem.robotId ? arr.push(findIndex) : "";
            });
          });
        }
        this.allChange();
        if (arr.length) {
          arr.forEach((item, index) => {
            this.$set(this.checkList, item, true);
            this.selectData.push(this.tableData[item]);
          });
        }
      },
    },
    checkList: {
      immediate: true,
      handler(val) {
        this.selectData = [];
        this.checkList.forEach((item, index) => {
          if (item) {
            this.selectData.push(this.tableData[index]);
          }
        });
      },
    },
  },
  created() {},
  mounted() {},
  methods: {
    selectChange(val, index, data) {
      let flag = this.checkList.find((item) => {
        return !item;
      });
      if (flag === false) {
        this.selectAll = false;
      } else {
        this.selectAll = true;
      }
    },
    allChange(val) {
      this.tableData.forEach((item, index) => {
        this.$set(this.checkList, index, this.selectAll);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-checkbox {
  display: flex;
  align-items: center;
}

.card-table {
  border-radius: 5px;
  min-height: 73vh;
  .button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // line-height: 34px;
  }

  .card {
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0;

    .card-container {
      // border-radius: 5px;
      margin-right: 12px;
      margin-bottom: 16px;
      display: flex;
      .card-title {
        position: relative;
        width: 100%;

        .checkbox {
          position: absolute;
          top: calc(50% - 7px);
          left: 8px;
        }
      }
    }
  }
}
</style>