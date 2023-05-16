import request from "@/utils/request";

// 快递公司集合查询
export function deliveryCompanyManageList(data) {
  return request({
    url: "/deliveryCompanyManage/list",
    method: "post",
    data: data,
  });
}
