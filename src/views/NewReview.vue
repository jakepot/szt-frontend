<template>
  <div>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container>
        <v-row>
          <v-col cols="8">
            <v-text-field
              v-model="title"
              :rules="[v => !!v || 'Title is required']"
              label="Title"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="rating"
              :items="ratings"
              :rules="[v => !!v || 'Rating is required']"
              label="Rating"
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-autocomplete
              v-model="song"
              :items="songs"
              :item-text="item => selectionText(item)"
              item-value="id"
              :rules="[v => !!v || 'Song is required']"
              label="Song"
              required
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              v-model="content"
              label="Content"
              :rules="[v => !!v || 'Are you speechless?']"
              required
              filled
              rows="15"
            ></v-textarea>

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
  </div>
</template>

<script>
export default {
  data: () => ({
    title: "",
    content: "",
    text: "",
    valid: true,
    song: {},
    songs: [],
    rating: null,
    ratings: [...Array(11).keys()]
  }),
  mounted() {
    this.$http
      .get("http://localhost:1337/songs")
      .then(
        response =>
          (this.songs = response.data.filter(song => song.review === null))
      );
  },
  methods: {
    selectionText(item) {
      return `${item.title} - ${item.artist.name}`;
    },
    validate() {
      if (this.$refs.form.validate()) {
        console.log(this.song);
        this.$http
          .post("http://localhost:1337/reviews", {
            Title: this.title,
            song: this.song,
            rating: this.rating,
            text: this.content
          })
          .then(
            response => (window.location.href = "/review/" + response.data.id)
          );
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped></style>
