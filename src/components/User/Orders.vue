<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list two-line subheader>
          <v-list-tile
            avatar
            v-for="order in orders"
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
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          id: 'ord-1',
          name: 'Monster',
          phone: '999-999-999',
          adId: '2',
          done: false
        },
        {
          id: 'ord-2',
          name: 'Not monster',
          phone: '333-333',
          adId: '4',
          done: false
        }
      ]
    }
  },
  methods: {
    markDone (order) {
      order.done = true
    }
  }
}
</script>
