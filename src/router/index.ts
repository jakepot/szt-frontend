import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Review from "../views/Review.vue";
import Reviews from "../views/Reviews.vue";
import NewReview from "../views/NewReview.vue";
import NewSong from "../views/NewSong.vue";
import Artists from "../views/Artists.vue";
import Genres from "../views/Genres.vue";
import Gallery from "../views/Gallery.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/songs",
    name: "songs",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Songs.vue")
  },
  {
    path: "/review/:id",
    name: "review",
    component: Review
  },
  {
    path: "/reviews",
    name: "reviews",
    component: Reviews
  },
  {
    path: "/reviews/new",
    name: "newReview",
    component: NewReview
  },
  {
    path: "/songs/new",
    name: "newSong",
    component: NewSong
  },
  {
    path: "/artists",
    name: "artists",
    component: Artists
  },
  {
    path: "/genres",
    name: "genres",
    component: Genres
  },
  {
    path: "/gallery",
    name: "gallery",
    component: Gallery
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
