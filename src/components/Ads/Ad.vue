<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            :src="ad.imageSrc"
            height="500px"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ ad.title }}</h1>
            <p>{{ ad.description }}</p>
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
  props: ['id'],
  computed: {
    ad () {
      return this.$store.getters.adById(this.id)
    }
  }
}
</script>
