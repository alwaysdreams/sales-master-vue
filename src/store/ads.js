import firebase from 'firebase'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    },
    loadAds (state, payload) {
      state.ads = payload
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const {title, description, promo, imageSrc} = payload
      console.warn(`START CREATING NEW AD >>>>>`, payload)
      try {
        const ad = new Ad(title, description, getters.user.id, imageSrc, promo)
        console.warn(`NEW AD >>>>> ${ad}`)
        const dbResponse = await firebase.database().ref('ads').push(ad)
        console.warn(`DB RESULT CREATING NEW AD >>>>>`, dbResponse)
        commit('createAd', {
          ...ad, 
          id: dbResponse.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const dbResponse = await firebase.database().ref('ads').once('value')
        const dbCollection = dbResponse.val()
        let ads = []

        Object.keys(dbCollection).forEach(key => {
          const item = dbCollection[key]
          const {title, description, ownerId, imageSrc, promo} = item
          ads.push(new Ad(title, description, ownerId, imageSrc, promo, key))
        })

        commit('loadAds', ads)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return (adId) => {
        return state.ads.find(ad => ad.id == adId)
      }
    }
  }
}