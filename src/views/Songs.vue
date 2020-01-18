<template>
  <div class="songs">
    <v-container>
      <h1>
        Songs
        <v-btn v-if="loggedIn" text to="/songs/new">Add</v-btn>
      </h1>
      <v-row>
        <v-col v-for="song in songs" :key="song.id" class="col-lg-4 col-sm-6">
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
              <v-btn v-if="song.review" :href="'/review/' + song.review.id" text
                >Go to review</v-btn
              >
              <v-btn v-if="!song.review" text disabled>Not yet reviewed</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="loggedIn" text :to="'/songs/' + song.id + '/edit'"
                >Edit</v-btn
              >
              <v-btn v-if="loggedIn" text @click="remove(song.id)"
                >Remove</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="deleteDialog" max-width="300px">
      <v-card>
        <v-card-title>
          The review will also be deleted. Are you sure?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="deleteDialog = false">No</v-btn>
          <v-btn text @click="confirmDelete()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style></style>

<script>
export default {
  name: "songs",
  data: () => ({
    url: "http://localhost:1337/songs",
    songs: [],
    deleteDialog: false,
    reviewId: null,
    deleteId: null
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted() {
    this.fetchSongs();
  },
  methods: {
    fetchSongs() {
      this.$http.get(this.url).then(response => (this.songs = response.data));
    },
    remove(id) {
      if (!this.deleteDialog) {
        this.deleteId = id;
        this.reviewId = this.songs.find(song => song.id === id).review.id;
        this.deleteDialog = true;
      }
    },
    confirmDelete() {
      this.deleteDialog = false;
      this.$http.delete("http://localhost:1337/reviews/" + this.reviewId);
      this.$http.delete(`${this.url}/${this.deleteId}`).then(() => {
        // this.snackText = "Song deleted";
        // this.snackbar = true;
        this.fetchSongs();
      });
    }
  }
};
</script>
