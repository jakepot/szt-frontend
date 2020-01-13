<template>
  <div>
    <v-container>
      <h1>Genres<v-btn v-if="loggedIn" text to="/artists/new">Add</v-btn></h1>
      <v-col>
        <div v-for="genre in genres" :key="genre.id">
          {{ genre.name }}
        </div>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "genres",

  data: () => ({
    genres: []
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted() {
    this.$http
      .get("http://localhost:1337/genres")
      .then(response => (this.genres = response.data));
  }
};
</script>

<style scoped></style>
