<template>
    <div class="carousel" :class="{ disabled }" ref="root$">
        <div v-for="(entry, index) in entries" :ref="(el) => { refs$[entry] = el as HTMLElement }" :key="index"
            :class="{ selected: effectiveSelected === entry }"
            @click="!disabled && updateSelection(entry)"
            @focusin="!disabled && updateSelection(entry)">
            <slot :name="entry"></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { Tweenable } from '@nimiq/utils';

export enum CarouselEvent {
    SELECT = 'select',
}

export default defineComponent({
    name: 'Carousel',
    emits: Object.values(CarouselEvent),
    props: {
        entries: {
            type: Array as () => string[],
            default: () => [],
            validator: (entries: any) => Array.isArray(entries)
                && entries.length > 0
                && !entries.some((entry) => typeof entry !== 'string'),
        },
        selected: String,
        entryMargin: {
            type: Number,
            default: 16,
        },
        animationDuration: { // in ms
            type: Number,
            default: 1000,
        },
        hideBackgroundEntries: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, context) {
        const root$ = ref<HTMLDivElement | null>(null);
        // The entry refs are arrays with a single element because of v-for
        const refs$ = ref<{ [ref: string]: HTMLElement }>({});

        const effectiveSelected = ref('');
        const requestAnimationFrameId = ref<number | null>(null);

        const radius: Tweenable = new Tweenable();
        const rotations: Map<string, Tweenable> = new Map(); // map entry -> rotation

        const hasDummyPosition = computed(() =>{
            // add dummy to avoid that second entry is hidden exactly behind selected item on opposite side of circle.
            return props.entries.length <= 2;
        });

        const totalPositionCount = computed(() => {
            return props.entries.length + (hasDummyPosition.value ? 1 : 0);
        });

        onMounted(async () => {
            // this.onKeydown = this.onKeydown.bind(this); // TODO: is this still necessary?
            document.addEventListener('keydown', onKeydown);
            // trigger these manually instead of via immediate watcher to avoid animating on first render
            await updateDimensions(false);
            updateSelection(props.selected);
            updateRotations(false);
        });

        onUnmounted(() => {
            document.removeEventListener('keydown', onKeydown);
            if (requestAnimationFrameId.value === null) return;
            cancelAnimationFrame(requestAnimationFrameId.value);
        });

        watch(() => props.entryMargin, updateDimensions);
        async function updateDimensions(newWatcherValueOrTween: number | boolean = true) {
            const tween = typeof newWatcherValueOrTween === 'boolean' ? newWatcherValueOrTween : true;
            await nextTick(); // let Vue render new entries
            let largestHeight = 0;
            let largestMinDistance = 0;
            for (let i = 0; i < props.entries.length; ++i) {
                const el1 = refs$.value[props.entries[i]];
                const el2 = refs$.value[props.entries[(i + 1) % props.entries.length]];
                largestHeight = Math.max(largestHeight, el1.offsetHeight);
                const minDistance = el1.offsetWidth / 2 + el2.offsetWidth / 2 + props.entryMargin;
                largestMinDistance = Math.max(largestMinDistance, minDistance);
            }
            // Choose radius big enough such that two items can be rendered side by side without overlapping.
            // Calculate on a right triangle formed by radius, half distance and perpendicular from center point
            // to distance line.
            const centerAngle = 2 * Math.PI / totalPositionCount.value / 2; // angle at circle center point
            const newRadius = (largestMinDistance / 2) / Math.sin(centerAngle);
            radius.tweenTo(newRadius, tween ? props.animationDuration : 0);
            if (root$.value) root$.value.style.minHeight = `${largestHeight}px`;
            rerender();
        }

        watch(() => props.entries, onEntriesChange);
        async function onEntriesChange() {
            await updateDimensions();
            updateSelection(effectiveSelected.value); // re-validate
            updateRotations();
        }

        watch(() => props.selected, updateSelection);
        function updateSelection(newSelection: string | undefined) {
            if (newSelection === undefined) return;

            const oldSelection = effectiveSelected.value;
            const isNewSelectionValid = props.entries.includes(newSelection);
            const isOldSelectionValid = props.entries.includes(oldSelection);

            if (isNewSelectionValid) {
                effectiveSelected.value = newSelection;
            } else if (!isOldSelectionValid) {
                effectiveSelected.value = props.entries[0];
            } // else keep the old selection

            if (effectiveSelected.value !== oldSelection) {
                context.emit(CarouselEvent.SELECT, effectiveSelected.value);
            }
        }

        watch(effectiveSelected, updateRotations);
        watch(() => props.disabled, updateRotations);
        function updateRotations(newWatcherValueOrTween: string | boolean = true, previousWatcherValue?: string | boolean) {
            const tween = typeof newWatcherValueOrTween === 'boolean' && typeof previousWatcherValue === 'undefined'
                ? newWatcherValueOrTween // specified whether to tween
                : true; // did not specify whether to tween or method was called as a watcher (default to true)
            // clean up removed entries

            for (const entry of rotations.keys()) {
                if (props.entries.includes(entry)) continue;
                rotations.delete(entry);
            }
            // update rotations
            for (const entry of props.entries) {
                const rotation = rotations.get(entry) || new Tweenable();
                const tweenTime = tween ? props.animationDuration : 0;
                rotation.tweenTo(calculateTargetRotation(entry, rotation.currentValue), tweenTime);
                rotations.set(entry, rotation);
            }
            rerender();
        }

        /**
         * @param entry
         * @param currentRotation - Rotation in radians
         * @private
         */
        function calculateTargetRotation(entry: string, currentRotation: number): number {
            if (props.disabled && entry !== effectiveSelected.value) {
                // hide not selected entries at other end of circle
                return currentRotation + calculateRotationInClosestDirection(currentRotation, Math.PI);
            }
            const stepSize = 2 * Math.PI / totalPositionCount.value;
            const entryIndex = props.entries.indexOf(entry);
            const selectedIndex = props.entries.indexOf(effectiveSelected.value);
            let offset = entryIndex - selectedIndex;
            if (hasDummyPosition.value && offset > totalPositionCount.value / 2) {
                // skip dummy position
                offset += 1;
            }
            return currentRotation + calculateRotationInClosestDirection(currentRotation, offset * stepSize);
        }

        // @Watch('hideBackgroundEntries')
        watch(() => props.hideBackgroundEntries, rerender);
        function rerender() {
            if (requestAnimationFrameId.value !== null) return;
            requestAnimationFrameId.value = requestAnimationFrame(() => {
                const zCoordinatesForEntries: Array<[string, number]> = [];
                let finished = radius.finished;
                for (const [entry, rotation] of rotations) {
                    const currentRotation = rotation.currentValue;
                    const currentRadius = radius.currentValue;
                    const x = Math.sin(currentRotation) * currentRadius;
                    const z = Math.cos(currentRotation) * currentRadius - currentRadius;
                    const el = refs$.value[entry];
                    el.style.transform = `translate3d(calc(${x}px - 50%),-50%,${z}px)`;
                    el.style.display = shouldHide(entry) ? 'none' : '';
                    zCoordinatesForEntries.push([entry, z]);
                    finished = finished && rotation.finished;
                }

                // Note that instead of setting z-index manually, we could use transform-style: preserve-3d to order
                // automatically by z coordinate. But unfortunately, this makes the entries not clickable anymore.
                zCoordinatesForEntries.sort(([, z1], [, z2]) => z1 - z2);
                for (let i = 0; i < zCoordinatesForEntries.length; ++i) {
                    const el = refs$.value[zCoordinatesForEntries[i][0]];
                    el.style.zIndex = `${i}`;
                }

                requestAnimationFrameId.value = null;
                if (!finished) rerender();
            });
        }

        function calculateRotationInClosestDirection(fromAngle: number, toAngle: number): number {
            // angle offset modulo full rotations
            const rotation = (toAngle - fromAngle) % (2 * Math.PI);
            // determine rotation in opposite direction (subtracting or adding a full circle depending on direction (sign))
            const rotationOppositeDirection = rotation - Math.sign(rotation) * 2 * Math.PI;
            if (Math.abs(Math.abs(rotation) - Math.abs(rotationOppositeDirection)) < 1e-10) {
                // in case of ambiguity chose a default direction
                return Math.min(rotation, rotationOppositeDirection);
            } else if (Math.abs(rotation) < Math.abs(rotationOppositeDirection)) {
                return rotation;
            } else {
                return rotationOppositeDirection;
            }
        }

        function shouldHide(entry: string): boolean {
            const rotation = rotations.get(entry);

            if (!rotation || (!props.disabled && !props.hideBackgroundEntries)) return false;

            const absoluteRotation = Math.abs(calculateRotationInClosestDirection(0, rotation.currentValue));

            if (props.disabled) {
                // Hide disabled elements once they reached the opposite end of the circle, also to avoid that they are
                // still reachable via tab. While they're animating to get there, display them even when they're in the
                // back part of the circle.
                return Math.abs(absoluteRotation - Math.PI) < 1e-10;
            } else if (props.hideBackgroundEntries) {
                // Hide entries in the back part of the circle as these will not be visible behind the front entries
                const stepSize = 2 * Math.PI / totalPositionCount.value;
                const threshold = Math.PI / 2 + stepSize / (totalPositionCount.value - 1); // just a heuristic but works ok
                return absoluteRotation > threshold;
            }
            return false; // TODO/FIXME: the function needs to always return a boolean, so added this but not sure if it's correct
        }

        function onKeydown(event: KeyboardEvent) {
            const target = event.target as HTMLElement;
            if (props.disabled
                || target.tagName === 'INPUT'
                || target.tagName === 'TEXTAREA'
                || rotations.values().next().value.progress < .5 // block if previous change not animated far enough
            ) return;
            const currentIndex = props.entries.indexOf(effectiveSelected.value);
            let newIndex;
            if (event.key === 'ArrowLeft') {
                newIndex = (currentIndex - 1 + props.entries.length) % props.entries.length;
            } else if (event.key === 'ArrowRight') {
                newIndex = (currentIndex + 1) % props.entries.length;
            } else {
                return;
            }
            updateSelection(props.entries[newIndex]);
        }

        return {
            root$,
            refs$,
            effectiveSelected,
            updateSelection,
        };
    }
})
</script>

<style scoped>
    .carousel {
        position: relative;
        padding: 4rem;
        box-sizing: content-box;
        perspective: 1500px;
        /* perspective-origin: center 150%; */ /* useful for debugging */
    }

    .carousel > * {
        position: absolute;
        left: 50%;
        top: 50%;
    }

    .carousel:not(.disabled) > :not(.selected) {
        cursor: pointer;
    }

    .carousel > :not(.selected):deep(*) {
        pointer-events: none !important;
    }
</style>
