import request from '@/utils/request'

export function getCategories() {
  return request({
    url: '/login/Home/QueryCategories',
    method: 'get'
  })
}

export function getList(params) {
  return request({
    url: '/api/Devices/QueryDevices',
    method: 'get',
    params: params
  })
}

export function getById(params) {
  return request({
    url: '/api/Devices/GetById',
    method: 'get',
    params: params
  })
}

export function getHistoryLog(params) {
  return request({
    url: '/api/Devices/GetHistoryData',
    method: 'get',
    params: params
  })
}

export function getFireCarById(params) {
  return request({
    url: '/api/FireCarDevices/GetById',
    method: 'get',
    params: params
  })
}

export function getAirConditionerById(params) {
  return request({
    url: '/api/AirControl/GetExpandById',
    method: 'get',
    params: params
  })
}

export function getGarbageCarById(params) {
  return request({
    url: '/api/HwcDevices/GetHwcExpandById',
    method: 'get',
    params: params
  })
}

export function getHistoryLocation(params) {
  return request({
    url: '/api/Devices/GetHistoryLocation',
    method: 'get',
    params: params
  })
}
