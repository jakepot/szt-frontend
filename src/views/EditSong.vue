<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="auto">
          <v-img
            :src="coverUrl"
            aspect-ratio="1"
            class="grey lighten-2"
            width="300"
            height="300"
          ></v-img>
        </v-col>
        <v-col>
          <v-text-field
            v-model="title"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="coverUrl"
            label="Cover URL"
            required
          ></v-text-field>

          <v-autocomplete
            v-model="artist"
            :items="artists"
            item-text="name"
            item-value="id"
            :rules="[v => !!v || 'Artist is required']"
            label="Artist"
            required
          ></v-autocomplete>

          <v-autocomplete
            v-model="genre"
            :items="genres"
            item-text="name"
            item-value="id"
            :rules="[v => !!v || 'Genre is required']"
            label="Genre"
            required
          ></v-autocomplete>

          <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
          >
            Update
          </v-btn>

          <v-btn color="error" class="mr-4" to="/songs">
            Return
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "NewSong",
  data: () => ({
    id: "",
    valid: true,
    title: "",
    coverUrl: "",
    artists: [],
    genres: [],
    nameRules: [v => !!v || "Name is required"],
    artist: null,
    genre: null
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$http
          .put("http://localhost:1337/songs/" + this.id, {
            title: this.title,
            cover_url: this.coverUrl,
            artist: this.artist,
            genre: this.genre
          })
          .then(() => this.$router.push("/songs"));
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    this.$http.get("http://localhost:1337/songs/" + this.id).then(response => {
      const data = response.data;
      this.title = data.title;
      this.coverUrl = data.cover_url;
      this.artist = data.artist;
      this.genre = data.genre;
    });
    this.$http
      .get("http://localhost:1337/artists")
      .then(response => (this.artists = response.data));
    this.$http
      .get("http://localhost:1337/genres")
      .then(response => (this.genres = response.data));
  }
};
</script>

<style scoped></style>
