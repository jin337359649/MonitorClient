import axios from 'axios'

export function getList(params) {
  return axios.get('http://localhost:9111/api/Devices', { params: params })
}
