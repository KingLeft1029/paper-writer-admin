<!--
 * @Author: mikeShn
 * @Date: 2022-04-12 14:57:06
 * @LastEditTime: 2022-04-28 16:18:45
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\message\orderMessage\index.vue
 * @Description: 文件说明
-->
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
import { userNoticePage, queryById, changeStateToRead } from '@/api/userNotice'
import FormContainer from "@/views/components/FormContainer";
import { tableList, formList,formEditList } from "./config";
import ZForm from "@/views/components/Z-Form/form-groud";

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
    addData() {},
    lookInfo(select) {
      queryById(select.id).then((res) => {
        // this.$openDialog({
        //   title: "查看详情",
        //   data: {
        //     formData: res.data,
        //     formList: formEditList,
        //     isReadonly: true,
        //     showButton: false,
        //     inline: false,
        //     labelWidth: "100px",
        //   },
        //   components: ZForm,
        //   beforeClose: function (flag, content, done) {
        //     this.getList();
        //     done();
        //   },
        // });
        // 0等待发货1等待审批退款2等待审批退货. 根据原型，如果是0跳转到订单列表。其余跳转到退单列表
        if(select.messageType == 0){
          this.$router.push({
            path: "/order/orderList",
            query: { orderId: res.data.orderId },
          },to => {
            // 点击了查看详情跳转过去了，此条状态就是已读
            changeStateToRead({ id: select.id })
          });
        }else{
          this.$router.push({
            path: "/order/chargebackList",
            query: { orderId: res.data.orderId },
          });
        }

      });
    },
    /** 查询商家管理平台端列表 */
    getList() {
      let params = {
        ...this.filter(),
        noticeType: "1",
      };
      userNoticePage(params).then((response) => {
        this.tableData = response.data.records;
        this.total = response.data.total;
      });
    },
  },
};
</script>
