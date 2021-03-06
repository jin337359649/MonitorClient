import { login, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getId, setAuthCode, getAuthCode } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    id: getId(),
    authCode: getAuthCode()
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_AUTHCODE: (state, authCode) => {
      state.authCode = authCode
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.Data
          setToken(data.Ticket, data.Id)
          commit('SET_TOKEN', data.Ticket)
          commit('SET_ID', data.Id)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.id).then(response => {
          const data = response.Data
          commit('SET_NAME', data.Name)
          commit('SET_ID', data.Id)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    SetAuthCode({ commit }, authCode) {
      return new Promise(resolve => {
        commit('SET_AUTHCODE', authCode);
        setAuthCode(authCode);
        resolve();
      })
    }
  }
}

export default user
