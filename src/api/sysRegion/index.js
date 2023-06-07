/*
 * @Author: your name
 * @Date: 2022-04-07 08:59:17
 * @LastEditTime: 2022-04-22 15:11:42
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\sysRegion\index.js
 */
import request from '@/utils/request'

// 地区树查询
export function sysRegionTree(query) {
    return request({
        url: '/sysRegion/tree',
        method: 'post',
        data: query
    })
}

export function regionQueryById(id) {
    return request({
        url: '/sysRegion/queryById/' + id,
        method: 'get',
    })
}
