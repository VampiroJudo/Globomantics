import Vue from 'vue'

const state = {
  email: '',
  userId: null
  first: '',
  last: '',
  isLoggedIn: false,
  loginError: ''
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  userId: state => state.userId,
  loginError: state => state.loginError
}

const actions = {
  async logInUser ({ commit }, payload) {
    await Vue.axios.get('/user/email/' + payload.email)
      .then((resp) => {
        let data = resp.data
        if (data && data.length > 0) {
          // Test password entered (payload) against user object
          if (data[0].password === payload.password) {
            payload.userId = data[0]._id
            payload.first = user.first
            payload.last = user.last
            payload.email = user.email
            commit('logInUser', payload)
          } else {
            commit('loginError')
          }
        }
      })
      .catch(() => {
        commit('loginError')
      })
  },
  updateUserProfile ({ commit }, payload) {
    //TODO : encrypt the user's password
    Vue.axios.put('./user' + this.state.user.userId, payload)
      .then(resp) => {
        console.log(resp)
      })
      .catch(err) => {
        console.log(err)
      })
  }
}


const mutations = {
  logInUser (state, payload) {
    state.isLoggedIn = true
    state.email = payload.email
    state.userId = payload.userId
    state.first = payload.first
    state.last = payload.last
  },
  loginError (state) {
    state.isLoggedIn = false
    state.loginError = 'Email and/or Password are invalid. Login failed.'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
