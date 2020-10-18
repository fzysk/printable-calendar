<template>
    <div class="month-picker">
      <v-layout align-center justify-center row fill-height class="mt-2">
        <v-slide-x-reverse-transition>
          <v-btn
            icon
            v-show="hover"
            :disabled="isLeftBtnDisabled"
            @click="decreaseMonth()"
            @mouseenter="debounceHoverOn()"
            @mouseleave="debounceHoverOff()"
          >
            <v-icon>mdi-arrow-left-bold</v-icon>
          </v-btn>
        </v-slide-x-reverse-transition>
        <span
          style=""
          @mouseenter="debounceHoverOn()"
          @mouseleave="debounceHoverOff()"
          >
          aa
        </span>
        <v-slide-x-transition>
          <v-btn
            icon
            v-show="hover"
            :disabled="isRightBtnDisabled"
            @click="increaseMonth()"
            @mouseenter="debounceHoverOn()"
            @mouseleave="debounceHoverOff()"
          >
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-slide-x-transition>
      </v-layout>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment";
import { Month } from "@/models/calendar";

@Component({})
export default class MonthPicker extends Vue {  
  @Prop() month!: Month;
  hover = false;

  
}
</script>

<style scoped lang="scss">
  .month-picker {
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;
  }
  // .leftBtn {
  //   position: relative;
  //   left: -10px;
  // }
  // .rightBtn {
  //   position: relative;
  //   right: -10px;
  // }
</style>