<template>
  <el-table-column
    v-if="isShow"
    :prop="columnData.prop"
    :label="$t(columnData.name)"
    align="center"
    show-overflow-tooltip
  >
    <template slot-scope="scope">
      <div v-if="columnData.multiselect">
        {{ multiselectData(scope.row) }}
      </div>
      <div v-if="columnData.options && !columnData.multiselect">
        <div v-for="(itemC, indexC) of columnData.options" :key="indexC">
          <span v-if="itemC.value == scope.row[columnData.prop]">{{
            $t(itemC.name)
          }}</span>
        </div>
      </div>
      <div v-if="!columnData.type && !columnData.options">
        <span>{{ scope.row[columnData.prop] }}</span>
      </div>
      <div v-if="columnData.type == 'image'">
        <z-image :value="scope.row[columnData.prop]"></z-image>
      </div>
      <div v-if="columnData.type == 'switch'">
        <z-switch
          :activeValue="columnData.activeValue ? columnData.activeValue : ''"
          :inactiveValue="
            columnData.inactiveValue ? columnData.inactiveValue : ''
          "
          :value.sync="scope.row[columnData.prop]"
          @change="change(columnData, scope.row)"
        ></z-switch>
      </div>
    </template>
  </el-table-column>
</template>
<script>
import ZImage from "@/views/components/Z-Form/z-image";
import ZSwitch from "@/views/components/Z-Form/z-switch";
import Inject from "../mixin/inject";
export default {
  mixins: [Inject],
  props: {
    columnData: Object,
    tableHideField: Array,
  },
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    multiselectData() {
      return (row) => {
        if (row[this.columnData.prop]) {
          let data = [];
          row[this.columnData.prop].forEach((item, index) => {
            let arr = this.columnData.options.find(
              (opItem) => opItem.value == item
            );
            if (arr) data.push(this.$t(arr.name));
          });
          return data.join("，");
        }
      };
    },
  },
  components: {
    ZImage,
    ZSwitch,
  },
  created() {
    if (
      this.tableHideField &&
      this.tableHideField.indexOf(this.columnData.prop) != -1
    )
      this.isShow = false;
  },
  methods: {
    change(item, data) {
      if (
        item.changeFunction &&
        this.$CD[item.changeFunction].constructor == Function
      ) {
        this.$CD[item.changeFunction](data);
      }
    },
  },
};
</script>
<style lang="scss" scoped>

</style>