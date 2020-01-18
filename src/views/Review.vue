<template>
  <div>
    <v-container>
      <v-col>
        <h1 class="page-title">{{ rev.Title }}</h1>
        <div class="subtitle-2 mb-4">Posted on {{ rev.created_at | formatDate }}</div>
        <v-card outlined class="mb-4">
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

            <v-list-item-avatar tile size="120" color="grey">
              <img :src="song.cover_url" />
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
        <div class="review-text">{{ rev.text }}</div>
        <div class="mt-4 rating">My rating: {{ rev.rating }}</div>

        <div class="text-center comments">
          <div
            class="fb-comments"
            :data-href="fbHref"
            data-width="600"
            data-numposts="5"
          ></div>
        </div>
      </v-col>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Review",
  data: () => ({
    song: {},
    rev: {}
  }),
  computed: {
    fbHref() {
      return "http://my-awesome-music-review-page.com" + this.$route.path;
    }
  },
  mounted() {
    this.$http
      .get("http://localhost:1337/reviews/" + this.$route.params.id)
      .then(response => {
        this.rev = response.data;
        this.$http
          .get("http://localhost:1337/songs/" + this.rev.song.id)
          .then(response => (this.song = response.data));
      });
  }
};
</script>

<style>
.page-title {
  font-size: 3rem;
  font-weight: 300;
}
.review-text {
  white-space: pre-wrap;
}
.rating {
  font-size: 30px;
}
.comments {
  margin-top: 4em;
}
</style>
