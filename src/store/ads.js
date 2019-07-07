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
    fetchAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, payload) {
      const ad = this.getters.adById(payload.id)
      if (ad) {
        ad.title = payload.title
        ad.description = payload.description
      }
    }
  },
  actions: {
    updateAd ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        firebase.database().ref('ads').child(id).update({
            title, description
          })
          .then(() => {
            commit('updateAd', {title, description, id})
            commit('setLoading', false)
          })
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)
      const {title, description, promo, image} = payload
      try {
        const ad = new Ad(title, description, getters.user.id, '', promo)
        const creatingResponse = await firebase.database().ref('ads').push(ad)

        const imageFormat = image.name.slice(image.name.lastIndexOf('.'))

        const imageResponse = await firebase.storage().ref(`ads/${creatingResponse.key}.${imageFormat}`).put(image)
        const imageSrc = await imageResponse.ref.getDownloadURL()
          .then(downloadURL => (downloadURL))

        await firebase.database().ref('ads').child(creatingResponse.key).update({
          imageSrc
        }) 
        
        commit('createAd', {
          ...ad, 
          id: creatingResponse.key,
          imageSrc
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

        commit('fetchAds', ads)
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
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.id
      })
    },
    adById (state) {
      return (adId) => {
        return state.ads.find(ad => ad.id == adId)
      }
    }
  }
}