<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 18:07:30
 * @LastEditTime: 2022-05-03 17:05:47
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\auditManagement\evaluationAudit\index.vue
 * @Description: 文件说明
-->

<template>
  <div class="app-container">
    <div class="box" v-if="$route.query.type == '1'">
      <div class="title">基本信息</div>
      <z-table
        :isShowPagination="false"
        :tableList="tableList1"
        :tableData="[tableData]"
      ></z-table>
    </div>
    <div class="box">
      <div class="title">评论信息</div>
      <z-table
        :isShowPagination="false"
        :tableList="$route.query.type == '1' ? tableList2 : tableList3"
        :tableData="[tableData]"
      ></z-table>
      <div style="font-size: 15px; padding: 20px 0">评论内容</div>
      <div style="font-size: 14px">
        {{ tableData.evaDetail }}
      </div>
      <div style="display: flex">
        <UploadImg
          :isShowTip="false"
          :isReadonly="true"
          :value="evaPics"
        ></UploadImg>
        <div v-if="evaVideos.length">
          <z-video
            v-for="(item, index) of evaVideos"
            :key="index"
            class="video"
            :hideClose="false"
            :value.sync="item"
          ></z-video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { evaluatedeTails } from "@/api/evaluate";
import FormContainer from "@/views/components/Z-Table";
import ZTable from "@/views/components/Z-Table";
import UploadImg from "@/components/ImageUpload";
import ZVideo from "@/views/components/Z-Form/z-video";
import { tableList1, tableList2, tableList3 } from "./config";

export default {
  data() {
    return {
      tableList1,
      tableList2,
      tableList3,
      tableData: {},
      id: this.$route.query.code,
      evaPics: [],
      evaVideos: [],
    };
  },
  components: {
    FormContainer,
    ZTable,
    UploadImg,
    ZVideo,
  },
  computed: {
    deptId() {
      return this.$store.getters.deptId;
    },
  },
  created() {
    evaluatedeTails(this.id).then((res) => {
      this.tableData = res.data;
      let val = res.data.evaPics.split(",");
      const picType = ["jpg","png"];
      const videoType = ["mp4"];
      val.forEach((item) => {
        if (picType.indexOf(item.split(".")[1]) != -1) {
          this.evaPics.push(item);
        } else if (videoType.indexOf(item.split(".")[1]) != -1) {
          this.evaVideos.push(item);
        }
      });
      console.log(this.evaVideos,this.evaPics);
    });
  },
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.box {
  border: 1px solid #eaeaea;
  padding: 20px;
  margin-bottom: 20px;
}
.title {
  border-bottom: 1px solid #eaeaea;
  margin-bottom: 20px;
  font-weight: 700px;
}
</style>
