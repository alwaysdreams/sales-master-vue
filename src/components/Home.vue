<template>
  <div>
    <v-container fluid>
      <v-carousel>
        <v-carousel-item
          v-for="ad in ads"
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
</template>

<script>
  export default {
    data () {
      return {
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
            promo: false, 
            imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', 
            id: 3 
          },
          { 
            title: 'Fourth', 
            description: 'Fourth description', 
            promo: false, 
            imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', 
            id: 4
          }
        ]
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

