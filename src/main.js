/*
 * @Author: mikeShn
 * @Date: 2022-04-11 17:35:38
 * @LastEditTime: 2022-04-19 14:02:28
 * @FilePath: \Long-term-vision-of-the-times-PC\src\main.js
 * @Description: 文件说明
 */
import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/en'


import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive
import plugins from './plugins' // plugins
import { download } from '@/utils/request'

import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data"
import { getConfigKey } from "@/api/system/config"
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, handleTree } from "@/utils/ruoyi"
// 分页组件
import Pagination from "@/components/Pagination"
// 自定义表格工具组件
import RightToolbar from "@/components/RightToolbar"
// 富文本组件
import Editor from "@/components/Editor"
// 文件上传组件
import FileUpload from "@/components/FileUpload"
// 图片上传组件
import ImageUpload from "@/components/ImageUpload"
// 图片预览组件
import ImagePreview from "@/components/ImagePreview"
// 字典标签组件
import DictTag from '@/components/DictTag'
// 头部标签组件
import VueMeta from 'vue-meta'
// 字典数据组件
import DictData from '@/components/DictData'

// 自定义弹框
import openDialog from "@/views/components/Z-Dialog/index.js"
Vue.prototype.$openDialog = openDialog

import { warnMag } from './views/components/warnMag'
Vue.prototype.$warnMag = warnMag
// 引入阿里图标库
import "./assets/icon-font/iconfont.css"

import dataV from "@jiaminghi/data-view"
Vue.use(dataV)

import myCharts from './myCharts';
Vue.use(myCharts)

import I18n from "vue-i18n"
import { zh } from "./i18n/LangZh"
import { en } from "./i18n/LangEn"


// 全局方法挂载
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree



// 全局组件挂载
Vue.component('DictTag', DictTag)
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)
Vue.component('Editor', Editor)
Vue.component('FileUpload', FileUpload)
Vue.component('ImageUpload', ImageUpload)
Vue.component('ImagePreview', ImagePreview)

Vue.use(directive)
Vue.use(plugins)
Vue.use(VueMeta)
Vue.use(I18n)

DictData.install()

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
if(Cookies.get("language")){

}else{
  Cookies.set("language",'en')
}
store.commit('SET_LANG', Cookies.get("language"));

Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
  locale: Cookies.get("language") == 'en' ? locale : false

})
const i18n = new I18n({
  locale: Cookies.get("language") || "en",
  messages: {
    zh,
    en
  }
})

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App),

})



export { i18n }
