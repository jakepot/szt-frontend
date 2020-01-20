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
          <v-list-item v-if="!loggedIn" @click="openLogin()">
            <v-list-item-content>
              <v-list-item-title>Log in</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-if="loggedIn" @click="logout()">
            <v-list-item-content>
              <v-list-item-title>Log out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <div class="d-flex align-center">
        My Music Catalogue
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

    <v-dialog
      v-model="loginDialog"
      max-width="500px"
      @input="v => v || clearData()"
    >
      <v-card>
        <v-card-title>
          Log In
        </v-card-title>
        <v-form @submit="login">
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    prepend-icon="mdi-account"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    prepend-icon="mdi-lock"
                  >
                  </v-text-field>
                </v-col>
                <v-col v-if="authError" cols="12">
                  <v-alert type="error">
                    Login failed
                  </v-alert>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="login">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  components: {},

  data: () => ({
    drawer: null,
    username: null,
    password: null,
    loginDialog: false,
    authError: false
  }),

  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },

  methods: {
    openLogin() {
      this.loginDialog = true;
    },
    login() {
      this.$store
        .dispatch("login", {
          // identifier: "test@user.pl",
          identifier: this.username,
          // password: "testuser"
          password: this.password
        })
        .then(
          () => {
            this.authError = false;
            this.loginDialog = false;
          },
          () => {
            this.authError = true;
          }
        );
    },
    logout() {
      this.$store.dispatch("logout");
    },
    clearData() {
      this.username = null;
      this.password = null;
    }
  }
});
</script>

<style>
.content-container {
  padding: 12px;
}
</style>
