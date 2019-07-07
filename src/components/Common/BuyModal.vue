<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn raised dark color="indigo" slot="activator">BUY IT</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class='text--primary'>Create order</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field  
                name="name" 
                label="Name"
                type="text"
                v-model="name"
              ></v-text-field>
              <v-text-field  
                name="phone" 
                label="Phone number"
                type="text"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                flat 
                @click="onCancel"
                :disabled="localLoading"
              >Cancel</v-btn>
              <v-btn 
                flat 
                class="success" 
                @click="onSave" 
                :loading="localLoading"
                :disabled="localLoading"
              >Save</v-btn>
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
      name: '',
      phone: '',
      localLoading: false
    }
  },
  methods: {
    onCancel () {
      this.name = ''
      this.phone = ''
      this.modal = false
    },
    onSave () {
      if (this.name !== '' && this.phone !== '') {
        this.localLoading = true
        this.$store.dispatch('createOrder', {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          ownerId: this.ad.ownerId
        })
        .finally(() => {
          this.localLoading = false
          this.onCancel()
        })
      }
    }
  }
}
</script>

