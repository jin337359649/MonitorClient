import axios from 'axios'

const hoistUrl = 'http://61.147.108.47:9111/api'

export function getList(params) {
  return axios.get(`${hoistUrl}/Devices/QueryDevices`, { params: params })
}

export function getById(params) {
  return axios.get(`${hoistUrl}/Devices/GetById`, { params: params })
}

