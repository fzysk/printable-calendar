<template>
  <div class="event-list">
    <v-subheader>{{ header }}</v-subheader>
    <v-list
      v-if="events && events.length"
      two-line
      style="max-height: 55vh"
      class="overflow-y-auto"
    >
      <v-list-item-group
        multiple
        color="indigo"
        v-model="selectedEvents"
        @change="changeSelectedEvents"
      >
        <v-list-item v-for="(event, i) in events" :key="i">
          <v-list-item-content>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on" v-text="event.text" />
              </template>
              <v-list-item-title v-text="event.text" />
            </v-tooltip>
            <v-list-item-subtitle v-text="event.date.format('YYYY-MM-DD')" />
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-alert v-else type="warning" v-html="noEvents" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { CalendarEvent } from "../models/calendar";

@Component
export default class CalendarEventsList extends Vue {
  @Prop() noEvents!: string;
  @Prop({ required: true }) header!: string;
  @Prop({ required: true }) events!: CalendarEvent[];

  selectedEvents: CalendarEvent[] = [];

  changeSelectedEvents(e: number[]) {
    const selected: CalendarEvent[] = e.map(x => this.events[x]);
    this.$emit("changed", selected);
  }
}
</script>

<style></style>
