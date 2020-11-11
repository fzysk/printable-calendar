<template>
  <div>
    <div class="saver">
      <v-btn
        class="ma-2"
        outlined
        large
        fab
        color="indigo"
        @click="exportCalendar"
      >
        <v-icon>mdi-content-save-outline</v-icon>
      </v-btn>
    </div>
    <div class="calendar">
      <nice-next-clicker 
        clss="previous-month" 
        :orientation='-1' 
        :disabled='isPrevBtnDisabled' 
        @click="currentMonth -= 1"
      />
      <div class="calendar-view">
        <div class="calendar-header">
          <span class="header">{{ headerLocale }}</span>
        </div>
        <calendar-month :month="currentMonth" />
      </div>
      <nice-next-clicker 
        clss="next-month" 
        :orientation='1' 
        :disabled='isNextBtnDisabled'
        @click="currentMonth += 1" 
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import CalendarMonth from "../components/ShowCalendar/CalendarMonth.vue";
import NiceNextClicker from "../components/NiceNextClicker.vue";
import moment from "moment";
import { Month, Calendar } from "@/models/calendar";
import { Orientation } from "@/models/orientation"
import FileSaver from "file-saver";

@Component({
  components: {
    CalendarMonth, NiceNextClicker
  }
})
export default class ShowCalendar extends Vue {
  readonly minMonth = Month.January;
  readonly maxMonth = Month.December;
  month: Month = Month.January;

  get currentMonth() {
    return this.month;
  }
  set currentMonth(month: number) {
    this.month = month;
  }

  get headerLocale() {
    const year = this.$store.getters["generatedCalendar/getYear"];
    return moment([year, this.currentMonth, 1]).format("MMMM YYYY");
  }

  get isPrevBtnDisabled() {
    return this.month == this.minMonth;
  }
  get isNextBtnDisabled() {
    return this.month == this.maxMonth;
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

  exportCalendar() {
    const calendar: Calendar = this.$store.getters["generatedCalendar/getCalendar"];
    const blob = new Blob([JSON.stringify(calendar)], { type: "application/json"});

    FileSaver.saveAs(blob, `calendar-${calendar.year}.json`);
  }
}
</script>

<style scoped lang="scss">
@media print {
  @page {
    size: 21cm 29.7cm;
    margin: 3mm 5mm 5mm 3mm;
  }

  .calendar-view {
    height: 100%;
    width: 100%;
    position: fixed;
    top: 10mm;
    left: 0;
    padding: 0;
    line-height: 23px;
  }

  .header {
    margin-top: 0.5rem!important;
  }

  .previous-month, .next-month {
    display: none;
  }
}

.calendar {
  display: grid;
  grid-template-columns: 0.5fr 3fr 0.5fr;
  grid-template-rows: 0.5fr 12fr 0.5fr; 
}

.previous-month {
  grid-area: 2 / 1 / 3 / 2; 
}

.calendar-view {
  grid-area: 2 / 2 / 3 / 3;
}

.next-month {
  grid-area: 2 / 3 / 3 / 4;
}

.calendar-header {
  background-color: #005792;
  color: white;
  border: 1px solid #eee;
  border-radius: 11px 11px 0px 0px;
  min-height: 2.5rem;
  display: flex;
  justify-content: center;
  align-content: center;
}

.header {
  font-size: 30px;
  text-transform: capitalize;
  margin-right: 0 0.5rem;
}

.month-picker {
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
  height: 2.2rem;
}

.saver {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  box-shadow: 0px 0px 10px 2px rgba(51,51,51,0.5);
}
</style>
