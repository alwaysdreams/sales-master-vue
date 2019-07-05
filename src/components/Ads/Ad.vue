<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
            height="400px"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">Lorem</h1>
            <p>Descirption is will be here, when u will write description to this ad</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn flat class="info">Edit</v-btn>
            <v-btn color="indigo darken-3" dark>Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {} 
  }
}
</script>
