<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-x
  >
    <template v-slot:activator="{ on }">
      <span v-on="on">Click</span>
    </template>
    <v-container class="pa-1">
      <v-item-group v-model="selected" active-class="color-sample-selected">
        <v-row>
          <v-col v-for="(color, i) in colors" :key="i" cols="auto">
            <v-item v-slot:default="{ active, toggle }">
              <color-sample :color="color" :checked="active" @click="toggle" />
            </v-item>
          </v-col>
        </v-row>
      </v-item-group>
    </v-container>
  </v-menu>
</template>

<script lang="ts">
import ColorPallete from "./colors";
import ColorSample from "./ColorSample.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    ColorSample
  }
})
export default class ColorSamplesList extends Vue {
  menu = false;
  selected = 0;
  colors: string[] = ColorPallete;
}
</script>

<style scoped lang="scss"></style>
