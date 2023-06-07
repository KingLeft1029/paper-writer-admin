import axios from 'axios'
import { Notification, MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { tansParams, blobValidate } from "@/utils/ruoyi"

import { saveAs } from 'file-saver'
import Cookies from "js-cookie";
import Vue from "vue";
import I18n from "vue-i18n";
import { zh } from "../i18n/LangZh";
import { en } from "../i18n/LangEn";
Vue.use(I18n);
const $i18n = new I18n({
  locale: Cookies.get("language") || "en",
  messages: {
    zh,
    en,
  },
});
let downloadLoadingInstance

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: window.g.api,
  // 超时
  timeout: 60000
})

// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }

  downloadLoadingInstance = Loading.service({ spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0)", })
  config.headers["lang"] =
  Cookies.get("language") === undefined
    ? "zh_CN"
    : Cookies.get("language") === "en"
    ? "en_US"
    : "zh_CN";
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?' + tansParams(config.params)
    url = url.slice(0, -1)
    config.params = {}
    config.url = url
    setTimeout(() => {
      downloadLoadingInstance.close();
    }, 500)
  }
  return config
}, error => {
  console.log(error)
  downloadLoadingInstance.close();
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 未设置状态码则默认成功状态
  const code = res.data.code || 200
  if (code === 200 || res.data.code) {
    downloadLoadingInstance.close();
  }
  // 获取错误信息
  const msg = errorCode[code] || res.data.msg || errorCode['default']
  // 二进制数据则直接返回
  if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    return res.data
  }
  if (code === 401) {
    MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
      confirmButtonText: this.$t("Confirm"),
        cancelButtonText: this.$t("Cancel"),
      type: 'warning'
    }
    ).then(() => {
      store.dispatch('LogOut').then(() => {
        Country.href = '/index'
      })
    }).catch(() => { })
    return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
  } else if (code === 500) {
    Message({
      message: msg,
      type: 'error'
    })
    return Promise.reject(new Error(msg))
  } else if (code !== 200) {
    Notification.error({
      title: msg
    })
    return Promise.reject('error')
  } else {
    return res.data
  }
},
  error => {
    console.log('err' + error)
    let { message } = error
    if (message == "Network Error") {
      message = "后端接口连接异常"
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时"
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常"
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    downloadLoadingInstance.close();
    return Promise.reject(error)
  }
)

// 通用下载方法
export function download(url, params, filename) {

  downloadLoadingInstance = Loading.service({ text: "正在下载数据，请稍候", spinner: "el-icon-loading", background: "rgba(0, 0, 0, 0.7)", })
  return service.post(url, params, {
    transformRequest: [(params) => { return tansParams(params) }],
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' ,'lang':Cookies.get("language") === undefined
        ? "zh_CN"
        : Cookies.get("language") === "en"
        ? "en_US"
        : "zh_CN"},
    responseType: 'blob'
  }).then(async (data) => {
    const isLogin = await blobValidate(data);
    if (isLogin) {
      const blob = new Blob([data])
      saveAs(blob, filename)
    } else {
      const resText = await data.text();
      const rspObj = JSON.parse(resText);
      const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
      Message.error(errMsg);
    }
    downloadLoadingInstance.close();
  }).catch((r) => {
    console.error(r)
    Message.error('下载文件出现错误，请联系管理员！')
    downloadLoadingInstance.close();
  })
}


export default service
