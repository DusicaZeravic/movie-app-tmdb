<template>
  <div>
    <header>
      <div class="title">
        <h2>
          <font-awesome-icon class="icon" icon="film"></font-awesome-icon>
          {{title}}
        </h2>
      </div>
      <div class="search">
        <input type="text" v-model="inputText" placeholder="Search for movie title or keyword..." />
        <button @click="getData()">
          <font-awesome-icon icon="search" class="searchIcon" />
        </button>
      </div>
    </header>
    <div class="movieContainer">
      <div class="movieCard" v-for="movie in movieArray" :key="movie.id">
        <router-link :to="'/movie/' + movie.id">
          <div class="poster" @click="seeDetails(movie.id)">
            <img
              v-if="movie.poster_path"
              :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
            />
            <img v-else src="../assets/no_image.jpg" />
          </div>
        </router-link>

        <div class="text">
          <h3 class="title">{{movie.title}}</h3>
          <h6 class="vote">Rating: {{movie.vote_average}}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "MovieViewer",
      inputText: "",
      movieArray: [],
    };
  },
  methods: {
    getData() {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=48dda66521ab26fb827b3aa9dbae2350&query=${this.inputText}`
        )
        .then((response) => {
          console.log(response);
          this.movieArray = response.data.results;
          console.log(this.movieArray);
        })
        .catch((err) => {
          console.log(err);
        });
      this.inputText = "";
    },
    seeDetails(id) {
      this.$router.push("/movie" + id);
    },
  },
};
</script>

<style scoped>
header {
  height: 100px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
}

header .title {
  color: #f1f2f6;
  margin-left: 12%;
  line-height: 100px;
  font-size: 130%;
}

header .search {
  margin-right: 10%;
  line-height: 100px;
}
.search input,
.search button {
  height: 40px;
  font-size: 100%;
  border-radius: 4px;
  background-color: #141414;
  color: #d8d8da;
  font-weight: bold;
  box-shadow: 0 -2px 10px rgb(182, 181, 181);
}

.search input {
  width: 350px;
  letter-spacing: 2px;
  text-indent: 4px;
}

::placeholder {
  color: #d8d8da;
  text-indent: 4px;
  font-size: 90%;
}

.search input:focus,
.search button:focus {
  outline: none;
}

.search button {
  width: 8%;
  margin-left: 12px;
  cursor: pointer;
  color: #f1f2f6;
}

.movieContainer {
  width: 90%;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.movieCard {
  width: 20%;
  height: 400px;
  box-shadow: 0 -2px 10px rgb(182, 181, 181);
  transition: transform 0.5s, opacity 0.5s;
  margin-bottom: 30px;
  cursor: pointer;
  margin-left: 30px;
}

.movieCard:hover {
  transform: scale(1.1);
  opacity: 0.7;
}

.movieCard .poster {
  height: 80%;
  width: 100%;
  opacity: 0.7;
}

.movieCard .poster img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
}

.movieCard .text {
  height: 20%;
  text-align: center;
  color: #f1f2f6;
}

.movieCard .text .title {
  height: 50%;
  font-size: 120%;
  margin-top: 5px;
}

.movieCard .text .vote {
  height: 50%;
  font-size: 90%;
  margin-top: 10px;
}
</style>
