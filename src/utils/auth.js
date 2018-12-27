import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {

  let token = Cookies.get(TokenKey)

  if(token) return token;

  token = Cookies.get('Login')
  if (token != null) {
    var ticket = /ticket=.*/.exec(token)[0];
    return ticket.substring(7, ticket.length);
  }
}

export function getId() {
  let token =  Cookies.get('Login')
  if (token != null) {
    var ticket = /id=.*&/.exec(token)[0];
    return ticket.substring(3, ticket.length-1);
  }
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


