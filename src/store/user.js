import firebase from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    autoLoginUser ({commit}, payload) {
      commit('setUser', new User(payload.uid))
    },
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const registerResponse = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setLoading', false)
        commit('setUser', new User(registerResponse.uid))
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async loginUser ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const {email, password} = payload
      try {
        const loginResponse = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setLoading', false)
        commit('setUser', new User(loginResponse.user.uid))
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLogin (state) {
      return state.user != null
    }
  }
}