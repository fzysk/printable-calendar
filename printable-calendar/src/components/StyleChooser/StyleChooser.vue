<template>
  <div class="styleChooser">
    <v-row>
      <h3>{{ headerText }}</h3>
    </v-row>
    <v-row align-content="center">
      <v-col cols="auto">
        <v-row> Kolor: </v-row>
        <v-row class="mt-16">
          <color-samples-list
            :colors="startingColors"
            @change="chosenStyle.color = $event"
          />
        </v-row>
      </v-col>
      <v-spacer />
      <text-chooser
        :defaultText="chosenStyle.text"
        @change="chosenStyle.text = $event"
      />
      <v-spacer />
    </v-row>
  </div>
</template>

<script lang="ts">
import ColorSamplesList from "./ColorSamplesList/ColorSamplesList.vue";
import TextChooser from "./TextChooser/TextChooser.vue";
import { Component, Vue, Prop, Model } from "vue-property-decorator";
import { Style } from "../../models/colors";

@Component({
  components: {
    ColorSamplesList,
    TextChooser
  }
})
export default class StyleChooser extends Vue {
  @Model("change", { type: Object }) chosenStyle!: Style;
  @Prop() startingColors!: string[];
  @Prop() headerText!: string;
}
</script>

<style scoped lang="scss">
.mt-16 {
  margin-top: 16px;
}
</style>
