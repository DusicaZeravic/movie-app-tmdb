<template>
  <div class="container">
    <header class="movieDetails">
      <font-awesome-icon @click="goToMainPage()" class="icon" icon="reply"></font-awesome-icon>
    </header>
    <div class="movieInfo">
      <div class="poster">
        <img
          v-if="movieResult.poster_path"
          :src="'https://image.tmdb.org/t/p/w400' + movieResult.poster_path"
        />
        <img v-else src="../assets/no_image.jpg" />
        <div class="overlay">
          <div class="text">{{movieResult.vote_average}}/10</div>
        </div>
      </div>
      <div class="info">
        <h1 class="movieTitle">{{movieResult.title}}</h1>
        <ul>
          <li class="movieDate">{{movieResult.release_date}}</li>|
          <li class="moviRuntime">{{movieResult.runtime}} min</li>|
          <li
            class="movieLanguage"
            v-for="language in movieResult.spoken_languages"
            :key="language"
          >{{language.name}} |</li>
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

    <section class="trailer">
      <h1>Trailer</h1>
      <youtube class="video" width="800" height="450" :video-id="videoUrl" ref="youtube"></youtube>
    </section>
    <footer-app></footer-app>
  </div>
</template>

<script>
import Footer from "../components/Footer";
import axios from "axios";

export default {
  created() {
    this.getMovieInfo();
    this.getTrailer();
  },
  data() {
    return {
      number: this.$router.currentRoute.params.id,
      movieResult: {},
      videoUrl: "",
    };
  },
  methods: {
    goToMainPage() {
      this.$router.push("/");
    },
    getMovieInfo() {
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
    getTrailer() {
      axios
        .get(
          `${this.$store.state.url}/${this.number}/videos?api_key=${this.$store.state.apiKey}`
        )
        .then((response) => {
          this.videoUrl = response.data.results[0].key;
          console.log(this.videoUrl);
        });
    },
  },
  components: {
    footerApp: Footer,
  },
};
</script>

<style>
.container {
  display: grid;
  grid-gap: 40px;
  grid-template-areas:
    "h"
    "c"
    "video"
    "footer";
}

.movieDetails {
  grid-area: h;
  position: sticky;
  top: 0;
}

.movieDetails .icon {
  font-size: 250%;
  color: #fff;
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
  grid-area: c;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  color: #f1f2f6;
}

.movieInfo .poster {
  position: relative;
  width: 70%;
  margin-left: 70px;
}

.movieInfo .poster img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 4px;
}

.overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0%;
  background-color: rgb(26, 25, 25);
  opacity: 0.9;
  overflow: hidden;
  width: 100%;
  height: 0;
  transition: 0.5s ease;
}

.movieInfo .poster:hover .overlay {
  height: 100%;
}

.text {
  color: #f1f2f6;
  font-size: 200%;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid #f1f2f6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.6;
}

.movieInfo .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
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

.trailer {
  display: grid;
  grid-area: video;
  grid-template-columns: 1fr;
  margin: 0 auto;
  overflow: hidden;
  float: none;
  clear: both;
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 25px;
  height: 0;
}

.trailer h1 {
  color: #f1f2f6;
  font-size: 180%;
  text-align: center;
  text-transform: uppercase;
}

.trailer .video {
  position: absolute;
  top: 100px;
  left: 0;
  width: 100%;
  height: 100%;
}

@media (max-width: 768px) {
  .movieInfo {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .movieInfo .poster {
    margin: 0 auto;
  }

  .info .movieTitle {
    font-size: 220%;
  }

  .trailer .video{
    top: 0;
  }
}

@media (max-width: 360px) {
  .movieDetails .icon {
    margin-left: 20px;
    font-size: 150%;
  }

  .movieInfo {
    margin: 0 15px;
  }

  .info .movieTitle {
    font-size: 200%;
  }

  .info .movieOverview {
    font-size: 100%;
  }

  .genres {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1px;
    font-size: 110%;
  }

  .genres .genre {
    display: block;
    border: 1px solid #f1f2f6;
    border-radius: 4px;
    width: 50%;
    font-weight: bold;
    margin: 0;
    padding: 5px 10px;
    margin-bottom: 5px;
  }

  .genres .genre:first-of-type {
    margin-top: 10px;
    margin-left: 0;
  }
}
</style>
