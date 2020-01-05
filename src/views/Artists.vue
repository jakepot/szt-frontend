<template>
  <div>
    <h1>
      Artists
      <v-dialog v-model="dialog" max-width="400px">
        <template v-slot:activator="{ on }">
          <v-btn text color="primary" dark v-on="on">Add Artist</v-btn>
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
            <v-btn color="blue darken-1" text @click="create()">Create</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </h1>
    <div v-for="artist in artists" :key="artist.id">
      {{ artist.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "artists",

  data: () => ({
    url: "http://localhost:1337/artists",
    artists: [],
    dialog: false,
    name: null,
    date: null,
    menu: false
  }),

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
        .then(() => console.log("Created"));
    }
  }
};
</script>

<style scoped></style>
