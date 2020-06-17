<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    nudge-right="20"
    nudge-top="4"
    max-width="20vw"
    offset-x
    transition="slide-x-transition"
  >
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <color-sample :color="selectedColor" />
      </div>
    </template>
    <v-container class="pa-1">
      <v-item-group v-model="selected" active-class="color-sample-selected">
          <v-item 
            class="mr-1" 
            v-for="(color, i) in colors" 
            :key="i" 
            v-slot:default="{ active, toggle }"
          >
            <color-sample v-if="validColor(color)" :color="color" :checked="active" @click="toggle" />
            <multi-color-sample v-else v-model="pickerColor" :startColor="multiColor" :checked="active" @change="toggle" />
          </v-item>
      </v-item-group>
    </v-container>
  </v-menu>
</template>

<script lang="ts">
import ColorSample from "./ColorSample.vue";
import MultiColorSample from "./MultiColorSample.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import { multiColor } from './colors';

@Component({
  components: {
    ColorSample, MultiColorSample
  }
})
export default class ColorSamplesList extends Vue {
  menu = false;
  selected = 0;
  pickerColor = "";
  @Prop() colors!: string[];

  validColor(color: string): boolean {
    return color !== multiColor;
  }

  get selectedColor() {
    return this.colors[this.selected];
  }
}
</script>

<style scoped lang="scss">
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.v-menu__content {
    box-shadow: none;
}
</style>
