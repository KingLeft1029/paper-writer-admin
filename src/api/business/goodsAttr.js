/*
 * @Author: your name
 * @Date: 2022-04-07 08:59:17
 * @LastEditTime: 2022-04-15 16:33:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \Long-term-vision-of-the-times-PC\src\api\business\goodsInfo.js
 */
import request from '@/utils/request'


// 保存规格名
export function attrNameSave(data) {
    return request({
        url: '/goodsAttrName/save',
        method: 'post',
        data: data
    })
}


