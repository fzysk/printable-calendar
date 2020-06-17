<template>
  <div class="color-sample" :style="colorClass" @click="$emit('click')">
      <v-icon v-if="checked">
        mdi-check
      </v-icon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ColorSample extends Vue {
  @Prop() readonly color!: string;
  @Prop() checked!: boolean;

  get colorClass() {
    return "background-color: " + this.color + ";";
  }
}
</script>

<style scoped lang="scss">
.color-sample {
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
