/*
 * @Author: mikeShn
 * @Date: 2022-04-24 10:18:56
 * @LastEditTime: 2022-04-24 11:31:27
 * @FilePath: \digital-earth-PC\src\api\allocation\richText.js
 * @Description: 文件说明
 */

import request from '@/utils/request'
// 关于我们
export function aboutUs() {
    return request({
        url: '/rich_text/aboutUs',
        method: 'GET',
    })
}
// 协议
export function agreement() {
    return request({
        url: '/rich_text/service/protocol',
        method: 'GET',
    })
}

