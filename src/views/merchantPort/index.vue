<!--
 * @Author: your name
 * @Date: 2022-04-06 16:48:08
 * @LastEditTime: 2022-04-11 10:05:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\merchant\index.vue
-->
// 商家管理
<template>
  <div class="app-container">
    <p v-hasPermi="['merchant:form:list']" class="state-font">审核状态：
      <dict-tag :options="dict.type.merchant_review_status" :value="form.checkStatus"/>
    </p>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="200px"
      class="demo-ruleForm"
    >
      <el-form-item label="商家名称" prop="shopName">
        <el-input :disabled="readonly" v-model="form.shopName"></el-input>
      </el-form-item>
      <el-form-item label="商家地址" prop="shopAddress">
        <el-input :disabled="readonly" v-model="form.shopAddress"></el-input>
      </el-form-item>
      <el-form-item label="联系地址" prop="linkAddress">
        <el-input :disabled="readonly" v-model="form.linkAddress"></el-input>
      </el-form-item>
      <el-form-item label="统一社会信用码" prop="creditCode">
        <el-input :disabled="readonly" v-model="form.creditCode"></el-input>
      </el-form-item>
      <el-form-item label="营业执照" prop="businessLicense">
        <image-upload
          :isReadonly="readonly"
          v-model="form.businessLicense"
          @input="(val) => (form.businessLicense = val)"
          :isShowTip="false"
          :limit="1"
        ></image-upload>
      </el-form-item>
      <el-form-item label="联系人姓名" prop="linkName">
        <el-input :disabled="readonly" v-model="form.linkName"></el-input>
      </el-form-item>
      <el-form-item label="联系人手机号" prop="linkPhone">
        <el-input :disabled="readonly" v-model="form.linkPhone"></el-input>
      </el-form-item>
      <el-form-item label="银行开户名" prop="realName">
        <el-input :disabled="readonly" v-model="form.realName"></el-input>
      </el-form-item>
      <el-form-item label="开户银行账号" prop="bankCardNumber">
        <el-input :disabled="readonly" v-model="form.bankCardNumber"></el-input>
      </el-form-item>
      <el-form-item label="开户银行支行名称" prop="bankBranchName">
        <el-input :disabled="readonly" v-model="form.bankBranchName"></el-input>
      </el-form-item>
      <el-form-item label="开户银行所在地" prop="bankAddress">
        <el-input :disabled="readonly" v-model="form.bankAddress"></el-input>
      </el-form-item>
      <el-form-item label="支行联行号" prop="bankBranchNumber">
        <el-input
          :disabled="readonly"
          v-model="form.bankBranchNumber"
        ></el-input>
      </el-form-item>
      <el-form-item label="法定经验范围" prop="bussnessNature">
        <el-input :disabled="readonly" v-model="form.bussnessNature"></el-input>
      </el-form-item>
      <el-form-item label="法人姓名" prop="legalPersonName">
        <el-input
          :disabled="readonly"
          v-model="form.legalPersonName"
        ></el-input>
      </el-form-item>
      <el-form-item label="法人手机号" prop="legalPersonPhone">
        <el-input
          :disabled="readonly"
          v-model="form.legalPersonPhone"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系人身份证照片正反面" prop="idenFrontPicUrl">
        <image-upload
          :isReadonly="readonly"
          :limit="2"
          v-model="form.idenFrontPicUrl"
          :isShowTip="false"
          @input="(val) => (form.idenFrontPicUrl = val)"
        ></image-upload>
      </el-form-item>
      <el-form-item label="是否缴纳保证金" prop="bondNum">
        <el-switch
          disabled
          v-model="form.bondFlag"
          active-value="1"
          inactive-value="0"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="缴纳金额" prop="bondNum">
        <el-input :disabled="true" v-model="form.bondNum">
          <template slot="suffix">元</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="form.checkStatus == 3" label="驳回原因" prop="rejectReason">
        <el-input disabled v-model="form.rejectReason"></el-input>
      </el-form-item>
      <el-form-item label="入驻日期" prop="entryDate">
        <el-date-picker
          v-model="form.entryDate"
          type="date"
          placeholder="选择日期"
          :disabled="readonly"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="创建日期" prop="createTime" v-hasPermi="['merchant:form:list']">
        <el-date-picker
          v-model="form.createTime"
          type="date"
          placeholder="选择日期"
          :disabled="readonly"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="创建人" prop="createName" v-hasPermi="['merchant:form:list']">
        <el-input :disabled="readonly" v-model="form.createName">
        </el-input>
      </el-form-item>
    </el-form>

    <el-row>
      <el-col :span="6" :offset="6">
        <el-button @click="cancel">取消</el-button>
        <!-- 当1已提交 或 2已通过，或明确用readonly标识这个页面不允许修改提交。此时禁用提交按钮-->
        <el-button type="primary" :disabled="readonly || this.readOnlyFromCheckStatus()" @click="submitForm">确认</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { queryById, queryMyById, shopSave, submitCheck } from '@/api/merchant/merchant'
import ImageUpload from '@/components/ImageUpload/index.vue'

export default {
  name: 'Merchant',
  dicts: ['merchant_review_status'],
  components: { ImageUpload },
  data() {
    return {
      shopId: null,
      readonly: false,
      form: {
        registerPhone: '',
        shopName: '',
        shopAvatar: '',
        bankBranchNumber: '',
        shopAddress: '',
        creditCode: '',
        businessLicense: '',
        accountOpeningPermit: '',
        linkName: '',
        linkPhone: '',
        realName: '',
        bankCardNumber: '',
        bankBranchName: '',
        bankAddress: '',
        bussnessNature: '',
        legalPersonName: '',
        legalPersonPhone: '',
        idenFrontPicUrl: '',
        bondNum: '',
        entryDate: ''
      },
      rules: {
        registerPhone: [
          { required: true, message: '注册手机号不能为空', trigger: 'blur' },
          { validator: this.checkAge, trigger: 'blur' }
        ],
        bankBranchNumber: [
          { required: true, message: '支行联行号不能为空', trigger: 'blur' },
          { validator: this.checkAge, trigger: 'blur' }
        ],
        shopAvatar: [
          { required: true, message: '商家头像不能为空', trigger: 'blur' }
        ],
        shopName: [
          { required: true, message: '商家名称不能为空', trigger: 'blur' }
        ],
        shopAddress: [
          { required: true, message: '商家地址不能为空', trigger: 'blur' }
        ],
        creditCode: [
          {
            required: true,
            message: '统一社会信用码不能为空',
            trigger: 'blur'
          }
          //{ validator: this.checkAge, trigger: "blur" },
        ],
        businessLicense: [
          { required: true, message: '营业执照不能为空', trigger: 'blur' }
        ],
        accountOpeningPermit: [
          {
            required: true,
            message: '开户许可证不能为空',
            trigger: 'blur'
          }
        ],
        linkName: [
          { required: true, message: '联系人姓名不能为空', trigger: 'blur' }
        ],
        linkPhone: [
          { required: true, message: '联系人手机号不能为空', trigger: 'blur' },
          { validator: this.checkAge, trigger: 'blur' }
        ],
        realName: [
          { required: true, message: '银行开户名不能为空', trigger: 'blur' }
        ],
        bankCardNumber: [
          { required: true, message: '开户银行账号不能为空', trigger: 'blur' },
          { validator: this.checkAge, trigger: 'blur' }
        ],
        bankBranchName: [
          {
            required: true,
            message: '开户银行支行名称不能为空',
            trigger: 'blur'
          }
        ],
        bankAddress: [
          {
            required: true,
            message: '开户银行所在地不能为空',
            trigger: 'blur'
          }
        ],
        bussnessNature: [
          { required: true, message: '法定经验范围不能为空', trigger: 'blur' }
        ],
        legalPersonName: [
          { required: true, message: '法人姓名不能为空', trigger: 'blur' }
        ],
        legalPersonPhone: [
          { required: true, message: '法人手机号不能为空', trigger: 'blur' },
          { validator: this.checkAge, trigger: 'blur' }
        ],
        idenFrontPicUrl: [
          {
            required: true,
            message: '联系人身份证照片正面不能为空',
            trigger: 'blur'
          }
        ],
        bondNum: [
          { required: true, message: '缴纳金额不能为空', trigger: 'blur' },
          { validator: this.checkAge, trigger: 'blur' }
        ],
        entryDate: [
          { required: true, message: '入驻日期不能为空', trigger: 'blur' }
        ],
        linkAddress: [
          { required: true, message: '商家地址不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    deptId() {
      return this.$store.getters.deptId
    }
  },
  created() {
    if (this.$route.query.readOnly) {
      // 使用$route.query.readOnly来标识页面是否可以编辑
      this.readonly = this.$route.query.readOnly == 'true' ? true : false
    }
    if (this.$route.query.shopId) {
      this.shopId = this.$route.query.shopId
      this.getInfo()
    } else {
      // 走到这里说明，这个页面是由商户登录，此时要看 审核状态是否允许编辑页面，
      this.shopId = this.$store.getters.shopId
      this.getInfo(true)
    }

  },
  methods: {
    // 如果审核状态是 已提交或通过，不允许编辑。返回readOnly为true
    readOnlyFromCheckStatus() {
      if (this.form.checkStatus === "1" || this.form.checkStatus === '2') {
        return true
      } else {
        return false
      }
    },

    getInfo(isPlatForm) {
      if (this.$route.query.shopId) {
        queryById(this.$route.query.shopId).then((response) => {
          this.form = response.data
          if (isPlatForm){
            this.readonly = this.readOnlyFromCheckStatus()
          }
          this.$forceUpdate()
        })
      } else {
        queryMyById().then((response) => {
          if (response.data) {
            this.form= response.data
            if (isPlatForm){
              this.readonly = this.readOnlyFromCheckStatus()
            }
            this.$forceUpdate()
          }
        })
      }
    },
    checkAge(rule, value, callback) {
      if (!Number.isInteger(Number(value))) {
        return callback(new Error('请输入数字值'))
      } else {
        return callback()
      }
    },
    submitForm() {

      if (this.$route.query.readOnly) {
        this.$router.go(-1)
        return
      }
      this.$refs['form'].validate((valid) => {
          if (valid && !this.form.shopId) {
            shopSave(this.form).then((response) => {
              this.$modal.msgSuccess('保存成功')
              this.$router.go(-1)
            })
          }
          if (valid && this.form.shopId) {
            this.$confirm("提交审核后将不能编辑，确定提交审核？", "提交审核", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              submitCheck(this.form).then(async res => {
                this.$modal.msgSuccess("提交成功");
                // 提交成功页面所有选项不可修改
                this.readonly = true;
                await this.getInfo()
                this.readOnlyFromCheckStatus()
                // this.$router.go(-1)
              });
            }).catch(() => {});
          }
      })
    },
    bondFlagChange(f) {
      if (f == 0) {
        this.form.bondNum = ''
      }
    },
    cancel() {
      this.$router.go(-1)
    },

  }
}
</script>

<style scoped>
::v-deep .el-input__inner {
  width: 350px;
}

.el-input {
  width: 350px;
}

.state-font {
  display: flex;
  font-size: 24px;
  color: #F56C6C;
}
</style>
