/*
 * @Author: your name
 * @Date: 2022-04-07 08:59:17
 * @LastEditTime: 2022-04-27 16:47:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\postage\index.js
 */
import request from "@/utils/request"
// 邮费模板保存
export function postageUpdate(query) {
  return request({
    url: "/postageModel/update",
    method: "post",
    data: query,
  })
}
// 删除
export function postageModelDelete(Id) {
  return request({
    url: "/postageModel/delete/" + Id,
    method: "delete",
  })
}
// 邮费模板新增
export function postageSave(query) {
  return request({
    url: "/postageModel/save",
    method: "post",
    data: query,
  })
}
// 邮费模板详情分页查询
export function postageDetailPage(query) {
  return request({
    url: "/postageModelDetail/page/list",
    method: "post",
    data: query,
  })
}

// 邮费模板分页查询
export function postagePage(query) {
  return request({
    url: "/postageModel/page/list",
    method: "post",
    data: query,
  })
}

// 根据邮费模板id获取标注省市
export function getMark(modelId) {
  return request({
    url: "/postageModel/regionIds/" + modelId,
    method: "GET",
  })
}

// 根据邮费模板
export function postageModelById(Id) {
  return request({
    url: "/postageModel/queryDetail/" + Id,
    method: "GET",
  })
}
