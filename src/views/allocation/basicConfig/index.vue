<template>
  <div class="app-container">
    <div class="order border">
      <div class="title">订单基础配置</div>
      <div class="container">
        <el-form :model="order" label-width="180px" ref="order">
          <el-form-item label="订单完成:" prop="autoReceiveDays" :rules="[
              { required: true, message: '请输入天数', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' },
            ]">
            <el-input v-model.number="order.autoReceiveDays" placeholder="请输入"></el-input>
            <span>天后自动收货</span>
          </el-form-item>
          <el-form-item label="已完成订单超过:" prop="billingEndTime" :rules="[
              { required: true, message: '请输入天数', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' },
            ]">
            <el-input v-model.number="order.billingEndTime" placeholder="请输入"></el-input>
            <span>天后不可开票</span>
          </el-form-item>
          <el-form-item label="已完成订单超过:" prop="refundEndTime" :rules="[
              { required: true, message: '请输入天数', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' },
            ]">
            <el-input v-model.number="order.refundEndTime" placeholder="请输入"></el-input>
            <span>天后不可退货</span>
          </el-form-item>
          <el-form-item label="已完成订单并不可退货:" prop="refundEndTime" :rules="[
              { required: true, message: '请输入天数', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' },
            ]">
            <el-input v-model.number="order.refundEndTime" placeholder="请输入"></el-input>
            <span>天内可以结算</span>
          </el-form-item>
          <el-form-item label="已完成订单超过:" prop="evaluateEndTime" :rules="[
              { required: true, message: '请输入天数', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' },
            ]">
            <el-input v-model.number="order.evaluateEndTime" placeholder="请输入"></el-input>
            <span>天后不可评价</span>
          </el-form-item>
          <!-- <el-form-item label="待支付订单超过:" prop="timeoutCancel" :rules="[
              { required: true, message: '请输入小时', trigger: 'blur' },
              { validator: checkAge, trigger: 'blur' },
            ]">
            <el-input v-model.number="order.timeoutCancel" placeholder="请输入"></el-input>
            <span>小时后不支付自动取消</span>
          </el-form-item> -->
        </el-form>
      </div>
    </div>
    <div class="button">
      <el-button>取消</el-button>
      <el-button type="success" @click="submit('order')">确认</el-button>
    </div>
    <div class="funcSwitch border">
      <div class="title">功能开关</div>
      <div class="container">
        <el-form label-width="180px" :model="funcSwitch" ref="funcSwitch">
          <el-form-item label="用户评价:" prop="isEvaluate" :rules="[{ required: true, message: '请选择', trigger: 'blur' }]">
            <el-radio v-model="funcSwitch.isEvaluate" label="0">关</el-radio>
            <el-radio v-model="funcSwitch.isEvaluate" label="1">开</el-radio>
          </el-form-item>
          <el-form-item label="评价审核:" prop="isEvaAudit" :rules="[{ required: true, message: '请选择', trigger: 'blur' }]">
            <el-radio v-model="funcSwitch.isEvaAudit" label="0">关</el-radio>
            <el-radio v-model="funcSwitch.isEvaAudit" label="1">开</el-radio>
          </el-form-item>
          <el-form-item label="商品审核:" prop="isGoodAduit" :rules="[{ required: true, message: '请选择', trigger: 'blur' }]">
            <el-radio v-model="funcSwitch.isGoodAduit" label="0">关</el-radio>
            <el-radio v-model="funcSwitch.isGoodAduit" label="1">开</el-radio>
          </el-form-item>
          <el-form-item label="商家审核:" prop="isPresale" :rules="[{ required: true, message: '请选择', trigger: 'blur' }]">
            <el-radio v-model="funcSwitch.isPresale" label="0">关</el-radio>
            <el-radio v-model="funcSwitch.isPresale" label="1">开</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="button">
      <el-button>取消</el-button>
      <el-button type="success" @click="submit('funcSwitch')">确认</el-button>
    </div>
    <div class="number border">
      <div class="title">数量配置</div>
      <div class="container">
        <el-form label-width="180px" :model="number" ref="number">
          <el-form-item label="购物车商品不可超过:" prop="cartNum" :rules="[
              { required: true, message: '请输入件数', trigger: 'blur' },
              { validator: checkAge, trigger: 'change' },
            ]">
            <el-input v-model.number="number.cartNum"></el-input>
            <span>件</span>
          </el-form-item>
          <el-form-item label="收藏夹商品不可超过:" prop="favoriteNum" :rules="[
              { required: true, message: '请输入件数', trigger: 'blur' },
              { validator: checkAge, trigger: 'change' },
            ]">
            <el-input v-model.number="number.favoriteNum"></el-input>
            <span>件</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="button">
      <el-button>取消</el-button>
      <el-button type="success" @click="submit('number')">确认</el-button>
    </div>

    <!--
    <div class="index border">
      <div class="title">入驻配置</div>
     <div class="container">
        <el-form label-width="180px" :model="index" ref="index">
          <el-form-item label="入驻支付保证金额:" prop="margin" :rules="[
              { required: true, message: '请输入内容', trigger: 'blur' },
              { validator: numberRule, trigger: 'blur' },
            ]">
            <el-input v-model="index.margin" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="button">
      <el-button>取消</el-button>
      <el-button type="success" @click="submit('index')">确认</el-button>
    </div>
-->

    <div class="platform border">
      <div class="title">首页模块配置</div>
      <div class="container">
        <el-form label-width="180px" :model="shop" ref="shop">

          <el-form-item label="预售商品模块图片:" prop="presalePic" :rules="[
              { required: true, message: '请上传图片', trigger: 'blur' },
            ]">
            <img-upload @input="(val) => (shop.presalePic = val)" :limit="1" :isShowTip="false"
              :value="shop.presalePic">
            </img-upload>
          </el-form-item>
          <el-form-item label="热销商品模块图片:" prop="hotsalePic" :rules="[
              { required: true, message: '请上传图片', trigger: 'blur' },
            ]">
            <img-upload @input="(val) => (shop.hotsalePic = val)" :limit="1" :isShowTip="false"
              :value="shop.hotsalePic"></img-upload>
          </el-form-item>
          <el-form-item label="新品上架模块图片:" prop="newgoodPic" :rules="[
              { required: true, message: '请上传图片', trigger: 'blur' },
            ]">
            <img-upload @input="(val) => (shop.newgoodPic = val)" :limit="1" :isShowTip="false"
              :value="shop.newgoodPic"></img-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="button">
      <el-button>取消</el-button>
      <el-button type="success" @click="submit('shop')">确认</el-button>
    </div>
    <div class="platform border">
      <div class="title">平台配置</div>
      <div class="container">
        <el-form label-width="180px" :model="platform" ref="platform">

          <el-form-item label="平台名称:" prop="platformName" :rules="[
              { required: true, message: '请输入邮箱', trigger: 'blur' },
            ]">
            <el-input v-model="platform.platformName"></el-input>
          </el-form-item>
          <el-form-item label="平台头像:" prop="platformHeadImg" :rules="[
              { required: true, message: '请上传图片', trigger: 'blur' },
            ]">
            <img-upload @input="(val) => (platform.platformHeadImg = val)" :limit="1" :isShowTip="false"
              :value="platform.platformHeadImg"></img-upload>
          </el-form-item>

        </el-form>
      </div>
    </div>
    <div class="button">
      <el-button>取消</el-button>
      <el-button type="success" @click="submit('platform')">确认</el-button>
    </div>
  </div>
</template>
<script>
import ImgUpload from "@/components/ImageUpload";
import {
  startPage,
  orderConfig,
  functionConfig,
  updateShopConfig,
  webUserConfig,
  quantityConfig,
  marginConfig,
} from "@/api/allocation/shopConfig";
export default {
  components: {
    ImgUpload,
  },

  data () {
    return {
      /* index: {
        margin: null,
      }, */
      platform: {
        platformName: null,
        platformHeadImg: null,
      },
      number: {
        favoriteNum: null,
        cartNum: null,
      },
      funcSwitch: {
        isEvaluate: null,
        isEvaAudit: null,
        isGoodAduit: null,
        isPresale: null,
      },
      order: {
        timeoutCancel: null,
        evaluateEndTime: null,
        refundEndTime: null,
        billingEndTime: null,
        autoReceiveDays: null,
      },
      shop: {
        presalePic: null,
        hotsalePic: null,
        newgoodPic: null
      }
    };
  },

  created () {
    startPage(8).then((res) => {
      this.number.favoriteNum = res.data.favoriteNum;
      this.number.cartNum = res.data.cartNum;
    });
    // startPage(11).then((res) => {
    //   this.platform.phone = res.data.phone;
    //   this.platform.businessLicense = res.data.businessLicense;
    //   this.platform.subscription = res.data.subscription;
    //   this.platform.email = res.data.email;
    //   this.platform.appQrCode = res.data.appQrCode;
    // });
    startPage(7).then((res) => {
      this.funcSwitch.isEvaluate = res.data.isEvaluate;
      this.funcSwitch.isEvaAudit = res.data.isEvaAudit;
      this.funcSwitch.isGoodAduit = res.data.isGoodAduit;
      this.funcSwitch.isPresale = res.data.isPresale;
    });
    startPage(10).then((res) => {
      this.index.margin = res.data.margin;
    });
    startPage(6).then((res) => {
      this.order.timeoutCancel = res.data.timeoutCancel;
      this.order.evaluateEndTime = res.data.evaluateEndTime;
      this.order.refundEndTime = res.data.refundEndTime;
      this.order.refundEndTime = res.data.refundEndTime;
      this.order.billingEndTime = res.data.billingEndTime;
      this.order.autoReceiveDays = res.data.autoReceiveDays;
    });
    startPage(5).then((res) => {
      this.shop.presalePic = res.data.presalePic;
      this.shop.hotsalePic = res.data.hotsalePic;
      this.shop.newgoodPic = res.data.newgoodPic;

    });
    startPage(9).then((res) => {
      this.platform.platformName = res.data.platformName;
      this.platform.platformHeadImg = res.data.platformHeadImg;

    });
  },

  methods: {
    checkAge (rule, value, callback) {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error("请输入数字值"));
      } else {
        return callback();
      }
    },
    numberRule (rule, value, callback) {
      if (!Number(value)) {
        return callback(new Error("请输入数字值"));
      } else {
        return callback();
      }
    },
    submit (name) {
      this.$refs[name].validate((flag) => {
        if (flag) {
          updateShopConfig(this[name]).then((res) => {
            this.$message.success("保存成功！");
          });
        }
      });
    },
  }
};
</script>

<style lang="scss" scoped>
.el-input {
  width: 220px;
  padding-right: 10px;
}
.title {
  border: 1px solid #eee;
  padding: 20px;
}
.border {
  border: 1px solid #eee;
}
.container {
  padding-top: 10px;
}
.button {
  text-align: center;
  padding: 30px 0;
}
</style>