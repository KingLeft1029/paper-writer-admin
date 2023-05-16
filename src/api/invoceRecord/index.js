/*
 * @Author: your name
 * @Date: 2022-04-25 21:09:22
 * @LastEditTime: 2022-04-27 09:33:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital_earth_PC\src\api\invoceRecord\index.js
 */
import request from '@/utils/request'

// 查询缓存详细
export function invoceRecordPage(data) {
    return request({
        url: '/invoceRecord/page/list',
        method: 'post',
        data,
    })
}

// 开票管理同意
export function invoceRecordemAgree(query) {
    return request({
        url: '/invoceRecord/batchAgree',
        method: 'post',
        data:query
    })
}
// 导出
export function invoceRecordExport(query) {
  return request({
      url: '/invoceRecord/export',
      method: 'post',
      data:query
  })
}
