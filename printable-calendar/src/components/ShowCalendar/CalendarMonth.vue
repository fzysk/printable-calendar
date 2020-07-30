<template>
  <div class="month">
    <div class="day" v-for="(events, i) in monthEvents" :key="i">
      <v-row>
        <v-col>
          {{ formatDate(events[0].date) }}
        </v-col>
        <v-col>
          <template v-for="(evt, j) in events" >
            <span style="" :key="2 * j">{{evt.text}}</span>
            <span class="event-divider" v-if="j != events.length - 1" :key="2 * j + 1">/</span>
          </template>
        </v-col>
      </v-row>
      <v-divider v-if="!lastDayOfMonth(i+1)" />
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

  get monthEvents(): CalendarEvent[][] {
    return this.$store.getters["generatedCalendar/getMonthEvents"](this.month);
  }

  lastDayOfMonth(day: number): boolean {
    const year: number = this.$store.getters["generatedCalendar/getYear"];
    const toCompare = moment([year, this.month, day]);
    return moment(toCompare).date(0).add(1, "month").isSame(toCompare);
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

.event-divider {
  margin: 0rem 1rem;
}
</style>
