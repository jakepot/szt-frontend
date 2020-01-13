<template>
  <div>
    <v-container>
      <h1>
        Reviews
        <v-btn v-if="loggedIn" text to="/reviews/add">Add</v-btn>
      </h1>
      <v-col>
        <v-row class="pb-4" v-for="review in reviews" :key="review.id">
          <v-card>
            <v-card-title>{{ review.Title }}</v-card-title>
            <v-card-subtitle class="date">
              {{ review.created_at | formatDate }}
            </v-card-subtitle>
            <v-card-text class="summary">{{ review.text }}</v-card-text>
            <v-card-actions>
              <span v-if="loggedIn">
                <v-btn text>Edit</v-btn>
                <v-btn text>Remove</v-btn>
              </span>
              <v-spacer></v-spacer>
              <v-btn :href="reviewLink(review)" text>Read more</v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-col>
      <div class="text-center">
        <v-pagination v-model="page" :length="pages"></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    reviews: [],
    page: 0,
    pageSize: 5
  }),
  methods: {
    reviewLink(review) {
      return "review/" + review.id;
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    pages() {
      return Math.ceil(this.reviews.length / this.pageSize);
    }
  },
  mounted() {
    this.$http
      .get("http://localhost:1337/reviews")
      .then(response => (this.reviews = response.data));
  }
};
</script>

<style scoped>
.date {
  color: grey;
}

.summary {
  white-space: pre-wrap;
  text-align: justify;
}
</style>
