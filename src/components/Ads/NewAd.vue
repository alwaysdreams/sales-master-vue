<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary">Create new ad</h1>
        <v-form
          v-model="valid"
          ref="form"
          class="mb-3"
        >
          <v-text-field  
            name="title" 
            label="Ad title" 
            type="text"
            v-model="title"
            :rules="[v => !!v || 'Title is required']"
          ></v-text-field>
          <v-textarea  
            name="description" 
            label="Ad description" 
            type="text"
            v-model="description"
            multi-line
            :rules="[v => !!v || 'Description is required']"
          ></v-textarea>
        </v-form>

        <v-layout row>
          <v-flex xs12>
            <v-btn color="cyan" dark @click="triggerUpload">
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input 
              ref="fileInput" 
              type="file" 
              style="display: none;" 
              accept="image/*"
              @change="onFileChange"
            >
          </v-flex>
        </v-layout>

        <v-layout row class="mt-2">
          <v-flex xs12>
            <img v-if="imageSrc" :src="imageSrc" height="150">
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <v-switch
              color="indigo"
              v-model="promo"
              label="Add to promo ?"
            ></v-switch>
          </v-flex>
        </v-layout>
        
        <v-layout row>
          <v-flex xs12>
            <v-spacer></v-spacer>
            <v-btn
              :disabled="!valid || !this.image"
              color="indigo darken-3"
              dark
              @click="createAd"
              :loading="loading"
            >Create</v-btn>
          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: false,
      title: '',
      description: '',
      promo: false,
      image: null,
      imageSrc: ''
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    onFileChange (event) {
      const file = event.target.files[0]
      const reader = new FileReader()

      reader.onload = () => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    createAd () {
      if (!this.$refs.form.validate() && this.image) {
        return
      }
      const adData = {
        title: this.title, 
        description: this.description,
        promo: this.promo,
        image: this.image
      }
      
      this.$store.dispatch('createAd', adData)
        .then(() => {
          this.$router.push('/list')
        })
        .catch((error) => {throw error})
    }
  }
}
</script>
