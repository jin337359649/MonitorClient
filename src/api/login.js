import request from '@/utils/request'

export function getInfo(id) {
  return request({
    url: 'http://localhost:9001/api/user/info',
    method: 'get',
    params: { id }
  })
}
