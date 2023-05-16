import request from "@/utils/request";

// 查询goodsType列表
export function listGoodsType(data) {
  return request({
    url: "/goodsType/typeTree",
    method: "post",
    data: data,
  });
}

// 查询goodsType详细
export function getGoodsType(typeId) {
  return request({
    url: "/goodsType/queryById/" + typeId,
    method: "get",
  });
}

// 新增goodsType
export function addGoodsType(data) {
  return request({
    url: "/goodsType/save",
    method: "post",
    data: data,
  });
}

// 修改goodsType
export function updateGoodsType(data) {
  return request({
    url: "/goodsType/update",
    method: "post",
    data: data,
  });
}

// 删除goodsType
export function delGoodsType(data) {
  return request({
    url: "/goodsType/delete/" + data,
    method: "delete"
  });
}

// 导出goodsType
export function exportGoodsType(query) {
  return request({
    url: "/goodsType/export",
    method: "get",
    params: query,
  });
}
