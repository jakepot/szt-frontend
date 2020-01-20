<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <h1>
            Artists
            <v-dialog v-model="dialog" max-width="400px">
              <template v-slot:activator="{ on }">
                <v-btn v-if="loggedIn" text v-on="on">Add</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">New Artist</span>
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
                      <v-col cols="12">
                        <v-menu
                          v-model="menu"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="date"
                              label="Birthday"
                              prepend-inner-icon="mdi-calendar"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="menu = false"
                            no-title
                          ></v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="dialog = false"
                    >Close</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="create()"
                    >Create</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <div
          v-for="artist in artists"
          :key="artist.id"
          class="mx-auto col-12 col-md-6"
        >
          <v-card class="px-2" outlined>
            <v-layout row justify-space-between>
              <div>
                <v-card-title @click="goToSongs(artist.id)">
                  <span class="clickable">
                    {{ artist.name }}
                  </span></v-card-title
                >
                <v-card-subtitle>
                  BORN:
                  {{
                    new Date(artist.date_of_birth).toISOString().slice(0, 10)
                  }}
                  <br />
                  Songs: {{ artist.songs.length }}
                </v-card-subtitle>
              </div>
              <v-card-actions v-if="loggedIn">
                <v-btn text @click="edit(artist.id)">EDIT</v-btn>
                <v-btn text @click="remove(artist.id)">DELETE</v-btn>
              </v-card-actions>
            </v-layout>
          </v-card>
        </div>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar" :timeout="2500">{{ snackText }}</v-snackbar>
    <v-dialog v-model="deleteDialog" max-width="300px">
      <v-card>
        <v-card-title>
          Are you sure?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click.stop="deleteDialog = false">No</v-btn>
          <v-btn text @click="confirmDelete()">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "artists",

  data: () => ({
    url: "http://localhost:1337/artists",
    artists: [],
    snackbar: false,
    snackText: "New artist added",
    dialog: false,
    deleteDialog: false,
    deleteId: null,
    name: null,
    date: null,
    menu: false,
    filterText: "",
    filteredArtists: []
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  mounted() {
    this.fetchArtists();
  },
  methods: {
    fetchArtists() {
      this.$http.get(this.url).then(response => (this.artists = response.data));
    },
    create() {
      this.dialog = false;
      this.$http
        .post(this.url, {
          name: this.name,
          date: this.date
        })
        .then(() => {
          console.log("Created");
          this.fetchArtists();
          this.snackbar = true;
        });
    },
    remove(id) {
      if (!this.deleteDialog) {
        this.deleteId = id;
        this.deleteDialog = true;
      }
    },
    confirmDelete() {
      this.deleteDialog = false;
      this.$http.delete(`${this.url}/${this.deleteId}`).then(() => {
        this.snackText = "Artist deleted";
        this.snackbar = true;
        this.fetchArtists();
      });
    },
    goToSongs(id) {
      this.$router.push({ name: "songs", params: { artist: id } });
    }
  }
};
</script>

<style scoped>
.clickable {
  cursor: pointer;
}
</style>
