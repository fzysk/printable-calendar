<template>
  <v-card flat>
    <v-card-title>Wybierz paletę kolorów:</v-card-title>
    <v-card-subtitle>
      Opcjonalnie pozostań przy obecnej i wyświetl kalendarz
    </v-card-subtitle>
    <v-card-text></v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SelectColors extends Vue {}
</script>

<style scoped lang="scss"></style>
