<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn flat class="info" slot="activator">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class='text--primary'>Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field  
                name="title" 
                label="Title"
                type="text"
                v-model="title"
              ></v-text-field>
              <v-textarea  
                name="description" 
                label="Description"
                type="text"
                v-model="description"
                multi-line
              ></v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel">Cancel</v-btn>
              <v-btn flat class="success" @click="onSave" :loading="loading">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout> 
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {
      modal: false,
      title: this.ad.title,
      description: this.ad.description
    }
  },
  methods: {
    onCancel () {
      this.title = this.ad.title
      this.description = this.ad.description
      this.modal = false
    },
    onSave () {
      if (this.title !== '' && this.description !== '') {
        this.$store.dispatch('updateAd', {
          title: this.title,
          description: this.description,
          id: this.ad.id
        })
        this.modal = false
      }
    }
  }
}
</script>

