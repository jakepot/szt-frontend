<template>
  <div>
    <h1>Genres<v-btn text to="/artists/new">Add</v-btn></h1>
    <div v-for="genre in genres" :key="genre.id">
      {{ genre.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "genres",

  data: () => ({
    genres: []
  }),

  mounted() {
    this.$http
      .get("http://localhost:1337/genres")
      .then(response => (this.genres = response.data));
  }
};
</script>

<style scoped></style>
