<template>
  <div class="app-container">
    <form-container
      :selection="true"
      ref="content"
      :formList="formList"
      :total="total"
      :tableList="tableList"
      :tableData="tableData"
      @search="getList"
      @paginationChange="getList"
      @recharge="getList"
    >
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link
                :underline="false"
                type="primary"
                @click="lookInfo(scope.row)"
                >查看详情</el-link
              >
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import { userNoticePage, queryById } from "@/api/userNotice";
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList, formEditList } from "./config";

export default {
  data() {
    return {
      tableList,
      formList,
      total: 0,
      tableData: [],
    };
  },
  components: {
    FormContainer,
  },
  created() {},
  mounted() {
    this.getList();
  },
  methods: {
    filter() {
      return this.$refs.content.filter();
    },
    lookInfo(select) {
      queryById(select.id).then((res) => {
        this.$openDialog({
          title: "查看系统消息",
          data: {},
          components: {
            render(h) {
              return (
                <div>
                  <div class="title">{res.data.title}</div>
                  <div class="time">
                    <span>{res.data.createTime}</span>
                    <span class="readFlag">
                      {res.data.readFlag == "0" ? "未读" : "已读"}
                    </span>
                  </div>
                  <div
                    domPropsInnerHTML={res.data.detail ? res.data.detail : "暂无数据"}
                  ></div>
                </div>
              );
            },
          },
          beforeClose: function (flag, form, done) {
            this.getList();
            done();
          },
        });
      });
    },
    /** 查询商家管理平台端列表 */
    getList() {
      let params = {
        ...this.filter(),
        noticeType: "0",
      };
      userNoticePage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  },
};
</script>
<style lang="scss">
.title {
  text-align: center;
  font-weight: 700;
  font-size: 18px;
}
.time {
  display: flex;
  justify-content: space-between;
}
.readFlag {
  background: #eee;
  padding: 5px 20px;
  border-radius: 5px;
}
</style>
