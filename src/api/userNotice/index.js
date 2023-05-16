/*
 * @Author: your name
 * @Date: 2022-04-07 08:59:17
 * @LastEditTime: 2022-04-26 15:22:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\userNotice\index.js
 */
import request from '@/utils/request'

// 用户消息分页查询
export function userNoticePage(query) {
    return request({
        url: '/userNotice/page/list',
        method: 'post',
        data: query
    })
}
// 用户消息保存
export function upDateUserNotice(query) {
    return request({
        url: '/userNotice/save',
        method: 'post',
        data: query
    })
}
// 更新消息状态为已读
export function changeStateToRead(data){
  return request({
    url: '/userNotice/changeStateToRead',
    method: 'post',
    data: data
  })
}

// 用户消息更新
export function emitUserNotice(query) {
    return request({
        url: '/userNotice/update',
        method: 'post',
        data: query
    })
}

// 用户消息删除
export function deleteUserNotice(id) {
    return request({
        url: '/userNotice/delete/' + id,
        method: 'DELETE',
    })
}


// 消息id查询
export function queryById(id) {
  return request({
      url: '/userNotice/queryById/' + id,
      method: 'get',
  })
}
