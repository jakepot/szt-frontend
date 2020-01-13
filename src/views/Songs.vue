<template>
  <div class="songs">
    <v-container>
      <h1>
        Songs
        <v-btn v-if="loggedIn" text to="/songs/new">Add</v-btn>
      </h1>
      <v-row>
        <v-col v-for="song in songs" :key="song.id" cols="4">
          <v-card outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">SONG</div>
                <v-list-item-title class="headline mb-1">
                  {{ song.title }}
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ song.artist.name }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80" color="grey">
                <img :src="song.cover_url" />
              </v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn text>Like</v-btn>
              <v-btn text>Hate</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>

<script>
export default {
  name: "songs",
  data: () => ({
    songs: []
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted() {
    this.$http
      .get("http://localhost:1337/songs")
      .then(response => (this.songs = response.data));
  }
};
</script>
