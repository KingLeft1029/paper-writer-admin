/*
 * @Author: your name
 * @Date: 2022-04-08 09:45:06
 * @LastEditTime: 2022-04-08 09:56:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\allocation\invitationCode.js
 */
import request from '@/utils/request'

// 查询邀请码列表
export function listInvitationCode (data) {
  return request({
    url: '/invitationCode/page/list',
    method: 'post',
    data: data
  })
}

// 查询邀请码详细
export function getInvitationCode (codeId) {
  return request({
    url: '/invitationCode/queryById/' + codeId,
    method: 'get'
  })
}

// 新增邀请码
export function addInvitationCode (data) {
  return request({
    url: '/invitationCode/save',
    method: 'post',
    data: data
  })
}

// 修改邀请码
export function updateInvitationCode (data) {
  return request({
    url: '/invitationCode/update',
    method: 'post',
    data: data
  })
}

// 删除邀请码
export function delInvitationCode (codeId) {
  return request({
    url: '/invitationCode/delete/' + codeId,
    method: 'delete'
  })
}

// 导出邀请码
export function exportInvitationCode (query) {
  return request({
    url: '/invitationCode/export',
    method: 'get',
    params: query
  })
}
