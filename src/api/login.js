import request from '@/utils/request'

export function getInfo(id) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { id }
  })
}
