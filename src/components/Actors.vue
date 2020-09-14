<template>
  <div class="actorsContainer">
    <h1>Cast</h1>
    <button @click.prevent="viewAll()">View All</button>
    <div class="cast">
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
          this.firstFiveActors = this.actors.splice(0, 5);
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

<style scoped>
.actorsContainer {
  margin: 40px 0 10px 0;
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
  width: 100px;
  height: 50px;
  background-color: rgb(10, 10, 10);
  border: none;
  color: blue;
  font-size: 120%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  right: -1050px;
}

.actorsContainer button:focus {
  outline: none;
}

.cast {
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  margin: 20px 0 10px 0;
}

.actorCard {
  width: 200px;
  height: 400px;
}

.actorCard img {
  border-radius: 5px;
  width: 200px;
  height: 300px;
}

.actorCard img:hover {
  filter: brightness(110%);
}

.actorName .name {
  color: #f1f2f6;
  text-align: center;
}
</style>