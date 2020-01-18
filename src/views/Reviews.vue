<template>
  <div>
    <v-container>
      <h1>
        Reviews
        <v-btn v-if="loggedIn" text to="/reviews/new">Add</v-btn>
      </h1>
      <v-col>
        <v-row class="pb-4" v-for="review in displayedReviews" :key="review.id">
          <v-card>
            <v-card-title>{{ review.Title }}</v-card-title>
            <v-card-subtitle class="date">
              {{ review.created_at | formatDate }}
            </v-card-subtitle>
            <v-card-text class="summary">{{ review.text }}</v-card-text>
            <v-card-actions>
              <span v-if="loggedIn">
                <v-btn :to="'/reviews/' + review.id + '/edit'" text>Edit</v-btn>
                <v-btn @click="remove(review.id)" text>Remove</v-btn>
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
    page: 1,
    pageSize: 5
  }),
  methods: {
    fetchReviews() {
      this.$http.get("http://localhost:1337/reviews").then(response => {
        this.reviews = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
      });
    },
    reviewLink(review) {
      return "review/" + review.id;
    },
    remove(id) {
      this.$http
        .delete("http://localhost:1337/reviews/" + id)
        .then(response => this.fetchReviews());
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    pages() {
      return Math.ceil(this.reviews.length / this.pageSize);
    },
    displayedReviews() {
      return this.reviews.slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
    }
  },
  mounted() {
    this.fetchReviews();
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
