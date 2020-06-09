<template>
  <v-card flat>
    <v-card-title>Wybierz paletę kolorów:</v-card-title>
    <v-card-subtitle>
      Opcjonalnie pozostań przy obecnej i wyświetl kalendarz
    </v-card-subtitle>
    <v-card-text>

      <color-samples-list />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import ColorSamplesList from "./../ColorSamplesList/ColorSamplesList.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    ColorSamplesList
  }
})
export default class SelectColors extends Vue {}
</script>

<style scoped lang="scss"></style>
