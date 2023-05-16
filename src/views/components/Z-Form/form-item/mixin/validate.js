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
      if (!flag) {
        return callback(new Error("请输入整数数值"))
      } else {
        callback()
      }
    },
    // 整数验证或浮点数
    number(rule, value, callback) {
      let val = this.formData[this.inputInfo.prop]
      if (!val) return callback()
      if (!Number(val) && Number(val) != 0) {
        return callback(new Error("请输入数值"))
      } else {
        callback()
      }
    },
    // 输入框字数限制 
    limit(rule, value, callback) {
      let val = this.formData[this.inputInfo.prop]
      let limit = this.inputInfo.type == "input" ? 50 : 200
      if (val && val.length.length == (this.inputInfo.maxlength ? this.inputInfo.maxlength : limit)) {
        return callback(new Error(`已到达到最多字符输入限制`))
      } else {
        callback()
      }
    },
    // 是否必填
    isRequired(rule, value, callback) {
      let val = this.formData[this.inputInfo.prop]
      if (!val) {
        return callback(new Error(`请填写${this.inputInfo.name}`))
      } else {
        callback()
      }
    },
  },
  created() {
    if (this.inputInfo.type == 'input' || this.inputInfo.type == 'textarea') {
      this.rules.push({
        validator: this.limit,
        trigger: "blur",
      })
    }
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
