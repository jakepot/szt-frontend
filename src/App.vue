<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list dense>
        <v-list-item link to="/reviews">
          <v-list-item-action>
            <v-icon>mdi-star-half</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Reviews</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/songs">
          <v-list-item-action>
            <v-icon>mdi-music-note</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Songs</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/artists">
          <v-list-item-action>
            <v-icon>mdi-artist</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Artists</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/genres">
          <v-list-item-action>
            <v-icon>mdi-library-music</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Genres</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link to="/gallery">
          <v-list-item-action>
            <v-icon>mdi-image-multiple</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Gallery</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-list dense>
          <v-list-item @click="login()">
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="logout()">
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        SZIT Projekt
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">buy my mixtape</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <div class="content-container">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    drawer: null
  }),

  methods: {
    login() {
      this.$store.dispatch("login", {
        identifier: "test@user.pl",
        password: "testuser"
      });
    },
    logout() {
      this.$store.dispatch("logout");
    }
  }
});
</script>

<style>
.content-container {
  padding: 12px;
}
</style>
