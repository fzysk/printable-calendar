<template>
  <div class="month">
    <div class="day" v-for="(event, i) in monthEvents" :key="i">
      <v-row>
        <v-col>
          {{ formatDate(event.date) }}
        </v-col>
        <v-col>
          {{ event.text }}
        </v-col>
      </v-row>
      <v-divider v-if="!lastDayOfMonth(i)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CalendarEvent } from "../../models/calendar";
import moment, { Moment } from "moment";

@Component({})
export default class CalendarMonth extends Vue {
  @Prop() month!: number;

  get monthEvents(): CalendarEvent[] {
    console.log(this.month);
    return this.$store.getters["generatedCalendar/getMonthEvents"](this.month);
  }

  lastDayOfMonth(day: number): boolean {
    const year: number = this.$store.getters["generatedCalendar/getYear"];
    const toCompare = moment([year, this.month, day]);

    return moment(toCompare)
      .endOf("month")
      .isSame(toCompare);
  }

  formatDate(date: Moment): string {
    return date.format("DD");
  }
}
</script>

<style scoped lang="scss">
.month {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
</style>
