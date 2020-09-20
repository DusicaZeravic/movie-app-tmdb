<template>
  <div class="actorsContainer">
    <h1>Cast</h1>
    <button @click.prevent="viewAll()">View All</button>
    <div v-if="firstFiveActors.length > 0" class="cast">
      <div class="actorCard" v-for="actor in firstFiveActors" :key="actor.id">
        <div class="image">
          <img
            v-if="actor.profile_path"
            :src="'https://image.tmdb.org/t/p/w200' + actor.profile_path"
          />
          <img v-else src="../assets/no_image.jpg" />
        </div>
        <div class="actorName">
          <h3 class="name">{{actor.name}}</h3>
        </div>
      </div>
    </div>
    <div v-else class="noCast">{{ noCast }}</div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      number: this.$router.currentRoute.params.id,
      actors: [],
      firstFiveActors: [],
      moreActors: [],
      noCast: "The cast info for this movie is not available!",
    };
  },
  created() {
    this.getActors();
  },
  methods: {
    getActors() {
      axios
        .get(
          `${this.$store.state.url}/${this.number}/credits?api_key=${this.$store.state.apiKey}`
        )
        .then((response) => {
          this.actors = response.data.cast;
          console.log(this.actors);
          this.firstFiveActors = this.actors.splice(0, 7);
          console.log(this.firstFiveActors);
          this.moreActors = this.actors.slice();
          console.log(this.moreActors);
        });
    },
    viewAll() {
      this.firstFiveActors.push(...this.moreActors);
    },
  },
};
</script>

<style>
.actorsContainer {
  margin: 100px 10px 10px 10px;
}

.actorsContainer h1 {
  color: #f1f2f6;
  text-align: center;
  text-transform: uppercase;
  font-size: 180%;
  height: 20px;
}

.actorsContainer button {
  cursor: pointer;
  height: 50px;
  background-color: rgb(10, 10, 10);
  border: none;
  color: blue;
  font-size: 120%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.actorsContainer button:focus {
  outline: none;
}

.cast {
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  margin-bottom: 20px;
}

.actorCard {
  width: 140px;
  height: 250px;
  padding-top: 10px;
}

.actorCard img {
  border-radius: 5px;
  width: 140px;
  height: 200px;
}

.actorCard img:hover {
  filter: brightness(110%);
}

.actorName .name {
  color: #f1f2f6;
  font-size: 90%;
  text-align: center;
}

.noCast {
  color: #f1f2f6;
  text-align: center;
  font-size: 120%;
}

@media (max-width: 768px) {
  .actorsContainer {
    margin-top: 10px;
  }
}

@media (max-width: 360px) {
  .actorsContainer {
    margin-top: 10px;
  }

  .cast {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
  }

  .actorCard {
    width: 100px;
    height: 200px;
    margin-top: 20px;
  }

  .actorCard img {
    border-radius: 5px;
    width: 120px;
    height: 180px;
  }

  .actorName {
    width: 120px;
  }

  .actorName .name {
    margin-top: 3px;
    text-align: center;
  }
}
</style>