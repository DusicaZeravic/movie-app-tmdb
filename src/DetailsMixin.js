export default {
    methods: {
        seeDetails(id) {
            this.$router.push("/movie" + id);
          },
    }
}