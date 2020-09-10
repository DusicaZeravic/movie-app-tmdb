<template>
  <footer>
    <p v-html="copyright"></p>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      copyright: "&#169; 2020 Dušica Žeravić. All rights reserved.",
    };
  },
};
</script>

<style>
footer {
  grid-area: footer;
  color: #f1f2f6;
  text-align: center;
  margin-top: auto;
}
</style>