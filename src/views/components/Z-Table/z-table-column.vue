<template>
  <el-table-column v-if="isShow" :prop="columnData.prop" :label="columnData.name" align="center" show-overflow-tooltip
    :width="columnData.width ? columnData.width : null">
    <template slot-scope="scope">
      <div v-if="columnData.options || columnData.type">
        <div v-for="(itemC, indexC) of columnData.options" :key="indexC">
          <span v-if="itemC.value == scope.row[columnData.prop]">{{
            itemC.name
          }}</span>
        </div>
      </div>
      <div v-if="columnData.type == 'deepPropHtml'">
        <div>{{rescuve(scope,columnData.prop)}}</div>
      </div>
      <div v-if="columnData.type == 'html'">
        <div v-html="scope.row[columnData.prop]"></div>
      </div>
      <div v-if="!columnData.type && !columnData.options">
        <span>{{ scope.row[columnData.prop] }}</span>
        <span>{{ columnData.unit ? columnData.unit : "" }}</span>
      </div>
      <div v-if="columnData.type == 'image'">
        <z-image :value="scope.row[columnData.prop]"></z-image>
      </div>
      <div v-if="columnData.type == 'switch'">
        <z-switch :activeValue="columnData.activeValue ? columnData.activeValue : ''" :inactiveValue="
            columnData.inactiveValue ? columnData.inactiveValue : ''
          " :value.sync="scope.row[columnData.prop]" @change="change(columnData, scope.row)"></z-switch>
      </div>
      <div v-if="columnData.type == 'array'">
        <div>{{arrJoin(scope,columnData.prop)}}</div>
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

  components: {
    ZImage,
    ZSwitch,
  },

  props: {
    columnData: Object,
    tableHideField: Array,
  },

  data () {
    return {
      isShow: true,
    };
  },

  created () {
    // console.log(this.columnData,);
    // console.log(this.tableHideField);
    // console.log(Inject);
    if (
      this.tableHideField &&
      this.tableHideField.indexOf(this.columnData.prop) != -1
    )
      this.isShow = false;
  },

  methods: {
    change (item, data) {
      if (
        item.changeFunction &&
        this.$CD[item.changeFunction].constructor == Function
      ) {
        this.$CD[item.changeFunction](data);
      }
    },
    rescuve (scope, properties) {
      return properties.indexOf('.') === -1 ? scope.row[properties] : properties.split('.').reduce((result, current) => result[current], scope.row)
    },
    arrJoin (scope, properties) {
      console.log(scope, properties, "vvvvvvvvvvvv")
    },
  }
};
</script>

