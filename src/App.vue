<template>
  <v-app>
    <v-navigation-drawer 
      app 
      temporary
      v-model="drawer"
    >
      <v-list>
        <v-list-tile
          v-for="link in links"
          :key="link.item"
          :to="link.url"
        >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile 
          @click="logout"
          v-show="isUserLogin"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="'Logout'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app dark color="indigo darken-3">
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to='/' tag="span" class="pointer">
          Sales MASTER
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
          flat
          v-for="link in links"
          :key="link.title"
          :to="link.url"
        >
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
        <v-btn 
          flat
          @click="logout"
          v-show="isUserLogin"
        >
          <v-icon left>exit_to_app</v-icon>
          logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar 
        multi-line
        color="error"
        :timout="3000"
        :value="true"
      >
        {{ error }}
        <v-btn
          flat
          @click="closeError"
          @input="closeError"
        >Close</v-btn>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLogin () {
      return this.$store.getters.isUserLogin
    },
    links () {
      return this.isUserLogin ? [
        { title: 'New ad', icon: 'note_add', url: '/new' },
        { title: 'Orders', icon: 'bookmark_border', url: '/orders' },
        { title: 'My ad', icon: 'list', url: '/list' }
      ] : [
        { title: 'Login', icon: 'lock', url: '/login' },
        { title: 'Registration', icon: 'face', url: '/registration' }
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>

