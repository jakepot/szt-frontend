<template>
  <div>
    <v-container>
      <h1>
        Genres
        <v-dialog v-model="dialog" max-width="400px">
          <template v-slot:activator="{ on }">
            <v-btn v-if="loggedIn" text v-on="on">Add</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">New Genre</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="name"
                      label="Name*"
                      required
                      prepend-inner-icon="mdi-account"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="create()">Create</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </h1>
      <v-row>
        <div
          v-for="genre in genres"
          :key="genre.id"
          class="mx-auto col-6 col-md-4"
        >
          <v-card outlined class="px-2">
            <v-layout row justify-space-between>
              <div>
                <v-card-title @click="goToSongs(genre.id)">
                  <span class="clickable">{{ genre.name }}</span>
                </v-card-title>
                <v-card-subtitle> {{ genre.songs }} songs </v-card-subtitle>
              </div>
              <v-card-actions v-if="loggedIn">
                <v-btn text @click="edit(genre.id, genre.name)">EDIT</v-btn>
                <v-btn text @click="remove(genre.id)">DELETE</v-btn>
              </v-card-actions>
            </v-layout>
          </v-card>
        </div>
      </v-row>
    </v-container>
    <v-dialog v-model="editDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Genre</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editName"
                  label="Name*"
                  required
                  prepend-inner-icon="mdi-account"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="confirmEdit()"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "genres",
  data: () => ({
    url: "http://localhost:1337/genres",
    genres: [],
    editDialog: false,
    dialog: false,
    name: "",
    editName: ""
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted() {
    this.fetchGenres();
  },
  methods: {
    fetchGenres() {
      this.$http
        .get(this.url)
        .then(
          response =>
            (this.genres = response.data.sort((a, b) => b.songs - a.songs))
        );
    },
    goToSongs(id) {
      this.$router.push({ name: "songs", params: { genre: id } });
    },
    create() {
      if (this.name) {
        this.$http.post(this.url, { name: this.name }).then(() => {
          this.dialog = false;
          this.fetchGenres();
        });
      }
    },
    edit(id, name) {
      this.editName = name;
      this.editId = id;
      this.editDialog = true;
    },
    confirmEdit() {
      this.$http
        .put(this.url + "/" + this.editId, { name: this.editName })
        .then(() => {
          this.editDialog = false;
          this.fetchGenres();
        });
    },
    remove(id) {
      this.$http.delete(this.url + "/" + id).then(() => this.fetchGenres());
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
