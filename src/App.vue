<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ibarra+Real+Nova:wght@600&display=swap");

* {
  box-sizing: border-box;
}

body {
  background-color: rgb(10, 10, 10);
  margin: 10px 90px;
  line-height: 1.4;
}

#app {
  font-family: "Ibarra Real Nova", serif;
}

@media (max-width: 768px) {
  body {
    margin: 0 40px;
  }
}

@media (max-width: 360px) {
}
</style>
