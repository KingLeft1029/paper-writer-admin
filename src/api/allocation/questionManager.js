/*
 * @Author: your name
 * @Date: 2022-04-07 13:22:14
 * @LastEditTime: 2023-01-30 11:40:29
 * @LastEditors: wangzuo wangzuo@diandong.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\allocation\questionManager.js
 */
import request from '@/utils/request'

// 查询常见问题列表
export function listQuestionManager(data) {
  return request({
    url: '/questionManager/page/list',
    method: 'post',
    data: data
  })
}

// 查询常见问题详细
export function getQuestionManager(questionId) {
  return request({
    url: '/questionManager/queryById/' + questionId,
    method: 'get'
  })
}

// 新增常见问题
export function addQuestionManager(data) {
  return request({
    url: '/questionManager/save',
    method: 'post',
    data: data
  })
}

// 修改常见问题
export function updateQuestionManager(data) {
  return request({
    url: '/questionManager/update',
    method: 'post',
    data: data
  })
}

// 删除常见问题
export function delQuestionManager(questionId) {
  return request({
    url: '/questionManager/delete/' + questionId,
    method: 'delete'
  })
}

// 导出常见问题
export function exportQuestionManager(query) {
  return request({
    url: '/questionManager/export',
    method: 'get',
    params: query
  })
}
