<template>
  <div class="insertEvents">
    <v-layout v-if="!customEvents.length && !editing" align-center column>
      <!-- when there are none events -->
      <br />
      <span class="grayed-text">Wstaw własne wydarzenia!</span>
      <span class="grayed-text">
        To doskonały moment na personalizację swojego kalendarza
      </span>
      <br />
      <v-btn icon @click="editing = true">
        <v-icon color="indigo" large>mdi-plus-circle</v-icon>
      </v-btn>
    </v-layout>
    <v-layout v-else-if="editing" align-center column>
      <v-col cols="6">
        <v-form ref="form" v-model="isValid">
          <p>Nowe wydarzenie:</p>

          <v-text-field
            v-model="insertedEvent.text"
            prepend-icon="mdi-format-title"
            label="Tytuł"
            :rules="titleRule"
          ></v-text-field>

          <v-menu
            :close-on-content-click="false"
            v-model="menu"
            transition="scale-transition"
            offset-y
            :nudge-right="40"
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                label="Data"
                v-model="eventDate"
                prepend-icon="event"
                readonly
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="eventDate"
              no-title
              scrollable
              color="indigo"
              locale="pl"
              :min="minCalendarDate"
              :max="maxCalendarDate"
            >
            </v-date-picker>
          </v-menu>
        </v-form>
      </v-col>
    </v-layout>
    <v-row v-else>
      <!-- when there is some events -->
      <v-col cols="4">
        <!-- custom events -->
        <calendar-events-list
          :events="customEvents"
          header="Dodane wydarzenia"
          noEvents="Brak dodanych wydarzeń! Kliknij dodaj, by dodać wydarzenia"
        />
      </v-col>
      <v-spacer />
      <v-col cols="4">
        <!-- holidays -->
        <calendar-events-list
          :events="holidayEvents"
          header="Święta"
          noEvents="Brak świąt!"
        />
      </v-col>
    </v-row>

    <!-- buttons -->
    <v-row justify="end" v-if="editing">
      <v-col cols="auto">
        <v-btn color="indigo" large outlined @click="editing = false">
          Anuluj
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="white--text" color="indigo" large @click="addEvent">
          Dodaj
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="auto">
        <v-btn color="green" large @click="editing = true">Dodaj</v-btn>
      </v-col>
      <v-spacer />
      <v-col cols="auto">
        <v-btn color="indigo" large outlined @click="$emit('prev')">
          Wstecz
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="white--text" color="indigo" large @click="$emit('next')">
          Dalej
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CalendarEvent } from "../../models/calendar";
import CalendarEventsList from "../CalendarEventsList.vue";
import moment from "moment";

@Component({
  components: {
    CalendarEventsList
  }
})
export default class InsertEvents extends Vue {
  menu = false;
  isValid = true;
  editing = false;
  titleRule = [(v: unknown) => !!v || "Wprowadź tytuł"];
  insertedEvent: CalendarEvent = this.startEvent;

  addEvent() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();

    if (this.isValid) {
      this.$store.commit(
        "generatedCalendar/addCustomEvent",
        this.insertedEvent
      );

      this.insertedEvent = this.startEvent;
      this.editing = false;
    }
  }

  // calendar range
  get minCalendarDate() {
    const year = this.$store.getters["generatedCalendar/getYear"];

    return year + "-01-01";
  }
  get maxCalendarDate() {
    const year = this.$store.getters["generatedCalendar/getYear"];

    return year + "-12-31";
  }

  get startEvent(): CalendarEvent {
    const year: number = this.$store.getters["generatedCalendar/getYear"];
    const today = moment()
      .hour(0)
      .minute(0)
      .seconds(0);

    if (today.year() == year) {
      return { date: today, text: "" };
    } else {
      return { date: moment([year, today.month(), today.date()]), text: "" };
    }
  }

  // events' lists
  get customEvents() {
    return this.$store.getters["generatedCalendar/getCustomEvents"];
  }
  get holidayEvents() {
    return this.$store.getters["generatedCalendar/getHolidays"];
  }

  // date property
  get eventDate() {
    return this.insertedEvent.date.format("YYYY-MM-DD");
  }
  set eventDate(date) {
    this.insertedEvent.date = moment(date);
  }
}
</script>

<style scoped lang="scss">
.grayed-text {
  color: #777;
}
</style>
