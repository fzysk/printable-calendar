<template>
  <div class="month">
    <template v-for="(events, i) in monthEvents" >
        <span 
          :class="['day-number', getBackgroundClass(events)]" 
          :style="getTextStyle(events)"
          :key="4 * i"
        >
          {{ toDayNumber(events[0].date) }}
        </span>
        <span 
          :class="['day-name', getBackgroundClass(events)]" 
          :style="getTextStyle(events)"
          :key="4 * i + 1">
          {{ toDayName(events[0].date)}}
        </span>
        <div :class="['events', getBackgroundClass(events)]" :key="4 * i + 2" >
          <template v-for="(evt, j) in events">
            <span :style="getTextStyle([evt], false)" :key="2 * j">{{evt.text}}</span>
            <span class="event-divider" v-if="j != events.length - 1" :key="2 * j + 1">/</span>
          </template>
        </div>
        <span class="day-divider" v-if="!lastDayOfMonth(i + 1)" :key="4 * i + 3" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CalendarEvent, EventImportance, Calendar } from "../../models/calendar";
import moment, { Moment } from "moment";
import { ColorSettings, DefaultColorSettings, Style, toCssStyle } from '../../models/colors';

@Component({})
export default class CalendarMonth extends Vue {
  @Prop() month!: number;

  get monthEvents(): CalendarEvent[][] {
    return this.$store.getters["generatedCalendar/getMonthEvents"](this.month);
  }

  get colorSettings(): ColorSettings | undefined {
    return this.$store.getters["generatedCalendar/getColorSettings"];
  }

  lastDayOfMonth(day: number): boolean {
    const year: number = this.$store.getters["generatedCalendar/getYear"];
    const toCompare = moment([year, this.month, day]);
    return moment(toCompare).endOf("month").add(1, "second").subtract(1, "day").isSame(toCompare);
  }

  getBackgroundClass(events: CalendarEvent[]): string {
    let classString = '';
    if (events?.some(e => e.importance === EventImportance.Holiday) ||
      events?.some(e => e.date.isoWeekday() == 6 || e.date.isoWeekday() == 7)) {
      classString = 'holiday-background';
    }

    return classString;
  }

  getTextStyle(events: CalendarEvent[], onlyHolidayColor = true): string {
    let colorSettings = null;

    if (this.colorSettings) {
      colorSettings = this.colorSettings;
    }
    else {
      colorSettings = new DefaultColorSettings();
    }

    let style: Style;
    if (events?.some(e => e.importance === EventImportance.Holiday)) {
      style = colorSettings.holidayStyle;
    }
    else if (events?.some(e => e.date.isoWeekday() == 6 || e.date.isoWeekday() == 7)) {
      style = colorSettings.weekendStyle;
    }
    else if (!onlyHolidayColor && events?.some(e => e.importance === EventImportance.UserEvent)) {
      style = colorSettings.customEventStyle;
    }
    else {
      style = colorSettings.monthStyle; // TODO: to change to default
    }

    return toCssStyle(style);
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
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;

  display: grid;
  grid-template-columns: 1fr 2fr 9fr;
  grid-template-rows: repeat(15, 2fr 1px);
}

.day-number, .day-name, .events {
  padding: 2px 5px;
}

.day-number {
  width: 100%;
  text-align: center;
}

.day-name {
  text-transform: capitalize;
}

.day-divider {
  grid-column: 1 / span 3;
  border-bottom: 1px solid #ddd;
}

.holiday-background {
  background-color: #eee;
}

.event-divider {
  margin: 0rem 1rem;
}
</style>
