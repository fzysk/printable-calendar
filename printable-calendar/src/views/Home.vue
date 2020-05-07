<template>
  <v-layout align-center justify-center row fill-height class="main">
    <img alt="Logo" src="../assets/logo.png" />
    <span class="divider" />
    <HomeInfo/>
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
.main {
  background: linear-gradient(#FFFFFF, #8dd1ff);
}

.divider {
  width: 1em;
}
</style>
