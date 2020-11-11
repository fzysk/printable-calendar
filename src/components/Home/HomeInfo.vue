<template>
  <div class="hello">
    <h1>Wydrukuj swój kalendarz!</h1>
    <p>Skorzystaj z gotowych szablonów lub stwórz własny!</p>
    <v-layout align-center justify-space-around row>
      <v-btn color="indigo" large outlined to="create-calendar">
        Wygeneruj nowy
      </v-btn>
      <input ref="file" type="file" accept="application/json" @change="onFilePicked" hidden />
      <v-btn color="indigo" large outlined @click="selectFile">Wczytaj zapisany</v-btn>
      <v-overlay :value="overlay">
        <v-progress-circular
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>
    </v-layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from "vue-property-decorator";

@Component
export default class HomeInfo extends Vue {
  @Ref('file') readonly file!: HTMLInputElement;
  overlay = false;
  
  selectFile() {
    this.file.click();
  }

  onFilePicked(event: any) {
    const files = event.target.files;
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      this.$store.commit("generatedCalendar/importCalendar", fileReader.result);
      this.overlay = false;
      this.$router.push({ path: 'create-calendar'});
    })

    this.overlay = true;
    fileReader.readAsText(files[0]);
  }
}
</script>

<style scoped lang="scss"></style>
