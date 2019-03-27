import request from '@/utils/request'
import { RSAEncrypt } from '@/utils/RSA/RSA'

export function getInfo(id) {
  return request({
    url: '/login/Home/info',
    method: 'post',
    params: { id }
  })
}

export function login(userName, password) {
  password = RSAEncrypt(password)

  return request({
    url: '/login/Home/LoginPost',
    method: 'post',
    params: { LoginName: userName, Password: password }
  })
}
