import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const LoginKey = 'Login'
const AuthCodeKey = 'AuthCode'

export function getToken() {
  let token = Cookies.get(TokenKey)

  if (token) return token

  token = Cookies.get(LoginKey)
  if (token != null) {
    var ticket = /ticket=.*/.exec(token)[0]
    return ticket.substring(7, ticket.length)
  }
}

export function getId() {
  const token = Cookies.get(LoginKey)
  if (token != null) {
    var ticket = /id=.*&/.exec(token)[0]
    return ticket.substring(3, ticket.length - 1)
  }
}

export function setToken(token, id) {
  const cookie = `id=${id}&ticket=${token}`

  Cookies.set(LoginKey, cookie)

  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAuthCode(authCode) {
  const cookie = `authCode=${authCode}`

  return Cookies.set(AuthCodeKey, cookie)
}

export function getAuthCode() {
  let code = Cookies.get(AuthCodeKey)
  if (code != null) {
    return code.substring(9, code.length)
  }
}