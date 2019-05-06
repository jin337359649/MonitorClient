import request from '@/utils/request'

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

