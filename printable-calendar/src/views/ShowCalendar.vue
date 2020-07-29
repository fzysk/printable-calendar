<template>
  <div class="calendar">
    <div class="calendar-header"></div>
    <div class="month-picker">
      <v-layout align-center justify-center row fill-height>
        <v-slide-x-reverse-transition>
          <v-btn
            icon
            v-show="hover"
            :disabled="month == minMonth"
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
          >{{ headerLocale }}
        </span>
        <v-slide-x-transition>
          <v-btn
            icon
            v-show="hover"
            :disabled="month == maxMonth"
            @click="increaseMonth()"
            @mouseenter="debounceHoverOn()"
            @mouseleave="debounceHoverOff()"
          >
            <v-icon>mdi-arrow-right-bold</v-icon>
          </v-btn>
        </v-slide-x-transition>
      </v-layout>
    </div>
    <calendar-month />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarMonth from "../components/ShowCalendar/CalendarMonth.vue";
import moment from "moment";
import { Month } from "@/models/calendar";

let timeout = 0;

@Component({
  components: {
    CalendarMonth
  }
})
export default class ShowCalendar extends Vue {
  readonly minMonth = Month.January;
  readonly maxMonth = Month.December;
  hover = false;
  month: Month = Month.January;

  get currentMonth() {
    return this.month;
  }
  set currentMonth(month: number) {
    this.month = month;
  }
  

  get monthEvents() {
    return this.$store.getters["generatedCalendar/getMonthEvents"](
      this.currentMonth
    );
  }

  get headerLocale() {
    const year = this.$store.getters["generatedCalendar/getYear"];
    moment.locale("pl");
    return moment([year, this.currentMonth, 1]).format("MMMM YYYY");
  }

  // month change methods
  increaseMonth() {
    if (this.month != this.maxMonth) {
      this.month += 1;
    }
  }
  decreaseMonth() {
    if (this.month != this.minMonth) {
      this.month -= 1;
    }
  }

  // debounce methods
  debounceHover(func: Function) {
    clearTimeout(timeout);
    timeout = setTimeout(func, 100);
  }
  debounceHoverOn() {
    this.debounceHover(() => {
      this.hover = true;
    });
  }
  debounceHoverOff() {
    this.debounceHover(() => {
      this.hover = false;
    });
  }
}
</script>

<style scoped lang="scss">
.calendar {
  margin: 15px;
  border-bottom: 1px solid #eee;
}

.calendar-header {
  background-color: rgba(0, 0, 0, 0.05);
  border: 1px solid #eee;
  border-radius: 11px 11px 0px 0px;
  min-height: 2rem;
}

.month-picker {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
</style>
