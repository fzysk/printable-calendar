<template>
    <div 
        ref="container" 
        :class="[clss, 'container-class']"
        @mouseenter="debounceHoverOn()"
        @mousemove="mouseMove"
        @mouseleave="debounceHoverOff()"
    >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" v-show="hover">
            <path :d="getPath" stroke="transparent" fill="#eeeeee"/>
        </svg>
        <button 
            v-show="hover" 
            :class="buttonClass" 
            :disabled="disabled" 
            @click="$emit('click', $event)"
        >
            <i :class="['mdi', 'fh-10', iconText]"></i>
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Orientation } from "../models/orientation"

let timeout = 0;

@Component({})
export default class NiceNextClicker extends Vue {
    @Prop({required: true}) orientation!: Orientation;
    @Prop({required: true}) disabled!: boolean;
    @Prop() clss!: string;

    hover = false;
    qy = 0;

    get iconText() : string {
        return this.orientation === Orientation.Left ? 
            'mdi-arrow-left-bold' : 'mdi-arrow-right-bold';
    }
    get buttonClass() : string {
        return this.orientation === Orientation.Left ?
            'next-button-left' : 'next-button-right';
    }

    get getPath() : string {
        let containerHeight = 0;
        let containerWidth = 0;

        if (this.$refs.container) {
            containerHeight = (this.$refs.container as Element).clientHeight;
            containerWidth = (this.$refs.container as Element).clientWidth;
        }

        let movePart = 'M';
        let bezierPart = 'Q';
        let endPart = ''
        if (this.orientation == Orientation.Left) {
            movePart += containerWidth + ',0';
            bezierPart += '-10,' + this.Qy;
            endPart += containerWidth + ',' + containerHeight;
        }
        else {
            movePart += '0,0';
            bezierPart += (containerWidth + 10) + ',' + this.Qy;
            endPart += '0,' + containerHeight;
        }

        return movePart + ' ' + bezierPart + ' ' + endPart;
    }

    get Qy() : number {
        return this.qy;
    }
    set Qy(qy: number) {
        this.qy = qy;
    }

  mouseMove(event: MouseEvent) {
    this.Qy = event.clientY;
  }

// debounce methods
  debounceHover(func: Function) {
    clearTimeout(timeout);
    timeout = setTimeout(func, 100);
  }
  debounceHoverOn() {
    this.debounceHover(() => {
      this.hover = true;
    });
  }
  debounceHoverOff() {
    this.debounceHover(() => {
      this.hover = false;
    });
  }
}
</script>

<style scoped lang="scss">
.next-button-left, .next-button-right {
    position: relative;
    top: -48%;

    &:disabled {
        color: #cccccc;
    }
}

.next-button-left {
    left: 75%;
}

.next-button-right {
    left: 15%;
}

.fh-10 {
    font-size: 1.5rem;
}

.container-class {
    position: relative;
}
</style>