<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-carousel>
        <v-carousel-item
          v-for="ad in promoAds"
          :key="ad.id"
          :src="ad.imageSrc"
        >
          <div class="car-link">
            <v-btn color="indigo" :to="'/ad/' + ad.id">{{ ad.title }}</v-btn>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex 
          xs12
          sm6
          md4
          v-for="ad in ads"
          :key="ad.id"
        >
          <v-card>
            <v-img
              :src="ad.imageSrc"
              height="200px"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">{{ ad.title }}</h3>
                <div> {{ ad.description }} </div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn raised :to="'/ad/' + ad.id" color="cyan" dark>OPEN</v-btn>
              <v-spacer></v-spacer>
              <v-btn raised dark color="indigo">BUY IT</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs12 class="text-xs-center pt-4">
          <v-progress-circular
            :size="100"
            :width="5"
            color="indigo"
            indeterminate
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    computed: {
      promoAds () {
        return this.$store.getters.promoAds
      },
      ads () {
        return this.$store.getters.ads
      }, 
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>

<style scoped>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background: rgba(0,0,0,.5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
</style>

