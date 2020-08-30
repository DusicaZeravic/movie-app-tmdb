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
@import url("https://fonts.googleapis.com/css2?family=Zilla+Slab&display=swap");

* {
  box-sizing: border-box;
  margin: 0;
}

body {
  background-color: rgb(10, 10, 10);
}

#app {
  font-family: "Zilla Slab", serif;
}
</style>
