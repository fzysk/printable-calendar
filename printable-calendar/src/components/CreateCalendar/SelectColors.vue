<template>
  <v-card flat>
    <v-card-title>Wybierz paletę kolorów:</v-card-title>
    <v-card-subtitle>
      Opcjonalnie pozostań przy obecnej i wyświetl kalendarz
    </v-card-subtitle>
    <v-card-text>
      <v-container fluid>
        <v-row align-content="center">
          <v-col cols="2">
            Kolor górnego tekstu:
          </v-col>
          <v-col cols="1">
            <color-samples-list :colors="titleColors"/>
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { titleColors } from "../ColorSamplesList/colors";
import ColorSamplesList from "./../ColorSamplesList/ColorSamplesList.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    ColorSamplesList
  }
})
export default class SelectColors extends Vue {
  titleColors = titleColors;  
}
</script>

<style scoped lang="scss"></style>
