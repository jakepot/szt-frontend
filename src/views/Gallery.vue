<template>
  <div>
    <v-container>
      <h1>
        Photos
        <v-dialog v-model="dialog" max-width="400px">
          <template v-slot:activator="{ on }">
            <v-btn v-if="loggedIn" text v-on="on">Add</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add Photo</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="label"
                      label="Label*"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-file-input
                      v-model="file"
                      label="File*"
                      required
                    ></v-file-input>
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
      <v-row v-if="photos">
        <v-col cols="6" v-for="photo in photos" :key="photo.id">
          <v-card>
            <v-img
              :src="'http://localhost:1337' + photo.file.url"
              height="400"
              class="grey darken-4"
            ></v-img>
            <v-card-title class="title"
              >{{ photo.label }} <v-spacer></v-spacer>
              <v-btn v-if="loggedIn" @click="remove(photo.id)" icon
                ><v-icon>mdi-delete</v-icon></v-btn
              ></v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data: () => ({
    photos: [],
    label: null,
    file: null,
    dialog: false
  }),
  computed: {
    loggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    fetchPhotos() {
      this.$http
        .get("http://localhost:1337/photos")
        .then(response => (this.photos = response.data));
    },
    create() {
      const data = {};
      data.label = this.label;
      const formData = new FormData();
      formData.append("files.file", this.file, this.file.name);
      formData.append("data", JSON.stringify(data));
      this.$http.post("http://localhost:1337/photos", formData).then(data => {
        console.log(data);
        this.fetchPhotos();
      });
      this.dialog = false;
    },
    remove(id) {
      this.$http.delete("http://localhost:1337/photos/" + id).then(response => {
        this.fetchPhotos();
      });
    }
  },
  mounted() {
    this.fetchPhotos();
  }
};
</script>

<style scoped></style>
