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
            <v-btn color="cyan" dark>
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row>
          <v-flex xs12>
            <img src="" height="150">
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
              :disabled="!valid"
              color="indigo darken-3"
              dark
              @click="createAd"
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
      promo: false
    }
  },
  methods: {
    createAd () {
      if (!this.$refs.form.validate()) {
        return
      }
      const adData = {
        title: this.title, 
        description: this.description,
        promo: this.promo,
        imageSrc: "https://previews.123rf.com/images/carmendorin/carmendorin1310/carmendorin131000058/22749158-grunge-rubber-stamp-with-text-new-item-vector-illustration.jpg"
      }

      this.$store.dispatch('createAd', adData)
      this.$router.push('/')
    }
  }
}
</script>
