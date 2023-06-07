import request from '@/utils/request'
import qs from 'qs'

// 区域集合查询
export function robotInfoList(data) {
  return request({
    url: '/robotInfo/list',
    method: 'post',
    data
  })
}
// 机器人列表-导入
export function importData(data) {
  return request({
    url: '/robotInfo/importData',
    method: 'post',
    data: data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}

export function robotUpdate(data) {
  return request({
    url: '/robotInfo/update',
    method: 'post',
    data,
  })
}
//机器人批量删除
export function deleteRobotDataBatch(data) {
  return request({
    url: '/robotData/deleteRobotDataBatch',
    method: 'post',
    data: data,
  })
}
// 状态删除
export function deleteBatch(data) {
  return request({
    url: '/robotData/deleteBatch',
    method: 'post',
    data: data,
  })
}
// 状态批量删除
export function deleteBatchByWrapper(data) {
  return request({
    url: '/robotData/deleteBatchByWrapper',
    method: 'post',
    data: data,
  })
}

// 追踪器删除
export function deleteTrackerBatch(data) {
  return request({
    url: '/trackerData/deleteBatch',
    method: 'post',
    data: data,
  })
}
// 追踪器批量删除
export function trackerDataDeleteBatch(data) {
  return request({
    url: '/trackerData/deleteBatchByWrapper',
    method: 'post',
    data: data,
  })
}
// 气象数据删除
export function deletemeteorologicalBatch(data) {
  return request({
    url: '/stationData/deleteBatch',
    method: 'post',
    data: data,
  })
}
// 气象数据删除
export function stationDataDeleteBatch(data) {
  return request({
    url: '/stationData/deleteBatchByWrapper',
    method: 'post',
    data: data,
  })
}
// 机器人统计报表批量删除
export function deleteRobotDataByWrapper(data) {
  return request({
    url: '/robotData/deleteRobotDataByWrapper',
    method: 'post',
    data: data,
  })
}


// 操作机器人读取 1电机电流1 2电池电压3机器人状态4电机电流2 5机器人位置
export function readRobot(data) {
  return request({
    url: '/robotInfo/readRobot?readType='+data.readType,
    method: 'post',
    data: data.robotIds,
  })
}
// 操作机器人写 参数为机器人id数组 和写指令 1停止2返回3休眠4复位5启动
export function writeRobot(data) {
  return request({
    url: '/robotInfo/writeRobot?writeType='+data.writeType,
    method: 'post',
    data: data.robotIds,
  })
}
// 操作机器人写 参数为机器人id数组 和写指令 1停止2返回3休眠4复位5启动
export function queryById(id) {
  return request({
    url: '/robotInfo/queryById/' + id,
    method: 'get',
  })
}

// 状态统计报表
export function stateChart(data) {
  return request({
    url: '/robotInfo/stateChart',
    method: 'post',
    data
  })
}


// 机器人统计报表
export function robotChart(data) {
  return request({
    url: '/robotData/page/list',
    method: 'post',
    data
  })
}


//新的状态报表
export function stateChart_new(data) {
  return request({
    url: '/robotInfo/stateChart_new',
    method: 'post',
    data
  })
}
