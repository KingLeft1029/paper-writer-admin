<template>
  <div class="app-container">
    <img class="back" @click="back" src="@/assets/icons/back.png" alt="">
    <div class="box">

      <el-row >
        <el-col :span="24">
          <span>{{ $t('Title') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row  class="mt30">
        <el-col :span="24">
          <span>{{ $t('Cover') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row  class="mt30">
        <el-col :span="24">
          <span>{{ $t('Author') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>
      <el-row  class="mt30">
        <el-col :span="24">
          <span>{{ $t('Newest') }}：</span>
          <span>0230407000000</span>
        </el-col>
      </el-row>

      <el-row  class="mt30">
        <el-col :span="24">
          <span>{{ $t('Tags') }}：</span>
          <span>0230407000000</span>
          <span class="handle-word ml20">{{ $t('LABEL_EDIT') }}</span>
        </el-col>

      </el-row>
      <div class="mt30 mb20">{{ $t('Content') }}：</div>
      <div class="editor-box">




      </div>
      <div class="btn-box mt30">
        <el-button @click="back" type="">{{ $t('Back') }}</el-button>
        <el-button @click="pass" type="primary">{{ $t('AUDIT_APP') }}</el-button>
        <el-button @click="reject" type="danger">{{ $t('Declined') }}</el-button>
      </div>

    </div>
    <PopBox title="操作确认" ref="popRej">
      <div class="flex">
        <i class="el-icon-question question-icon" ></i>
        <div>
          <div class="info-title"> 确定驳回文章发布申请？</div>
          <div class="info-word">请填写原因</div>
          <el-input style="width:460px" type="textarea" :rows="5" placeholder="驳回原因(5-200)" v-model="textarea">
          </el-input>
        </div>
      </div>



    </PopBox>
  </div>
</template>

<script>
import PopBox from '@/components/PopBox'
export default {
  components: {
    PopBox
  },
  data() {
    return {
    };
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    pass() {
      const h = this.$createElement;
      this.$confirm("确定审核通过？", "操作确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass:'ele-box',
        message: h('div', null, [
          h('div', { style: 'fontSize: 20px' }, '确定审核通过？ '),
          h('div', { style: 'color: #999' }, '审核通过，该文章则发布成功，平台端用户可查看')
        ]),
      })
        .then(function () {
          return delDeliveryCompanyManage(companyIds);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("操作成功");
        })
        .catch(() => { });
    },
    reject() {
      this.$refs.popRej.open()
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 120px;
}
</style>
