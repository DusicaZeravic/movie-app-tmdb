<template>
  <div>
    <h1>More like this</h1>
    <div v-if="similarMovies.length > 0" class="carousel-wrapper" ref="wrapper">
      <div class="carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
      <div class="carousel" :style="{ width: carouselWidth + 'px'}">
        <div
          class="carousel-items"
          :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
          <div ref="card"
          :method="getMovieInfo"
            class="carousel--card"
            v-for="(item, index) in similarMovies"
            :key="index">
            <router-link class="routerLink" :to="'/movie/' + item.id">
              <img
                v-if="item.poster_path"
                :src="'https://image.tmdb.org/t/p/w300' + item.poster_path"
              />
              <img v-else src="../assets/no_image.jpg" />
              <h3>{{item.title}} ({{item.release_date.substring(0,4)}})</h3>
            </router-link>
          </div>
        </div>
      </div>
      <div class="carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
    </div>
    <div v-else class="noSimilar">
      <p>There's no similar movies!</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  created() {
    this.getSimilarMovies();
  },
  props: {
      method: {
          type: Function
      },
  },
  mounted() {
      this.method();
  },
  data() {
    return {
      number: this.$router.currentRoute.params.id,
      similarMovies: [],
      currentOffset: 0,
      paginationFactor: 200,
      carouselWidth: 1000,
      numOfCards: 5,
      routerName: "movie",
    };
  },
  computed: {
    atEndOfList() {
      return (
        this.currentOffset <=
        this.paginationFactor *
          -1 *
          (this.similarMovies.length - this.numOfCards)
      );
    },
    atHeadOfList() {
      return this.currentOffset === 0;
    },
  },
  methods: {
    getSimilarMovies() {
      axios
        .get(
          `${this.$store.state.url}/${this.number}/similar?api_key=${this.$store.state.apiKey}`
        )
        .then((response) => {
          console.log(response);
          this.similarMovies = response.data.results;
          console.log(this.similarMovies);
        })
        .catch((err) => console.log(err));
    },
    moveCarousel(direction) {
      this.setPagination();
      if (direction === 1 && !this.atEndOfList) {
        this.currentOffset -= this.paginationFactor;
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.paginationFactor;
      }
    },
    setPagination() {
      this.paginationFactor = this.$refs.card[0].clientWidth + 30;
    },
    seeDetails(id) {
      this.$router.push("/movie" + id);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #f1f2f6;
  text-transform: uppercase;
  font-size: 180%;
  text-align: center;
  margin-top: 80px;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;
}

.carousel {
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
}

.carousel--overflow-container {
  overflow: hidden;
}

.carousel--nav__left,
.carousel--nav__right {
  display: inline-block;
  padding: 10px;
  border-top: 2px solid #f1f2f6;
  border-right: 2px solid #f1f2f6;
  cursor: pointer;
  margin: 0 10px;
}

.carousel--nav__left:disabled,
.carousel--nav__right:disabled {
  opacity: 0.25;
  cursor: auto;
}

.carousel--nav__left {
  transform: rotate(-135deg);
}

.carousel--nav__left:active {
  transform: rotate(-135deg) scale(0.9);
}

.carousel--nav__right {
  transform: rotate(45deg);
}

.carousel--nav__right:active {
  transform: rotate(45deg) scale(0.9);
}

.carousel-items {
  display: flex;
  transition: transform 1000ms ease;
}

.carousel--card {
  cursor: pointer;
  margin: 0 15px;
}

.carousel--card:first-child {
  margin-left: 0;
}

.carousel--card:last-child {
  margin-right: 0;
}

img {
  height: 50vh;
  border-radius: 4px;
  vertical-align: bottom;
}

img:hover {
  filter: brightness(110%);
}

.routerLink {
  text-decoration: none;
}

h3 {
  color: #f1f2f6;
  text-align: center;
}

.noSimilar {
  color: #f1f2f6;
  display: block;
  text-align: center;
  font-size: 120%;
}

@media(max-width: 768px) {
  .carousel-wrapper {
    width: 100%;
  }

  .carousel-items .carousel--card img {
    height: 60vh;
  }
}

@media(max-width: 360px) {
  .carousel-wrapper {
    width: 80%;
  }

  .carousel-items .carousel--card img {
    height: 50vh;
  }
}
</style>