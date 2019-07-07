import firebase from 'firebase'

class Order {
  constructor (name, phone, adId, ownerId) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.ownerId = ownerId
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    createOrder (state, payload) {
      state.orders.push(payload)
    },
    fetchOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({commit}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const { name, phone, adId, ownerId } = payload
      try {
        const order = new Order(name, phone, adId, ownerId)
        await firebase.database().ref('orders').push(order)

        commit('createOrder', order)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const dbResponse = await firebase.database().ref('orders').once('value')
        const dbCollection = dbResponse.val()
        let orders = []

        Object.keys(dbCollection).forEach(key => {
          const item = dbCollection[key]
          const {name, phone, adId, ownerId} = item
          orders.push(new Order(name, phone, adId, ownerId))
        })

        commit('fetchOrders', orders)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    myOrders (state) {
      return state.orders
    }
  }
}