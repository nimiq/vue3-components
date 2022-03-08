<template>
    <Tooltip class="timer" ref="root$"
        v-bind="{
            preferredPosition: 'bottom right',
            theme: theme === TimerThemes.INVERSE || theme  === TimerThemes.WHITE ? TooltipThemes.INVERSE : TooltipThemes.NORMAL,
            ...tooltipProps,
            styles: {
                width: '18.25rem',
                pointerEvents: 'none',
                ...(tooltipProps ? tooltipProps.styles : undefined),
            },
        }"
        @show="detailsShown = true"
        @hide="detailsShown = false"
        :class="{
            'time-shown': detailsShown || alwaysShowTime,
            'little-time-left': _progress >= .75,
            'inverse-theme': theme === TimerThemes.INVERSE,
            'white-theme': theme === TimerThemes.WHITE,
        }"
    >
        <template #trigger>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">
                <circle ref="time-circle" class="time-circle" cx="50%" cy="50%" :r="radius.currentValue"
                    :stroke-dasharray="`${_timeCircleInfo.length} ${_timeCircleInfo.gap}`"
                    :stroke-dashoffset="_timeCircleInfo.offset"
                    :stroke-width="_timeCircleInfo.strokeWidth"></circle>
                <circle class="filler-circle" cx="50%" cy="50%" :r="radius.currentValue"
                    :stroke-dasharray="`${_fillerCircleInfo.length} ${_fillerCircleInfo.gap}`"
                    :stroke-dashoffset="_fillerCircleInfo.offset"
                    :stroke-width="_fillerCircleInfo.strokeWidth"></circle>

                <transition name="transition-fade">
                    <g v-if="!detailsShown && !alwaysShowTime" class="info-exclamation-icon">
                        <rect x="12" y="9" width="2" height="2" rx="1" />
                        <rect x="12" y="12.5" width="2" height="4.5" rx="1" />
                    </g>
                    <text v-else class="countdown" x="50%" y="50%">
                        {{  _toSimplifiedTime(_timeLeft, false, maxUnit) }}
                    </text>
                </transition>
            </svg>
        </template>
        <template #default>
            <I18n path="This offer expires in {timer}.">
                <template #timer>{{ _toSimplifiedTime(_timeLeft, true, maxUnit) }}</template>
            </I18n>
        </template>
    </Tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from '@vue/runtime-core';

import { Tweenable } from '@nimiq/utils';
import Tooltip, { TooltipThemes } from '../Tooltip/Tooltip.vue';
import I18n from '../../i18n/I18n.vue';
import { loadI18n } from '../../i18n/I18nComposable';

interface CircleInfo {
    length: number;
    lengthWithLineCaps: number;
    gap: number;
    offset: number;
    strokeWidth: number;
}

const TIME_STEPS = [
    { unit: 'minute', factor: 60 },
    { unit: 'hour', factor: 60 },
    { unit: 'day', factor: 24 },
];

function _toSimplifiedTime(millis: number, includeUnit?: true, maxUnit?: string): string;
function _toSimplifiedTime(millis: number, includeUnit: false, maxUnit?: string): number;
function _toSimplifiedTime(millis: number, includeUnit: boolean = true, maxUnit?: string): number | string {
    // find appropriate unit, starting with second
    let resultTime = millis / 1000;
    let resultUnit = 'second';
    for (const { unit, factor } of TIME_STEPS) {
        if (resultTime / factor < 1 || resultUnit === maxUnit) break;
        resultTime /= factor;
        resultUnit = unit;
    }

    resultTime = Math.floor(resultTime);
    if (!includeUnit) {
        return resultTime;
    } else {
        const $t = loadI18n('Timer');

        const i18nTime = {
            get second() { return $t('second'); },
            get seconds() { return $t('seconds'); },
            get minute() { return $t('minute'); },
            get minutes() { return $t('minutes'); },
            get hour() { return $t('hour'); },
            get hours() { return $t('hours'); },
            get day() { return $t('day'); },
            get days() { return $t('days'); },
        };

        resultUnit = i18nTime[`${resultUnit}${resultTime !== 1 ? 's' : ''}` as (keyof typeof i18nTime)];
        return `${resultTime} ${resultUnit}`;
    }
}

const TIMER_REM_FACTOR = 8; // size of 1rem
const TIMER_BASE_SIZE = 3.25 * TIMER_REM_FACTOR;
const TIMER_BASE_RADIUS = TIMER_REM_FACTOR;
const TIMER_RADIUS_GROWTH_FACTOR = 1.5;

export enum TimerEvents {
    END = 'end',
}

export enum TimerThemes {
    NORMAL = 'normal',
    INVERSE = 'inverse',
    WHITE = 'white',
}

export default defineComponent({
    name: 'Timer',
    // extends: I18nMixin,
    props: {
        startTime: Number,
        endTime: Number,
        alwaysShowTime: {
            type: Boolean,
            default: true,
        },
        theme: {
            type: String,
            default: 'normal',
            validator: (value: any) => Object.values(TimerThemes).includes(value),
        },
        strokeWidth: {
            type: Number,
            default: 2,
        },
        tooltipProps: Object,
        maxUnit: {
            type: String,
            required: false,
            validator: (value: any) => [undefined, 'second', 'minute', 'hour', 'day'].includes(value),
        },
    },
    setup(props, context) {
        const root$ = ref<typeof Tooltip | null>(null);

        const timeOffset = ref(0);
        const sampledTime = ref(0);
        const detailsShown = ref(false);
        // While the radius r of the circle and the values stroke-dasharray, stroke-dashoffset and stroke-width that depend
        // on the radius can be transitioned via css, the behavior on value update during an ongoing transition is not
        // consistent (e.g. time update while animating on user hover or quick hover and unhover). Therefore animate via JS.
        const radius: Tweenable = new Tweenable(detailsShown.value || props.alwaysShowTime
            ? TIMER_BASE_RADIUS * TIMER_RADIUS_GROWTH_FACTOR
            : TIMER_BASE_RADIUS);
        const fullCircleLength = ref(2 * Math.PI * radius.currentValue);
        const timeoutId = ref<number | null>(null);
        const updateTimeoutId = ref<number | null>(null);
        const requestAnimationFrameId = ref<number | null>(null);
        const size = ref(TIMER_BASE_SIZE);

        function synchronize(referenceTime: number) {
            timeOffset.value = referenceTime - Date.now();
        }

        context.expose({ synchronize });

        onMounted(() => {
            requestAnimationFrame(() => size.value = root$.value!.offsetWidth); // in rAF to avoid forced reflow
            // this._onResize = this._onResize.bind(this); // TODO: do we still need this?
            window.addEventListener('resize', _onResize);
        });

        onUnmounted(() => {
            if (timeoutId.value) clearTimeout(timeoutId.value);
            if (updateTimeoutId.value) clearTimeout(updateTimeoutId.value);
            if (requestAnimationFrameId.value) cancelAnimationFrame(requestAnimationFrameId.value);
            window.removeEventListener('resize', _onResize);
        });

        const _totalTime = computed(() => {
            if (props.startTime === undefined || props.endTime === undefined) {
                return 0;
            } else {
                return Math.max(0, props.endTime - props.startTime);
            }
        });

        const _timeLeft = computed(() => {
            if (props.startTime === undefined || props.endTime === undefined) {
                return 0;
            } else {
                return Math.max(0, Math.min(_totalTime.value, props.endTime - sampledTime.value));
            }
        });

        const _progress = computed(() => {
            if (props.startTime === undefined || props.endTime === undefined || _totalTime.value === 0) {
                return 0;
            } else {
                return 1 - _timeLeft.value / _totalTime.value;
            }
        });

        const _timeCircleInfo = computed<CircleInfo>(() => {
            // Have a max length to make it more recognizable that this is a timer by never rendering a full circle.
            // The rounded stroke ending rendered with radius strokeWidth/2 does not count towards the stroke length,
            // therefore to get the desired gap of 1.5 strokeWidths, we use 2.5 strokeWidths.
            const maxLength = fullCircleLength.value - 2.5 * props.strokeWidth;
            const length = Math.min(maxLength, (1 - _progress.value) * fullCircleLength.value);
            const lengthWithLineCaps = length + props.strokeWidth; // add line caps with strokeWidth/2 radius
            const gap = fullCircleLength.value - length;
            // The path grows clockwise starting on the right side. Offset by 90 degrees and gap to let path start with gap
            // and end on top.
            const offset = fullCircleLength.value / 4 - gap;
            return { length, lengthWithLineCaps, gap, offset, strokeWidth: props.strokeWidth };
        });

        const _fillerCircleInfo = computed<CircleInfo>(() => {
            // Filler circle should be rendered in the gap left by the time circle with a margin of strokeWidth. If there
            // is not enough space, compensate by reducing the filler circle stroke width.
            const availableSpace = fullCircleLength.value - _timeCircleInfo.value.lengthWithLineCaps - 2 * props.strokeWidth;
            const lengthWithLineCaps = Math.max(0, availableSpace);
            const strokeWidth = Math.min(props.strokeWidth, lengthWithLineCaps);
            const length = Math.max(0, lengthWithLineCaps - strokeWidth); // subtract rounded line caps
            const gap = fullCircleLength.value - length;
            const offset = fullCircleLength.value / 4 // rotate by 90 degrees
                - props.strokeWidth / 2 // skip rounded line cap of time circle
                - props.strokeWidth // margin
                - strokeWidth / 2; // account for our own line cap
            return { length, lengthWithLineCaps, gap, offset, strokeWidth };
        });

        function _calculateUpdateInterval(): number {
            // Not a getter / computed prop to avoid unnecessary updates when not needed.
            const scaleFactor = size.value / TIMER_BASE_SIZE;
            const circleLengthPixels = fullCircleLength.value * scaleFactor;
            const steps = circleLengthPixels * 3; // update every .33 pixel change for smooth transitions
            const minInterval = 1000 / 60; // up to 60 fps
            // Constrain interval such that we don't skip time steps in the countdown for the respective time unit.
            const timeLeft = _timeLeft.value;
            const totalTime = _totalTime.value;
            const updatesPerTimeStep = 2; // multiple updates per time step to avoid skipping a step by a delayed interval
            let timeStep = 1000; // starting with seconds
            let maxInterval = timeStep / updatesPerTimeStep;
            for (const { factor } of TIME_STEPS) {
                const nextTimeStep = timeStep * factor;
                const nextMaxInterval = nextTimeStep / updatesPerTimeStep;
                const nextInterval = Math.min(nextMaxInterval, Math.max(minInterval, totalTime / steps));
                if ((timeLeft - nextInterval) / nextTimeStep < 1) {
                    // If the time left after nextInterval can't be expressed in nextTimeStep as a value >=1, stop. We check
                    // for the time after the next interval to avoid jumping for example from 70s (displayed as 1 minute)
                    // directly to 50s if the interval is 20s. Note that the behavior here resembles the one in
                    // _toSimplifiedTime.
                    if (timeLeft / nextTimeStep > 1) {
                        // If the value before the interval is still >1 in the next time unit still allow a larger jump than
                        // at the smaller time unit but set the maxInterval such that we jump no further than where the
                        // switch to the smaller unit happens, for example jump from 70s to 60s if the interval is 20s.
                        maxInterval = timeLeft - nextTimeStep;
                    }
                    break;
                }
                timeStep = nextTimeStep;
                maxInterval = nextMaxInterval;
            }

            return Math.min(maxInterval, Math.max(minInterval, _totalTime.value / steps));
        }

        watch(detailsShown, _setRadius, { immediate: true });
        watch(() => props.alwaysShowTime, _setRadius);

        function _setRadius() {
            radius.tweenTo(detailsShown.value || props.alwaysShowTime
                ? TIMER_RADIUS_GROWTH_FACTOR * TIMER_BASE_RADIUS
                : TIMER_BASE_RADIUS, 300);
            _rerender();
        }

        watch(() => props.startTime, _setTimer, { immediate: true });
        watch(() => props.endTime, _setTimer);
        watch(timeOffset, _setTimer);

        function _setTimer() {
            sampledTime.value = Date.now() + timeOffset.value;
            if (timeoutId.value) clearTimeout(timeoutId.value);
            if (props.startTime && props.endTime) {
                timeoutId.value = window.setTimeout(() => context.emit(TimerEvents.END, props.endTime),
                    props.endTime - sampledTime.value);
                _rerender();
            }
        }

        function _rerender() {
            sampledTime.value = Date.now() + timeOffset.value;
            fullCircleLength.value = 2 * Math.PI * radius.currentValue;

            if (_timeLeft.value === 0 && radius.finished) return;

            if (updateTimeoutId.value) clearTimeout(updateTimeoutId.value);
            if (requestAnimationFrameId.value) cancelAnimationFrame(requestAnimationFrameId.value);

            if (!radius.finished) {
                // animate radius with high frame rate
                requestAnimationFrameId.value = requestAnimationFrame(() => _rerender());
            } else {
                // update with low frame rate
                updateTimeoutId.value = window.setTimeout(() => _rerender(), _calculateUpdateInterval());
            }
        }

        function _onResize() {
            if (root$.value) size.value = root$.value.offsetWidth;
        }

        return {
            _toSimplifiedTime,

            TooltipThemes,
            TimerThemes,

            root$,

            detailsShown,
            radius,

            _timeLeft,
            _progress,
            _timeCircleInfo,
            _fillerCircleInfo,
        };
    },
    components: { Tooltip, I18n },
})
</script>

<style scoped>
    .timer {
        width: 3.25rem;
        position: relative;
    }

    /* for setting height automatically depending on width */
    .timer::before {
        content: '';
        padding-top: 100%;
        display: block;
    }

    .tooltip:v-deep(.trigger),
    svg {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    svg {
        fill: none;
        stroke-linecap: round;
    }

    circle {
        stroke: var(--nimiq-blue);
        transition: stroke .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease);
    }

    .inverse-theme circle,
    .white-theme circle {
        stroke: white;
    }

    .filler-circle {
        opacity: .2;
    }

    .time-circle {
        opacity: .3;
    }

    .time-shown .time-circle {
        stroke: var(--nimiq-light-blue);
        opacity: 1;
    }

    .inverse-theme.time-shown:not(.little-time-left) .time-circle {
        stroke: var(--nimiq-light-blue-on-dark, var(--nimiq-light-blue));
    }

    .white-theme.time-shown:not(.little-time-left) .time-circle {
        stroke: rgba(255, 255, 255, 0.4);
    }

    /* .inverse-theme.time-shown .filler-circle,
    .white-theme.time-shown .filler-circle {
        opacity: 0;
    } */

    .little-time-left .time-circle {
        stroke: var(--nimiq-orange);
        opacity: 1;
    }

    .info-exclamation-icon {
        fill: var(--nimiq-blue);
        opacity: .4;
        transform-origin: center;
        transition: fill .3s var(--nimiq-ease), opacity .3s var(--nimiq-ease), transform .3s var(--nimiq-ease);
    }

    .inverse-theme .info-exclamation-icon,
    .white-theme .info-exclamation-icon {
        fill: white;
    }

    .little-time-left .info-exclamation-icon {
        fill: var(--nimiq-orange);
        opacity: 1;
        transform: rotate(180deg); /* turn info icon into an exclamation mark */
    }

    .countdown {
        font-size: 12px; /* relative to svg viewBox */
        font-weight: bold;
        text-anchor: middle;
        dominant-baseline: central;
        fill: var(--nimiq-light-blue);
        transition: fill .3s var(--nimiq-ease);
    }

    .inverse-theme .countdown {
        fill: var(--nimiq-light-blue-on-dark, var(--nimiq-light-blue));
    }

    .white-theme .countdown {
        fill: rgba(255, 255, 255, 0.6);
    }

    .little-time-left .countdown {
        fill: var(--nimiq-orange);
    }

    .transition-fade-enter-active,
    .transition-fade-leave-active {
        transition: opacity .3s var(--nimiq-ease);
    }

    .transition-fade-enter,
    .transition-fade-leave-to {
        opacity: 0 !important;
    }
</style>
