/*
 * @Author: your name
 * @Date: 2022-04-27 16:47:14
 * @LastEditTime: 2022-04-27 16:47:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital_earth_PC\src\api\trading\index.js
 */

import request from '@/utils/request'

// 进账明细查询
export function makeDetailPage(query) {
    return request({
        url: '/orderInfo/receiveDetail',
        method: 'post',
        data: query
    })
}

// 出账明细查询
export function outDetailPage(query) {
    return request({
        url: '/orderInfo/recordBack',
        method: 'post',
        data: query
    })
}

