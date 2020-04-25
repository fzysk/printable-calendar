<template>
  <v-layout align-center justify-center row fill-height>
    <img alt="Logo" src="../assets/logo.png" />
    <span class="divider" />
    <HomeInfo msg="Welcome to Your Vue.js App" />
  </v-layout>
</template>

<script>
// @ is an alias to /src
import HomeInfo from "@/components/Home/HomeInfo.vue";

export default {
  name: "Home",
  components: {
    HomeInfo
  }
};
</script>

<style scoped>
.divider {
  width: 40px;
}
</style>
