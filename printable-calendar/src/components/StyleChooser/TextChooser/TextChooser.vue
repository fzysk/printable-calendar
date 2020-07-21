<template>
  <div>
    <v-col cols="auto">
      <v-row>Czcionka:</v-row>
      <v-row align-content="center">
        <v-col cols="7">
          <v-select
            :items="availableFonts"
            item-text="text"
            item-value="value"
            placeholder="Styl"
            outlined
          >
            <template v-slot:selection="{ item }">
              <div
                class="v-select__selection v-select__selection--comma"
                :style="{ 'font-family': item.value }"
              >
                {{ item.text }}
              </div>
            </template>
            <template v-slot:item="{ item }">
              <span :style="{ 'font-family': item.value }">{{ item.text }}</span>
            </template>
          </v-select>
        </v-col>
        <!-- <v-spacer /> -->
        <v-col cols="5">
          <v-select placeholder="Rozmiar" outlined></v-select>
        </v-col>
      </v-row>
    </v-col>
    <v-spacer />
    <v-col cols="auto">
      <v-row>Styl:</v-row>
      <v-row align-content="center">
        <v-col cols="5">
          <v-btn-toggle v-model="aligns" mandatory>
            <v-btn>
              <v-icon>mdi-format-align-left</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-format-align-center</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-format-align-right</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
        <v-spacer />
        <v-col cols="5">
          <v-btn-toggle v-model="decorator" multiple>
            <v-btn>
              <v-icon>mdi-format-bold</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-format-italic</v-icon>
            </v-btn>
            <v-btn>
              <v-icon>mdi-format-underline</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </v-col>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { TextSettings } from "../../../models/colors";
import { knownFonts } from "../../../models/fonts";

const TEXT_BOLDED = 0;
const TEXT_ITALIC = 1;
const TEXT_UNDERLINED = 2;

@Component({})
export default class TextChooser extends Vue {
  @Prop() defaultText!: TextSettings;

  // getters
  get aligns() {
    return this.defaultText?.placement;
  }
  set aligns(align) {
    if (this.defaultText) {
      this.defaultText.placement = align;
      this.$emit("change", this.defaultText);
    }
  }

  get availableFonts() {
    return knownFonts.map(f => {
      return {
        text: f.toFriendlyName(),
        value: f.toCssEntry()
      };
    });
  }

  get decorator() {
    const result = [];

    if (this.defaultText?.bold) {
      result.push(TEXT_BOLDED);
    }
    if (this.defaultText?.italic) {
      result.push(TEXT_ITALIC);
    }
    if (this.defaultText?.underline) {
      result.push(TEXT_UNDERLINED);
    }

    return result;
  }
  set decorator(decorator) {
    this.defaultText.bold = decorator.indexOf(TEXT_BOLDED) > -1;
    this.defaultText.italic = decorator.indexOf(TEXT_ITALIC) > -1;
    this.defaultText.underline = decorator.indexOf(TEXT_UNDERLINED) > -1;

    this.$emit("change", this.defaultText);
  }
}
</script>

<style scoped lang="scss"></style>
