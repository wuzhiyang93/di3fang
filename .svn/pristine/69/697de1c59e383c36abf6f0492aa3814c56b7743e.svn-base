import {login, getInfo} from '@/api/user'
import {setToken, removeToken} from '@/utils/token'
import {Message} from 'element-ui'

const user = {
  state: {
    name: '',
  },
  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    },
  },
  actions: {
    /**
     * 用户登录
     */
    login({commit}, userInfo) {
      const {username, password} = userInfo
      return new Promise((resolve, reject) => {
        login({username: username.trim(), password: password}).then(response => {
          // 登录成功
          if (response.code == 1) {
            setToken(response.token);
            resolve();
          } else {
            // 登录失败
            Message({
              message: response.message,
              type: 'error',
              duration: 3000
            })
            reject();
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获得用户信息
    getInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          commit('SET_NAME', response.username);
          resolve(response);
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 用户登出
    logout({commit, state}) {
      return new Promise((resolve) => {
        removeToken()
        resolve()
      })
    },
  }
}


export default user
