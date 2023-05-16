/*
 * @Author: your name
 * @Date: 2022-04-07 08:59:17
 * @LastEditTime: 2022-04-24 15:45:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital-earth-PC\src\api\business\goodsInfo.js
 */
import request from '@/utils/request'


// 批量上/下架
export function onSaleUpdate(data) {
  return request({
    url: '/goodsInfo/updateByIds',
    method: 'post',
    data: data
  })
}
// 商品审核列表查询
export function goodsCheck(data) {
  return request({
    url: '/goodsInfo/goodsCheck',
    method: 'post',
    data: data
  })
}
// 查询商品信息列表
export function listGoodsInfo(data) {
  return request({
    url: '/goodsInfo/page/list',
    method: 'post',
    data: data
  })
}

// 查询goodsType列表
export function listGoodsType(data) {
  return request({
    url: '/goodsType/pcTypeTree',
    method: 'post',
    data: data
  })
}

// 查询商品信息详细
export function getGoodsInfo(goodsId) {
  return request({
    url: '/goodsInfo/queryById/' + goodsId,
    method: 'get'
  })
}

// 新增商品信息
export function addGoodsInfo(data) {
  return request({
    url: '/goodsInfo/save',
    method: 'post',
    data: data
  })
}

// 修改商品信息
export function updateGoodsInfo(data) {
  return request({
    url: '/goodsInfo/update',
    method: 'post',
    data: data
  })
}

// 删除商品信息
export function delGoodsInfo(list) {
  return request({
    url: '/goodsInfo/delete/'+list,
    method: 'delete'
  })
}

/**
 * 提交商品审核到平台端，一个或多个
 * @param list
 * @returns {AxiosPromise}
 */
export function batchSubmitCheck(idList) {
  return request({
    url: '/goodsInfo/batchSubmitCheck',
    method: 'POST',
    data: idList
  })
}

// 导出商品信息
export function exportGoodsInfo(query) {
  return request({
    url: '/goodsInfo/export',
    method: 'get',
    params: query
  })
}

// 商品编号保存
export function goodsAttrSave(query) {
  return request({
    url: '/goodsAttr/save',
    method: 'POST',
    data: query
  })
}

// 商品编号编辑
export function goodsAttrUpdate(query) {
  return request({
    url: '/goodsAttr/update',
    method: 'POST',
    data: query
  })
}

// 商品编号删除
export function goodsAttrDelete(id) {
  return request({
    url: '/goodsAttr/delete/' + id,
    method: 'DELETE',
  })
}

// 常见问题修改
export function goodsFaqUpdate(data, type) {
  return request({
    url: '/goodsFaq',
    method: type,
    data,
  })
}
// 常见问题删除
export function goodsFaqDetele(id) {
  return request({
    url: '/goodsFaq/' + id,
    method: 'DELETE',
  })
}
// 常见问题列表
export function goodsFaqlist(id) {
  return request({
    url: '/goodsFaq/list/' + id,
    method: 'GET',
  })
}
// 应用行业列表
export function goodsApplicationIndustrylist(id) {
  return request({
    url: '/goodsApplicationIndustry/list/' + id,
    method: 'GET',
  })
}
// 应用行业修改
export function goodsApplicationIndustryUpdate(data, type) {
  return request({
    url: '/goodsApplicationIndustry',
    method: type,
    data
  })
}
// 应用行业修改
export function goodsApplicationIndustryDetele(id) {
  return request({
    url: '/goodsApplicationIndustry/' + id,
    method: 'delete',
  })
}

// 获取商品规格名
export function getGoodsSpecifications(query) {
  return request({
    url: '/deGoodsModelAttr/list',
    method: 'GET',
    params:query
  })
}
// 获取规格值查询列表
export function getGoodsvalues(query) {
  return request({
    url: '/deGoodsModelAttrDetail/page/list',
    method: 'GET',
    params:query
  })
}
