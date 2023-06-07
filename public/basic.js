/*
 * @Author: your name
 * @Date: 2021-11-12 11:39:29
 * @LastEditTime: 2022-05-03 16:39:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \digital-earth-PC\public\basic.js
 */

let origin=location.origin;//为了使用多网卡环境
let path="/robot";
let server_api=origin+path;
server_api="http://192.168.20.222:8888"//生产环境需要注释该行
window.g = {
  //访问接口
  api: 'http://101.42.37.240:20014'
  // api: server_api
}

