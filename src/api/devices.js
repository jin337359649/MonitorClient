import request from '@/utils/request'

const hostUrl = 'http://localhost:9111/api'

export function getList(params) {
  return request({
    url: `${hostUrl}/Devices`,
    method: 'get',
    params
  })
}
