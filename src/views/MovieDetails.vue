<template>
  <div class="container">
    <header class="movieDetails">
      <font-awesome-icon @click="goToMainPage()" class="icon" icon="reply"></font-awesome-icon>
    </header>
    <div class="movieInfo" v-if="movieResult.id">
      <div class="poster">
        <img
          v-if="movieResult.poster_path"
          :src="'https://image.tmdb.org/t/p/w400' + movieResult.poster_path"
        />
        <img v-else src="../assets/no_image.jpg" />
      </div>
      <div class="info">
        <h1 class="movieTitle">{{movieResult.title}}</h1>
        <ul>
          <li class="movieDate">{{movieResult.release_date}}</li> |
          <li class="moviRuntime">{{movieResult.runtime}} min</li> |
          <li
            class="movieLanguage"
            v-for="language in movieResult.spoken_languages"
            :key="language"
          >{{language.name}}</li>
        </ul>
        <p class="movieOverview">{{movieResult.overview}}</p>
        <p class="genres">
          <strong>Genres:</strong>
          <span class="genre" v-for="genre in movieResult.genres" :key="genre.id">{{genre.name}}</span>
        </p>
        <h4 class="movieImdb">
          Look for more details on 
          <a
            :href="`https://www.imdb.com/title/${movieResult.imdb_id}`"
            target="_blank"
          >
            <img
              height="18"
              width="40"
              src="https://www.pngkey.com/png/full/343-3433435_facebook-imdb-icon.png"
            />
          </a>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted() {
    axios
      .get(
        `${this.$store.state.url}/${this.number}?api_key=${this.$store.state.apiKey}`
      )
      .then((response) => {
        console.log(response);
        this.movieResult = response.data;
        console.log(this.movieResult);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  data() {
    return {
      number: this.$router.currentRoute.params.id,
      movieResult: {},
    };
  },
  methods: {
    goToMainPage() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.movieDetails {
  height: 10vh;
}

.movieDetails .icon {
  font-size: 250%;
  float: right;
  color: #fff;
  margin-right: 10%;
  margin-top: 20px;
  cursor: pointer;
  opacity: 0.8;
  transition: transform 0.3s, opacity 0.3s;
}

.movieDetails .icon:hover {
  transform: scale(1.2);
  opacity: 1;
}

.movieInfo {
  color: #f1f2f6;
  width: 90%;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.movieInfo .poster,
.movieInfo .info {
  flex: 1;
}

.movieInfo .poster img {
  width: 65%;
  margin-left: 110px;
  border-radius: 4px;
}

.info .movieTitle {
  font-size: 250%;
}

.info ul {
  padding: 5px 0 20px 0;
}

.info ul li {
  display: inline-block;
  font-size: 110%;
}

.info .movieOverview {
  font-size: 110%;
  padding-bottom: 20px;
}

.info .genres {
  padding: 20px 0 40px 0;
}

.genres .genre:first-of-type {
  margin-left: 10px;
}

.genres .genre {
  margin-right: 20px;
  border: 1px solid #f1f2f6;
  border-radius: 4px;
  padding: 10px 20px;
  background-color: #f1f2f6;
  color: black;
  font-weight: bold;
}
</style>
