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
      const {title, description, promo, image} = payload
      try {
        const ad = new Ad(title, description, getters.user.id, '', promo)
        const dbResponse = await firebase.database().ref('ads').push(ad)

        const imageFormat = image.name.slice(image.name.lastIndexOf('.'))

        const fileResponse = await firebase.storage().ref(`ads/${dbResponse.key}.${imageFormat}`).put(image)
        const imageSrc = await fileResponse.ref.getDownloadURL()
          .then(downloadURL => (downloadURL))

        await firebase.database().ref('ads').child(dbResponse.key).update({
          imageSrc
        }) 
        
        commit('createAd', {
          ...ad, 
          id: dbResponse.key,
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