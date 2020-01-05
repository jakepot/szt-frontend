<template>
  <div>
    <h1 class="page-title">{{ rev.Title }}</h1>
    <div>{{rev.text}}</div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Review",
  data: () => ({
    song: {},
    rev: {}
  }),
  mounted() {
    axios
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
</style>
