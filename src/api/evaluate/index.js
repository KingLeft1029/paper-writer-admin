/*
 * @Author: your name
 * @Date: 2022-05-02 15:47:44
 * @LastEditTime: 2022-05-03 15:11:40
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital_earth_PC\src\api\evaluate\index.js
 */
import request from "@/utils/request";

// 评价审核分页查询
export function evaluatePage(query) {
  return request({
    url: "/orderEva/page/list",
    method: "post",
    data: query,
  });
}

// 评价审核删除
export function evaluateDelet(idArr) {
  return request({
    url: "/orderEva/delete",
    method: "DELETE",
    data: idArr,
  });
}

// 评价审核详情查询
export function evaluatedeTails(id) {
  return request({
    url: "/orderEva/queryById/" + id,
    method: "GET",
    data: id,
  });
}

// 评价审核同意or驳回
export function evaluatedeChoice(id) {
  return request({
    url: "/orderEva/check",
    method: "post",
    data: id,
  });
}
