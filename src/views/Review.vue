<template>
  <div>
    <v-container>
      <v-col>
        <h1 class="page-title">{{ rev.Title }}</h1>
        <div class="review-text">{{ rev.text }}</div>

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
      .then(response => (this.rev = response.data));
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
.comments {
  margin-top: 4em;
}
</style>
