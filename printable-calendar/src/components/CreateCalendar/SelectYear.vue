<template>
  <div class="select-year">
    <v-form ref="form" v-model="isValid">
      <v-row align="baseline">
        <v-spacer />
        <v-col cols="4">
          Wybierz rok kalendarza:
        </v-col>
        <v-spacer />
        <v-col cols="4">
          <v-select v-model="selectedYear" :items="yearsArray"
            placeholder="Rok kalendarza" color="indigo" 
            :rules="validationRules" outlined single-line>
          </v-select>
        </v-col>
        <v-spacer />
      </v-row>
      <v-row justify="end">
        <v-col cols="auto">
          <v-btn class="white--text" color="indigo" large @click="onClick">Dalej</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { VSelect } from 'vuetify/lib';
import { CalendarCreatorService } from '../../services/calendarCreator.service';

const currentYear = new Date().getFullYear();

@Component
export default class SelectYear extends Vue {
  yearsArray: number[] = [...Array(25).keys()].map((i) => currentYear + i);
  validationRules = [(v : any) => !!v || "Brak wybranego roku kalendarza"];
  selectedYear = 0;
  isValid = false;

  onClick() {
    this.$refs.form.validate();
    
    if (this.isValid) {
      // check if we need to generate calendar once again
      if (!this.$store.state.generatedCalendar.calendar || 
          this.$store.state.generatedCalendar.calendar.year != this.selectedYear ) {
        this.$store.commit('generatedCalendar/makeCalendar', this.selectedYear);
      }

      this.$emit("next");
    }
  }
}
</script>

<style scoped lang="scss">

</style>
