<template>
  <div class="month">
    <template v-for="(events, i) in monthEvents" >
        <span class="day-number" :key="5 * i">
          {{ toDayNumber(events[0].date) }}
        </span>
        <span class="day-name" :key="5 * i + 1">
          {{ toDayName(events[0].date)}}
        </span>
        <div class="events" v-for="(evt, j) in events" :key="5 * i + 2 + j" >
          <span style="" >{{evt.text}}</span>
          <span class="event-divider" v-if="j != events.length - 1">/</span>
        </div>
        <span class="day-divider" v-if="!lastDayOfMonth(i+1)" :key="5 * i + 3" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CalendarEvent } from "../../models/calendar";
import moment, { Moment } from "moment";

@Component({})
export default class CalendarMonth extends Vue {
  @Prop() month!: number;

  get monthEvents(): CalendarEvent[][] {
    return this.$store.getters["generatedCalendar/getMonthEvents"](this.month);
  }

  lastDayOfMonth(day: number): boolean {
    const year: number = this.$store.getters["generatedCalendar/getYear"];
    const toCompare = moment([year, this.month, day]);
    return moment(toCompare).endOf("month").add(1, "second").subtract(1, "day").isSame(toCompare);
  }

  toDayNumber(date: Moment): string {
    return date.format("D");
  }

  toDayName(date: Moment): string {
    return date.format("dddd");
  }
}
</script>

<style scoped lang="scss">
.month {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;

  display: grid;
  grid-template-columns: 1fr 2fr 9fr;
  grid-template-rows: repeat(15, 2fr 1px);
  column-gap: 2px;
  row-gap: 5px;
}

.day-number {
  justify-self: center;
}

.day-name {
  text-transform: capitalize;
}

.day-divider {
  grid-column: 1 / span 3;
  border-bottom: 1px solid #eee;
}

.event-divider {
  margin: 0rem 1rem;
}
</style>
