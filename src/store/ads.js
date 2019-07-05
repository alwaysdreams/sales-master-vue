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
    createAd ({commit}, payload) {
      payload.id = Math.random()
      commit('createAd', payload)
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