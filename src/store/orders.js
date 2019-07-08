import firebase from 'firebase'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone 
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    fetchOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async markOrderDone ({commit, getters}, payload) {
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders`).child(payload).update({
          done: true
        })
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async createOrder ({commit}, { name, phone, adId, ownerId }) {
      commit('clearError')
      const order = new Order(name, phone, adId)
      
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrders ({commit, getters}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const dbResponse = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const dbCollection = dbResponse.val()
        let orders = []

        if (dbCollection) {
          Object.keys(dbCollection).forEach(key => {
            const item = dbCollection[key]
            const {name, phone, adId, done} = item
            orders.push(new Order(name, phone, adId, done, key))
          })
  
          commit('fetchOrders', orders)
        }

        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(o => o.done)
    },
    undoneOrders (state) {
      return state.orders.filter(o => !o.done)
    },
    orders (state, getters) {
      return [...getters.undoneOrders, ...getters.doneOrders]
    }
  }
}