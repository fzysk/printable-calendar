<template>
  <div class="hello">
    <h1>Wydrukuj swój kalendarz!</h1>
    <p>Skorzystaj z gotowych szablonów lub stwórz własny!</p>
    <v-layout align-center justify-space-around row>
      <v-btn color="indigo" large outlined to="create-calendar">
        Wygeneruj nowy
      </v-btn>
      <v-btn color="indigo" large outlined>Wczytaj zapisany</v-btn>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeInfo extends Vue {}
</script>

<style scoped lang="scss"></style>
