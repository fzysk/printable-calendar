<template>
  <v-layout align-center justify-center row fill-height>
    <v-stepper class="stepper" v-model="currentStep" alt-labels>
        <v-stepper-header>
            <v-stepper-step :complete="currentStep > 1" step="1">
                Wybierz rok
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="currentStep > 2" step="2">
                Wstaw wydarzenia
            </v-stepper-step>
            <v-divider />
            <v-stepper-step :complete="currentStep > 3" step="3">
                Wybierz schemat kolorów
            </v-stepper-step>
        </v-stepper-header>
            <v-stepper-content :step="currentStep">
                <router-view />
                <v-layout justify-end>
                    <v-btn :to="paths[currentStep - 1]" @click="currentStep += 1;">Dalej</v-btn>
                </v-layout>
            </v-stepper-content>
    </v-stepper>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class CreateCalendar extends Vue {
    currentStep = 1;
    paths = [
        "insert-events",
        "select-colors",
        "/show-calendar"
    ];
}
</script>

<style scoped lang="scss">
.stepper {
    width: 50em;
}
</style>