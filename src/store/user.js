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
      const {uid} = payload
      commit('setUser', new User(uid))
    },
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setLoading', false)
        commit('setUser', new User(user.uid))
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
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setLoading', false)
        commit('setUser', new User(user.uid))
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