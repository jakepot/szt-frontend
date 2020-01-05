<template>
  <div class="songs">
    <h1>Reviewed songs <v-btn text to="/songs/new">Add</v-btn></h1>
    <!--    <div class="card-container">-->
    <v-container>
      <v-row>
        <v-col v-for="rst in restaurants" :key="rst.id" cols="4">
          <!--          <v-card class="mx-auto" max-width="344" outlined>-->
          <v-card outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">SONG</div>
                <v-list-item-title class="headline mb-1">
                  {{ rst.title }}
                </v-list-item-title>
                <v-list-item-subtitle>{{
                  rst.artist.name
                }}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-avatar tile size="80" color="grey">
                <img :src="rst.cover_url" />
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
    <!--    </div>-->
  </div>
</template>

<style>
.card-container {
  display: flex;
}
</style>

<script>
import axios from "axios";

export default {
  name: "songs",
  data: () => ({
    restaurants: []
  }),
  mounted() {
    axios
      .get("http://localhost:1337/songs")
      .then(response => (this.restaurants = response.data));
  }
};
</script>
