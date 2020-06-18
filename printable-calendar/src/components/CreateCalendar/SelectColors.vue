<template>
  <v-card flat>
    <v-card-title>Wybierz paletę kolorów:</v-card-title>
    <v-card-subtitle>
      Opcjonalnie pozostań przy obecnej i wyświetl kalendarz
    </v-card-subtitle>
    <v-card-text>
      <v-container fluid>
        <style-chooser :startingColors="titleColors" />
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { titleColors } from "../../models/colors";
import StyleChooser from "../StyleChooser/StyleChooser.vue";
import { Component, Vue } from "vue-property-decorator";
import { ColorSettings, DefaultColorSettings } from "../../models/colors";

@Component({
  components: {
    StyleChooser
  }
})
export default class SelectColors extends Vue {
  titleColors = titleColors;
  colorSettings: ColorSettings = new DefaultColorSettings();
}
</script>

<style scoped lang="scss"></style>
