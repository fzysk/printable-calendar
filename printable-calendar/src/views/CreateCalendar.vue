<template>
  <v-layout align-center justify-center row fill-height>
    <v-stepper class="stepper" v-model="currentStep" alt-labels>
        <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1" color="indigo" complete-icon="mdi-check">
                Wybierz rok
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="currentStep > 2" step="2" color="indigo" complete-icon="mdi-check">
                Wstaw wydarzenia
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="currentStep > 3" step="3" color="indigo">
                Wybierz schemat kolorów
            </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
            <v-stepper-content step="1">
                <select-year />
            </v-stepper-content>
            <v-stepper-content step="2">
                <insert-events />
                <v-row justify="end">
                    <v-col cols="auto">
                        <v-btn color="indigo" large outlined @click="currentStep -= 1;">Wstecz</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="white--text" color="indigo" large @click="currentStep += 1;">Dalej</v-btn>
                    </v-col>
                </v-row>
            </v-stepper-content>
            <v-stepper-content step="3">
                <select-colors />
                <v-row justify="end"> 
                    <v-col cols="auto">
                        <v-btn color="indigo" large outlined @click="currentStep -= 1;">Wstecz</v-btn>
                    </v-col>
                    <v-col cols="auto">
                        <v-btn class="white--text" color="indigo" large @click="currentStep += 1;">Dalej</v-btn>
                    </v-col>
                </v-row>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import SelectYear from "../components/CreateCalendar/SelectYear.vue";
import InsertEvents from "../components/CreateCalendar/InsertEvents.vue";
import SelectColors from "../components/CreateCalendar/SelectColors.vue";

@Component({
  components: {
      SelectYear, InsertEvents, SelectColors
  }  
})
export default class CreateCalendar extends Vue {
    currentStep = 1;
}
</script>

<style scoped lang="scss">
.stepper {
    width: 55em;
}
</style>