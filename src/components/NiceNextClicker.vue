<template>
    <div 
        ref="container" 
        :class="[clss, 'container-class']"
        @mouseenter="hover = true"
        @mousemove="mouseMove"
        @mouseleave="hover = false"
    >
        <transition-group 
            name="fade"
            
        >
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" v-show="hover" key="1">
                <path :d="getPath" stroke="transparent" fill="#eeeeee"/>
            </svg>
            <button 
                v-show="hover" 
                :class="buttonClass" 
                :disabled="disabled" 
                @click="$emit('click', $event)"
                key="2"
            >
                <i :class="['mdi', 'fh-10', iconText]"></i>
            </button>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { Orientation } from "../models/orientation";
import TWEEN from "@tweenjs/tween.js";

@Component({})
export default class NiceNextClicker extends Vue {
    @Prop({required: true}) orientation!: Orientation;
    @Prop({required: true}) disabled!: boolean;
    @Prop() clss!: string;

    hover = false;
    qy = 0;
    qx = 0;

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
            bezierPart += this.Qx + ',' + this.Qy;
            endPart += containerWidth + ',' + containerHeight;
        }
        else {
            movePart += '0,0';
            bezierPart += this.Qx + ',' + this.Qy;
            endPart += '0,' + containerHeight;
        }

        return movePart + ' ' + bezierPart + ' ' + endPart;
    }

    get Qy(): number {
        return this.qy;
    }
    set Qy(qy: number) {
        this.qy = qy;
    }
    get Qx(): number {
        return this.qx;
    }
    set Qx(qx: number) {
        this.qx = qx;
    }

  mouseMove(event: MouseEvent) {
    this.Qy = event.clientY;
  }

  // watch
  @Watch('hover')
  onHoverChanged(val: boolean, oldVal: boolean) {
    let containerWidth = 0;
    if (this.$refs.container) {
        containerWidth = (this.$refs.container as Element).clientWidth;
    }   

    let xTo = 0;
    if (val) {
        // show clicker
        xTo = this.orientation == Orientation.Left ? -10 : containerWidth + 10;
    }
    else {
        // hide clicker
        xTo = this.orientation == Orientation.Left ? containerWidth : 0;
    }
    
    function animate(time: number) {
        if (TWEEN.update(time)) {
            requestAnimationFrame(animate)
        }
    }

    requestAnimationFrame(animate);

    new TWEEN.Tween({x: this.Qx})
    .to({x: xTo}, 500)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate((prop) => {
        this.Qx = prop.x;
    })
    .start(TWEEN.now());
  }
}
</script>

<style scoped lang="scss">
.next-button-left, .next-button-right {
    position: relative;
    top: -50%;

    &:disabled {
        color: #cccccc;
    }
}

.next-button-left {
    left: 60%;
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

// cubic-bezier(0.470, 0.000, 0.745, 0.715)

// animations 
.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>