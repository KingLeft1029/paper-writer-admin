/*
 * @Author: your name
 * @Date: 2022-04-29 17:27:36
 * @LastEditTime: 2022-05-04 16:24:38
 * @LastEditors: gaoda 1622658376@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital_earth_PC\src\api\settlement\index.js
 */
import request from "@/utils/request"

// 结算管理详情分页查询
export function settlementPage(query) {
  return request({
    url: "/settleRecord/page/list",
    method: "post",
    data: query,
  })
}

// 同意返回
export function settlementAgree(query) {
  return request({
    url: "/settleRecord/agreeApply?ids=" + query,
    method: "get",
    data: query,
  })
}


// 驳回返回
export function settlementRejected(query, text) {
  return request({
    url: "/settleRecord/disAgreeApply?ids=" + query + "&backReason=" + text,
    method: "get",
  })
}

// 结算管理详情Id查询
export function queryById(id) {
  return request({
    url: "/settleRecord/queryById/" + id,
    method: "get",
  })
}

// 获取当前用户的可结算详情List
export function detailList(data) {
  return request({
    url: "settleRecord/detailList",
    method: "post",
    data
  })
}
// 获取当前用户的可结算详情 分页
export function detailPageList(data) {
  return request({
    url: "settleRecord/detailPageList",
    method: "post",
    data
  })
}
// 结算管理详情
export function settleRecordUpdate(data) {
  return request({
    url: "/settleRecord/update",
    method: "put",
    data
  })
}

// 结算保存/提交
export function settleRecordSave(data) {
  return request({
    url: "/settleRecord/save",
    method: "post",
    data
  })
}


// 结算撤回
export function backApply(data) {
  return request({
    url: "/settleRecord/backApply",
    method: "get",
    params: data
  })
}