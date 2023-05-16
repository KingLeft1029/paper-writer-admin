import request from "@/utils/request";

// 新增商品管理编码规格
export function newGoods(data) {
  return request({
    url: "/deGoodsModelAttr",
    method: "post",
    data: data,
  });
}
// 获取列表商品管理编码规格
export function getGoodsList(query) {
  return request({
    url: "/deGoodsModelAttr/page/list",
    method: "GET",
    params: query,
  });
}
// 编辑列表商品管理编码规格
export function editGoods(data) {
  return request({
    url: "/deGoodsModelAttr",
    method: "PUT",
    data: data,
  });
}
// 删除列表商品管理编码规格
export function deleteGodds(id) {
  return request({
    url: `/deGoodsModelAttr/${id}`,
    method: "DELETE",
  });
}
// 批量删除列表商品管理编码规格
export function clearGodds(data) {
  return request({
    url: `/deGoodsModelAttr/batch`,
    method: "DELETE",
    data,
  });
}
// 详情接口表商品管理编码规格
export function getdetails(id) {
  return request({
    url: `/deGoodsModelAttr/${id}`,
    method: "GET",
  });
}
//导出模板
export function getEport(data) {
  return request({
    url: `/deGoodsModelAttrDetail/export`,
    method: "POST",
    data,
  });
}

//导入文件
export function improtFile(data) {
  return request({
    url: `/deGoodsModelAttrDetail/import`,
    method: "POST",
    data,
  });
}
