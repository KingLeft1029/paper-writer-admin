/*
 * @Author: mikeShn
 * @Date: 2022-04-19 09:12:38
 * @LastEditTime: 2022-04-19 13:40:29
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\Z-Form\form-item\mixin\validate.js
 * @Description: 文件说明
 */
export const Mixin = {
  methods: {
    // 整数验证
    int(rule, value, callback) {
      let val = this.formData[this.inputInfo.prop]
      let flag = Number.isInteger(Number(val))
      if (!flag && Number(val) !== 0) {
        return callback(new Error(this.$t('PLEASE_INPUT_A_POSITIVE_INTEGER')))
      } else {
        callback()
      }
    },
    // 整数验证或浮点数
    number(rule, value, callback) {
      let val = this.formData[this.inputInfo.prop]
      if (!val) return callback()
      if (!Number(val) || Number(val) < 0) {
        return callback(new Error(this.$t('PLEASE_INPUT_A_VALUE')))
      } else {
        callback()
      }
    },
    // 是否必填
    isRequired(rule, value, callback) {
      let val = this.formData[this.inputInfo.prop]
      if (this.inputInfo.type == "intNumber" && Number(val) === 0 && Number.isInteger(val)) {
        return callback()
      }
      if (!val) {
        return callback(new Error(`${this.$t('PLEASE_INPUT')} ${this.$t(this.inputInfo.name)}`))
      } else {
        callback()
      }
    },
  },
  created() {
    if (this.inputInfo.required) {
      this.rules.push({
        validator: this.isRequired,
        trigger: "blur",
      })
    }
    if (this.inputInfo.type == "number") {
      this.rules.push({
        validator: this.number,
        trigger: "change",
      })
    }
    if (this.inputInfo.type == "intNumber") {
      this.rules.push({
        validator: this.int,
        trigger: "change",
      })
    }
    if (this.inputInfo.validate) {
      this.inputInfo.validate.forEach((item) => {
        this.rules.push({
          validator: this[item],
          trigger: "blur",
        })
      })
    }
  }
}
