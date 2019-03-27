import axios from 'axios'

export function getList(params) {
  return axios.get(`/api/Devices/QueryDevices`, { params: params })
}

export function getById(params) {
  return axios.get(`/api/Devices/GetById`, { params: params })
}

