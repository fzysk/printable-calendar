<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class CalendarMonth extends Vue {
  @Prop() month!: number;
}
</script>

<style scoped lang="scss">

</style>