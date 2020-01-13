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
            Add
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset">
            Reset Form
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
    token: null,
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
          .post("http://localhost:1337/songs", {
            title: this.title,
            cover_url: this.coverUrl,
            artist: this.artist,
            genre: this.genre
          })
          .then(response => console.log(response));
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },
  mounted() {
    // this.$http
    //   .post("http://localhost:1337/auth/local", {
    //     identifier: "test@user.pl",
    //     password: "testuser"
    //   })
    //   .then(response => {
    //     // Handle success.
    //     console.log("Well done!");
    //     console.log("User profile", response.data.user);
    //     console.log("User token", response.data.jwt);
    //     this.token = response.data.jwt;
    //   })
    //   .catch(error => {
    //     // Handle error.
    //     console.log("An error occurred:", error);
    //   });
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
