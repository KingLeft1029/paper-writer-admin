import { parseTime } from "./ruoyi"


//获取当前时间并分别返回年月日
export function getCurTime() {
  let dt = new Date()
  let y = dt.getFullYear()
  let mt = dt.getMonth() + 1
  let day = dt.getDate()
  let h = dt.getHours() //获取时
  let m = dt.getMinutes() //获取分
  let s = dt.getSeconds() //获取秒
  return {
    y,
    mt,
    day,
    h: h < 10 ? `0${h}` : h,
    m: m < 10 ? `0${m}` : m,
    s: s < 10 ? `0${s}` : s,
  }
}


// 时间戳转换为 yyyy-mm-dd
export function format(date, formatstr) {
  let arrweek = ["日", "一", "二", "三", "四", "五", "六"]
  let str = formatstr
    .replace(/yyyy|YYYY/, date.getFullYear())
    .replace(/yy|YY/, $addZero(date.getFullYear() % 100, 2))
    .replace(/mm|MM/, $addZero(date.getMonth() + 1, 2))
    .replace(/m|M/g, date.getMonth() + 1)
    .replace(/dd|DD/, $addZero(date.getDate(), 2))
    .replace(/d|D/g, date.getDate())
    .replace(/hh|HH/, $addZero(date.getHours(), 2))
    .replace(/h|H/g, date.getHours())
    .replace(/ii|II/, $addZero(date.getMinutes(), 2))
    .replace(/i|I/g, date.getMinutes())
    .replace(/ss|SS/, $addZero(date.getSeconds(), 2))
    .replace(/s|S/g, date.getSeconds())
    .replace(/w|g/, $addZero(date.getDay(), 2))
    .replace(/W/g, arrweek[date.getDay()])
  return str
}
// }
// 颜色
export function getColor(m, type) {
  let color = []
  if (type) {
    color = [{
      deep: '#4379D7',
      low: '#73A2F5'
    }, {
      deep: '#52A8FC',
      low: '#52CAFC'
    }, {
      deep: '#FF5949',
      low: '#FD8074'
    }, {
      deep: '#73A2F5',
      low: '#a3bff0'
    }, {
      deep: '#30C9C6',
      low: '#6AEEEB'
    },
    {
      deep: '#A156C4',
      low: '#C07CE1'
    }, {
      deep: '#EF4396',
      low: '#FF7DD3'
    }, {
      deep: '#FF9049',
      low: '#FABC47'
    }, {
      deep: '#57BA4E',
      low: '#88E77D'
    }
    ]
  } else {

    color = [{
      deep: '#F6AE46',
      low: '#FECB49'
    }, {
      deep: '#17BDBD',
      low: '#54D2CE'
    }, {
      deep: '#FD8074',
      low: '#ffdbdb'
    }, {
      deep: '#73A2F5',
      low: '#a3bff0'
    }, {
      deep: '#87E7FF',
      low: '#b7ebf8'
    }, {
      deep: '#57BA4E',
      low: '#88E77D'
    }, {
      deep: '#A156C4',
      low: '#C07CE1'
    }, {
      deep: '#4DC2FF',
      low: '#53C0E9'
    }, {
      deep: '#EF4396',
      low: '#FF7DD3'
    },]
  }

  let p = [];
  let k = 0;
  for (let i = 0; i < m.length; i++) {
    if (i > (color.length - 1)) {
      if (k / color.length == 1) {
        k = 0;
      }
      p.push({
        deep: color[k].deep,
        low: color[k].low

      })
      k++;
    } else {
      p.push({
        deep: color[i].deep,
        low: color[i].low
      })
    }
  }

  return p

}

// 颜色
export function getReColor(m) {


  let color = [{
    deep: '#F6AE46',
    low: '#FECB49'
  }, {
    deep: '#17BDBD',
    low: '#54D2CE'
  }, {
    deep: '#FD8074',
    low: '#FD8074'
  }, {
    deep: '#73A2F5',
    low: '#73A2F5'
  }, {
    deep: '#87E7FF',
    low: '#87E7FF'
  }]

  let p = [];
  let k = 0;
  for (let i = 0; i < m.length; i++) {
    if (i > (color.length - 1)) {
      if (k / color.length == 1) {
        k = 0;
      }
      p.push({
        deep: color[k].deep,
        low: color[k].low

      })
      k++;
    } else {
      p.push({
        deep: color[i].deep,
        low: color[i].low
      })
    }
  }

  return p

}
function $addZero(v, size) {
  for (let i = 0, len = size - (v + "").length; i < len; i++) {
    v = "0" + v
  }
  return v + ""
}
/**
 * 表格时间格式化
 */
export function formatDate(cellValue) {
  if (cellValue == null || cellValue == "") return ""
  var date = new Date(cellValue)
  var year = date.getFullYear()
  var month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate()
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
  var minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
  var seconds =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
  return (
    year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds
  )
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (("" + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return "刚刚"
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + "分钟前"
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + "小时前"
  } else if (diff < 3600 * 24 * 2) {
    return "1天前"
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf("?") + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * @param {string} input value
 * @returns {number} output value
 */
export function byteLength(str) {
  // returns the byte length of an utf8 string
  let s = str.length
  for (var i = str.length - 1; i >= 0; i--) {
    const code = str.charCodeAt(i)
    if (code > 0x7f && code <= 0x7ff) s++
    else if (code > 0x7ff && code <= 0xffff) s += 2
    if (code >= 0xdc00 && code <= 0xdfff) i--
  }
  return s
}

/**
 * @param {Array} actual
 * @returns {Array}
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * @param {Object} json
 * @returns {Array}
 */
export function param(json) {
  if (!json) return ""
  return cleanArray(
    Object.keys(json).map((key) => {
      if (json[key] === undefined) return ""
      return encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
    })
  ).join("&")
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split("?")[1]).replace(/\+/g, " ")
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split("&")
  searchArr.forEach((v) => {
    const index = v.indexOf("=")
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @param {string} val
 * @returns {string}
 */
export function html2Text(val) {
  const div = document.createElement("div")
  div.innerHTML = val
  return div.textContent || div.innerText
}

/**
 * Merges two objects, giving the last one precedence
 * @param {Object} target
 * @param {(Object|Array)} source
 * @returns {Object}
 */
export function objectMerge(target, source) {
  if (typeof target !== "object") {
    target = {}
  }
  if (Array.isArray(source)) {
    return source.slice()
  }
  Object.keys(source).forEach((property) => {
    const sourceProperty = source[property]
    if (typeof sourceProperty === "object") {
      target[property] = objectMerge(target[property], sourceProperty)
    } else {
      target[property] = sourceProperty
    }
  })
  return target
}

/**
 * @param {HTMLElement} element
 * @param {string} className
 */
export function toggleClass(element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += "" + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

/**
 * @param {string} type
 * @returns {Date}
 */
export function getTime(type) {
  if (type === "start") {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== "object") {
    throw new Error("error arguments", "deepClone")
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === "object") {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ""
  const randomNum = parseInt((1 + Math.random()) * 65536) + ""
  return (+(randomNum + timestamp)).toString(32)
}

/**
 * Check if an element has a class
 * @param {HTMLElement} elm
 * @param {string} cls
 * @returns {boolean}
 */
export function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"))
}

/**
 * Add class to element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls
}

/**
 * Remove class from element
 * @param {HTMLElement} elm
 * @param {string} cls
 */
export function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)")
    ele.className = ele.className.replace(reg, " ")
  }
}

export function makeMap(str, expectsLowerCase) {
  const map = Object.create(null)
  const list = str.split(",")
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase ? (val) => map[val.toLowerCase()] : (val) => map[val]
}

export const exportDefault = "export default "

export const beautifierConf = {
  html: {
    indent_size: "2",
    indent_char: " ",
    max_preserve_newlines: "-1",
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "separate",
    brace_style: "end-expand",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: "110",
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
  js: {
    indent_size: "2",
    indent_char: " ",
    max_preserve_newlines: "-1",
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: "normal",
    brace_style: "end-expand",
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: "110",
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase())
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/_[a-z]/g, (str1) => str1.substr(-1).toUpperCase())
}

export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str)
}
