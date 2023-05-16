import request from "@/utils/request";

/**
 * 查询编码列表-树结构
 * @param data
 * @returns {*}
 */
export function listGoodsCode(data) {
  return request({
    url: "/business/goodsCode/typeTree",
    method: "post",
    data: data,
  });
}

/**
 * 查询编码详细
 * @param id
 * @returns {*}
 */
export function getGoodsCode(id) {
  return request({
    url: "/business/goodsCode/queryById/" + id,
    method: "get",
  });
}

/**
 * 新增编码
 * @param data
 * @returns {*}
 */
export function addGoodsCode(data) {
  return request({
    url: "/business/goodsCode/save",
    method: "post",
    data: data,
  });
}

/**
 * 修改编码
 * @param data
 * @returns {*}
 */
export function updateGoodsCode(data) {
  return request({
    url: "/business/goodsCode/update",
    method: "post",
    data: data,
  });
}

/**
 * 删除编码
 * @param ids
 * @param data
 * @returns {*}
 */
export function delGoodsCode(ids, data) {
  return request({
    url: `/business/goodsCode/delete/${ids}`,
    method: "delete",
    data
  });
}
