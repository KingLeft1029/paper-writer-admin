<template>
  <div class="app-container">
    <form-container :selection="true" ref="content" :formList="formList" :total="total" :tableList="tableList"
      :tableData="tableData" @search="getList" @paginationChange="getList" @recharge="getList">
      <template v-slot:last>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="scope-button">
              <el-link :underline="false" type="primary" @click="lookInfo(scope.row)">查看详情</el-link>
            </div>
          </template>
        </el-table-column>
      </template>
    </form-container>
  </div>
</template>

<script>
import { userNoticePage, queryById, changeStateToRead } from '@/api/userNotice'
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList, formEditList } from "./config";
import ZForm from "@/views/components/Z-Form/form-groud";
export default {
  components: {
    FormContainer,
  },

  data () {
    return {
      tableList,
      formList,
      total: 0,
      tableData: [],
    };
  },

  created () { },

  mounted () {
    this.getList();
  },

  methods: {
    filter () {
      return this.$refs.content.filter();
    },
    argee () { },
    lookInfo (select) {
      queryById(select.id).then((res) => {
        // this.$openDialog({
        //   title: "查看详情",
        //   data: {
        //     formData: res.data,
        //     formList: formEditList,
        //     isReadonly: true,
        //     showButton: false,
        //     inline: false,
        //     labelWidth:'80px'
        //   },
        //   components: ZForm,
        //   beforeClose: function (flag, content, done) {
        //     this.getList();
        //     done();
        //   },
        // });
        if (select.auditMessageType == 0 || !select.auditMessageType) {
          // 商品审核
          this.$router.push({
            path: "/auditManagement/goodsAudit",
          }, to => {
            // 点击了查看详情跳转过去了，此条状态就是已读
            changeStateToRead({ id: select.id })
          });
        } else if (select.auditMessageType == 1) {
          // 评价审核
          this.$router.push({
            path: "/auditManagement/evaluationAudit",
          }, to => {
            // 点击了查看详情跳转过去了，此条状态就是已读
            changeStateToRead({ id: select.id })
          });
        } else if (select.auditMessageType == 2) {
          // 结算审核
          this.$router.push({
            path: "/finance/settlement",
          }, to => {
            // 点击了查看详情跳转过去了，此条状态就是已读
            changeStateToRead({ id: select.id })
          });
        } else if (select.auditMessageType == 3) {
          // 商家审核
          this.$router.push({
            path: "/auditManagement/merchantAudit",
          }, to => {
            // 点击了查看详情跳转过去了，此条状态就是已读
            changeStateToRead({ id: select.id })
          });
        }
      });
    },
    getList () {
      let params = {
        ...this.filter(),
        noticeType: "4",
      };
      userNoticePage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  }
};
</script>

