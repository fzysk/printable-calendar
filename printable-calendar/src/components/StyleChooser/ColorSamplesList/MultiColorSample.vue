<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    offset-x
    transition="slide-x-transition"
  >
    <template v-slot:activator="{ on }">
      <div
        class="multi-color-sample"
        :style="colorClass"
        v-on="on"
        @click="$emit('click')"
      >
        <v-icon>mdi-palette</v-icon>
      </div>
    </template>
    <v-color-picker v-model="pickerColor" :hide-inputs="false"></v-color-picker>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from "vue-property-decorator";

@Component
export default class MultiColorSample extends Vue {
  @Model("input", { type: String }) color!: string;
  @Prop() checked!: boolean;
  menu = false;

  get colorClass() {
    return "background-color: " + this.color + ";";
  }

  get pickerColor() {
    return this.color;
  }
  set pickerColor(color: string) {
    this.$emit("input", color);
  }
}
</script>

<style scoped lang="scss">
.multi-color-sample {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  cursor: pointer;
  color: #cccccc;

  position: relative;
  display: inline-block;

  & > i {
    position: absolute;
    left: 9px;
    top: 9px;
  }
}

.color-sample-selected {
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.75);
}
</style>
