/*
 * @Author: your name
 * @Date: 2022-04-07 16:46:39
 * @LastEditTime: 2023-01-30 13:09:22
 * @LastEditors: wangzuo wangzuo@diandong.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\allocation\shopConfig.js
 */
import request from '@/utils/request'


// 热门搜索分页查询
export function hotSearchPage(data) {
  return request({
    url: '/hotSearch/page/list',
    method: 'post',
    data
  })
}
//热门搜索新增
export function hotSearchAdd(data) {
  return request({
    url: '/hotSearch/save',
    method: 'post',
    data
  })
}
//热门搜索修改
export function hotSearchUpdate(data) {
  return request({
    url: '/hotSearch/update',
    method: 'post',
    data
  })
}

//热门搜索删除
export function hotSearchDelete(id) {
  return request({
    url: '/hotSearch/delete/' + id,
    method: 'DELETE',
  })
}
