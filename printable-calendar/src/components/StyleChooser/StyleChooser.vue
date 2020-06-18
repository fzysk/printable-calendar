<template>
  <v-row align-content="center">
    <v-col cols="2">
      Kolor górnego tekstu:
    </v-col>
    <v-col cols="1">
      <color-samples-list :colors="startingColors" />
    </v-col>
    <v-spacer />
    <v-col cols="1">
      Style:
    </v-col>
    <v-col cols="auto"> </v-col>
  </v-row>
</template>

<script lang="ts">
import ColorSamplesList from "./ColorSamplesList/ColorSamplesList.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import { Style } from "../../models/colors";

@Component({
  components: {
    ColorSamplesList
  }
})
export default class StyleChooser extends Vue {
  @Prop() defaultStyle!: Style;
  @Prop() startingColors!: string[];

  
}
</script>

<style scoped lang="scss"></style>
