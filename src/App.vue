<template>
  <v-app>
    <v-navigation-drawer app>
      <v-list dense>
        <v-list-item link to="/review/1">
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
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        SZIT Projekt
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <div class="content-contaier">
        <router-view></router-view>
      </div>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  title: "App",

  components: {},

  data: () => ({
    //
  })
});
</script>

<style>
.content-contaier {
  padding: 12px;
}
</style>
