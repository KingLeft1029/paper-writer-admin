/*
 * @Author: mikeShn
 * @Date: 2022-03-18 18:13:36
 * @LastEditTime: 2022-04-19 16:01:12
 * @FilePath: \Long-term-vision-of-the-times-PC\src\views\components\Z-Dialog\index.js
 * @Description: 文件说明
 */
import Dialog from "./index.vue"
import Vue from "vue"
let myDialog = Vue.extend(Dialog)
let instance


let openDialog = function (options = {}) {
  let params = options.data ? options.data : Object.create(null)
  instance = new myDialog({
    data: {
      that: this,
      title: options.title,
      width: options.width,
      ...params,
      beforeClose: options.beforeClose,
    },
    components: {
      DialogContent: options.components
    },
  })

  document.body.appendChild(instance.$mount().$el)
}

export default openDialog
