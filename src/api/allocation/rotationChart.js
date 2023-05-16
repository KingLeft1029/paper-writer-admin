/*
 * @Author: your name
 * @Date: 2022-04-07 16:46:39
 * @LastEditTime: 2022-04-07 16:48:51
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\allocation\rotationChart.js
 */
import request from '@/utils/request'

// 查询轮播图配置列表
export function listRotationChart(data) {
  return request({
    url: '/rotationChart/page/list',
    method: 'post',
    data: data
  })
}

// 查询轮播图配置详细
export function getRotationChart(retationId) {
  return request({
    url: '/rotationChart/queryById/' + retationId,
    method: 'get'
  })
}

// 新增轮播图配置
export function addRotationChart(data) {
  return request({
    url: '/rotationChart/save',
    method: 'post',
    data: data
  })
}

// 修改轮播图配置
export function updateRotationChart(data) {
  return request({
    url: '/rotationChart/update',
    method: 'post',
    data: data
  })
}

// 删除轮播图配置
export function delRotationChart(ids) {
  return request({
    url: '/rotationChart/delete',
    method: 'post',
    data: ids
  })
}

// 导出轮播图配置
export function exportRotationChart(query) {
  return request({
    url: '/rotationChart/export',
    method: 'get',
    params: query
  })
}
