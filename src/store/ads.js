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
    ads: [
      { 
        title: 'First', 
        description: 'First description', 
        promo: false, 
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', 
        id: 1 
      },
      { 
        title: 'Second', 
        description: 'Second description', 
        promo: false, 
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', 
        id: 2 
      },
      { 
        title: 'Third', 
        description: 'Third description', 
        promo: true, 
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', 
        id: 3 
      },
      { 
        title: 'Fourth', 
        description: 'Fourth description', 
        promo: true, 
        imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', 
        id: 4
      }
    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const {title, description, promo, imageSrc} = payload
      
      try {
        const ad = new Ad(title, description, getters.user.id, imageSrc, promo)
        const dbResponse = await firebase.database().ref('ads').push(ad)
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