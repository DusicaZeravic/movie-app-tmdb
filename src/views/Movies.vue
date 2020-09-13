<template>
  <div class="moviesContainer">
    <header>
      <div class="title">
        <h2>
          <font-awesome-icon class="icon" icon="film"></font-awesome-icon>
          {{title}}
        </h2>
      </div>
      <div class="search">
        <input
          type="text"
          @keyup.enter="getData()"
          v-model="inputText"
          placeholder="Search for movie title or keyword..."
        />
        <font-awesome-icon icon="search" class="searchIcon" />
      </div>
    </header>
    <div class="popularMovies">
      <span>
        <h1>What's popular these days?</h1>
      </span>
    </div>
    <div v-if="movieArray.length > 0" class="content">
      <div class="movieCard" v-for="movie in movieArray" :key="movie.id">
        <router-link class="routerLink" :to="'/movie/' + movie.id">
          <div class="poster" @click="seeDetails(movie.id)">
            <div class="rating">
              <h6>
                <font-awesome-icon icon="star" class="starIcon" />
                {{movie.vote_average}}
              </h6>
            </div>
            <img
              v-if="movie.poster_path"
              :src="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
            />
            <img v-else src="../assets/no_image.jpg" />
          </div>
          <div class="textMovies">
            <h3 class="title">{{movie.title}}</h3>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="noMatch">There is no match with your search!</div>
    <div @click.prevent="loadMore" class="loadMore">Load More</div>
    <footer-app></footer-app>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import axios from "axios";

export default {
  data() {
    return {
      title: "MovieViewer",
      inputText: "",
      movieArray: [],
      isHidden: false,
      currentPage: 1,
    };
  },
  methods: {
    getData() {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=48dda66521ab26fb827b3aa9dbae2350&query=${this.inputText}&page=${this.currentPage}`
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
    loadMore() {
      this.currentPage++;
      axios
        .get(
          `${this.$store.state.url}/popular?api_key=${this.$store.state.apiKey}&page=${this.currentPage}`
        )
        .then((response) => {
          let data = response.data;
          let newData = this.movieArray.concat(data.results);
          this.movieArray = newData;
        });
    },
  },
  created() {
    axios
      .get(
        `${this.$store.state.url}/popular?api_key=${this.$store.state.apiKey}&page=${this.currentPage}`
      )
      .then((response) => {
        console.log(response);
        this.movieArray = response.data.results;
      })
      .catch((error) => console.log(error));
  },
  components: {
    footerApp: Footer,
  },
};
</script>

<style scoped>
.moviesContainer {
  height: 90vh;
  display: grid;
  grid-gap: 20px;
  grid-template-areas:
    "header"
    "no-match"
    "popular"
    "content"
    "loadMore"
    "footer";
}

header {
  display: grid;
  grid-gap: 20px;
  grid-area: header;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

header .title {
  color: #f1f2f6;
  font-size: 130%;
}

header .search {
  position: relative;
  line-height: 100px;
}

.search input {
  height: 40px;
  font-size: 100%;
  border-radius: 4px;
  background-color: #141414;
  color: #d8d8da;
  font-weight: bold;
  box-shadow: 0 -2px 10px rgb(182, 181, 181);
  width: 400px;
  letter-spacing: 2px;
  text-indent: 4px;
}

::placeholder {
  color: #d8d8da;
  text-indent: 4px;
  font-size: 90%;
}

.search input:focus {
  outline: none;
}

.searchIcon {
  color: #f1f2f6;
  position: absolute;
  top: 40px;
  right: 20px;
}

.noMatch {
  display: grid;
  grid-area: no-match;
  color: #f1f2f6;
  text-align: center;
  font-size: 140%;
}

.content {
  display: grid;
  grid-gap: 30px;
  grid-area: content;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.popularMovies {
  grid-area: popular;
  text-align: center;
  color: #f1f2f6;
  margin-bottom: 50px;
}

.popularMovies h1 {
  display: inline-block;
  font-size: 270%;
  text-transform: uppercase;
  letter-spacing: 2px;
  background: linear-gradient(
    to bottom,
    rgb(235, 235, 235),
    rgb(199, 198, 198) 60%,
    rgb(211, 210, 210) 60%,
    rgb(228, 226, 226) 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  transition: background 0.2s ease-out;
}

.popularMovies span {
  position: relative;
}

span:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 5px;
  background: #f1f2f6;
  bottom: 8px;
  transition: all 0.2s ease-out;
}

h1:hover {
  background-position: 0 11px;
}

span:hover:before {
  transform: translateY(10px);
}

.routerLink {
  text-decoration: none;
}

.movieCard {
  height: 400px;
  box-shadow: 0 -2px 10px rgb(182, 181, 181);
  transition: transform 0.5s, opacity 0.5s;
  margin-bottom: 30px;
  cursor: pointer;
}

.movieCard:hover {
  transform: scale(1.1);
  opacity: 0.7;
}

.movieCard .poster {
  height: 80%;
  opacity: 0.7;
  position: relative;
}

.poster .rating {
  float: left;
  position: absolute;
  left: -5px;
  top: -5px;
  z-index: 1000;
  background-color: rgb(207, 17, 55);
  height: 30px;
  width: 60px;
  color: #fff;
  font-weight: bold;
  font-size: 200%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.movieCard .poster img {
  border-radius: 5px;
  width: 100%;
  height: 100%;
}

.movieCard .textMovies {
  height: 30%;
  text-align: center;
  color: #f1f2f6;
}

.movieCard .textMovies .title {
  height: 40%;
  font-size: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.starIcon {
  font-size: 60%;
  float: left;
  margin: 8px 3px 0 3px;
}

.loadMore {
  grid-area: loadMore;
  text-align: center;
  color: rgb(10, 10, 10);
  border: 2px solid #f1f2f6;
  background: #f1f2f6;
  border-radius: 4px;
  width: 20%;
  height: 40px;
  line-height: 40px;
  font-size: 120%;
  margin: auto;
  cursor: pointer;
  margin-bottom: 30px;
  transition: transform 0.5s ease;
}

.loadMore:hover {
  transform: scale(0.9);
  background: rgb(10, 10, 10);
  color: #f1f2f6;
  border: none;
}

@media (max-width: 768px) {
  header {
    grid-template: 1fr;
    display: block;
    text-align: center;
  }

  header .title {
    font-size: 110%;
  }

  .searchIcon {
    right: 90px;
  }

  .popularMovies h1 {
    font-size: 200%;
  }

  span::before {
    display: none;
  }
}

@media (max-width: 360px) {
  header .title {
    font-size: 100%;
  }

  .search input {
    width: 250px;
    font-size: 70%;
  }

  .searchIcon {
    display: none;
  }

  .popularMovies {
    margin: 20px 0;
  }

  .popularMovies h1 {
    font-size: 120%;
  }

  span::before {
    display: none;
  }

  .movieCard {
    width: 250px;
    margin: 0 auto;
  }

  .loadMore {
    width: 30%;
    font-size: 100%;
    margin-bottom: 10px;
  }
}
</style>
