<template>
  <div class="insertEvents">
    <v-layout v-if="!customEvents.length && !editing" align-center column>
      <!-- when there are none events -->
      <br />
      <span class="grayed-text">Wstaw własne wydarzenia!</span>
      <span class="grayed-text">
        To doskonały moment na personalizację swojego kalendarza
      </span>
      <span class="grayed-text">
        Jeżeli nie chcesz tego robić, po prostu przejdź dalej
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
          @changed="deleteCustomEvents"
          header="Dodane wydarzenia"
          noEvents="Brak dodanych wydarzeń! Kliknij <i>dodaj</i>, by dodać wydarzenia"
        />
      </v-col>
      <v-spacer />
      <v-col cols="4">
        <!-- non-holiday events -->
        <calendar-events-list
          :events="nonHolidayEvents"
          @changed="deleteNonHolidays"
          header="Inne święta"
          noEvents="Brak innych świąt!"
        />
      </v-col>
      <v-spacer />
      <v-col cols="4">
        <!-- holidays -->
        <calendar-events-list
          :events="holidayEvents"
          @changed="deleteHolidays"
          header="Święta"
          noEvents="Brak świąt!"
        />
      </v-col>
    </v-row>

    <!-- buttons -->
    <v-row justify="end" v-if="editing">
      <v-col cols="auto">
        <v-btn color="indigo" large outlined @click="cancelAdding">
          Anuluj
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          class="white--text"
          color="indigo"
          large
          @keyup.enter="addEvent"
          @click="addEvent"
        >
          Dodaj
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="auto" v-if="customEvents.length">
        <v-btn color="green" large @click="editing = true">Dodaj</v-btn>
      </v-col>
      <v-col cols="auto" v-if="customEvents.length">
        <v-dialog v-model="modal" width="48%">
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              color="red darken-1"
              large
              :disabled="deleteBtnDisabled"
            >
              Usuń
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline">
              Jesteś pewien, że chcesz usunąć to/te wydarzenia?
            </v-card-title>
            <v-card-text>Tej akcji nie jesteś w stanie cofnąć.</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="modal = false">Anuluj</v-btn>
              <v-btn color="red darken-1" text @click="deleteEvents">
                Usuń
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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

const undefinedDate = moment([1970, 1, 1]);

@Component({
  components: {
    CalendarEventsList
  }
})
export default class InsertEvents extends Vue {
  modal = false;
  menu = false;
  isValid = true;
  editing = false;
  titleRule = [(v: unknown) => !!v || "Wprowadź tytuł"];
  insertedEvent: CalendarEvent = { date: undefinedDate, text: "" };
  eventsToDelete: {
    customEvents: CalendarEvent[];
    nonHolidays: CalendarEvent[];
    holidays: CalendarEvent[];
  } = { customEvents: [], nonHolidays: [], holidays: [] };

  addEvent() {
    (this.$refs.form as Vue & { validate: () => boolean }).validate();

    if (this.isValid) {
      this.$store.commit(
        "generatedCalendar/addCustomEvent",
        this.insertedEvent
      );

      this.$nextTick(this.cancelAdding);
    }
  }

  deleteCustomEvents(e: CalendarEvent[]) {
    if (e) {
      this.eventsToDelete.customEvents.push(...e);
    }
  }
  deleteNonHolidays(e: CalendarEvent[]) {
    if (e) {
      this.eventsToDelete.nonHolidays.push(...e);
    }
  }
  deleteHolidays(e: CalendarEvent[]) {
    if (e) {
      this.eventsToDelete.holidays.push(...e);
    }
  }

  deleteEvents() {
    this.$store.commit(
      "generatedCalendar/deleteCustomEvents",
      this.eventsToDelete.customEvents
    );
    this.$store.commit(
      "generatedCalendar/deleteNonHolidays",
      this.eventsToDelete.nonHolidays
    );
    this.$store.commit(
      "generatedCalendar/deleteHolidays",
      this.eventsToDelete.holidays
    );

    this.eventsToDelete.customEvents = [];
    this.eventsToDelete.nonHolidays = [];
    this.eventsToDelete.holidays = [];

    this.modal = false;
  }

  cancelAdding() {
    this.insertedEvent = { date: undefinedDate, text: "" };
    this.editing = false;
  }

  // delete button disabled
  get deleteBtnDisabled() {
    return this.eventsToDelete.customEvents.length == 0 &&
      this.eventsToDelete.nonHolidays.length == 0 &&
      this.eventsToDelete.holidays.length == 0;
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

  // events' lists
  get customEvents() {
    return this.$store.getters["generatedCalendar/getCustomEvents"];
  }
  get nonHolidayEvents() {
    return this.$store.getters["generatedCalendar/getNonHolidayEvents"];
  }
  get holidayEvents() {
    return this.$store.getters["generatedCalendar/getHolidays"];
  }

  // date property
  get eventDate() {
    if (this.insertedEvent.date.isSame(undefinedDate)) {
      const today = moment()
        .hour(0)
        .minute(0)
        .second(0);

      this.insertedEvent.date = moment([
        this.$store.getters["generatedCalendar/getYear"],
        today.month(),
        today.date()
      ]);
    }

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
