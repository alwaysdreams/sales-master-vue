<template>
  <v-container>
    <v-layout row v-if="!loading">
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list two-line subheader>
          <v-list-tile
            avatar
            v-for="order in myOrders"
            :key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox 
                v-model="order.done"
                @change="markDone(order)"
                :disabled="order.done"
                color="cyan"
              ></v-checkbox>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn dark color="indigo darken-3" :to="'/ad/' + order.adId">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          :size="100"
          :width="5"
          color="indigo"
          indeterminate
        ></v-progress-circular>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    myOrders () {
      return this.$store.getters.myOrders
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    }
  }
}
</script>
