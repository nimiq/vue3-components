import { action } from '@storybook/addon-actions';
import { ref } from 'vue';
import Timer, { TimerThemes } from './Timer.vue';

export default {
    title: 'Timer',
    component: Timer,
    argTypes: {
        startTime: { control: 'number' },
        endTime: { control: 'number' },
        alwaysShowTime: { control: 'boolean' },
        theme: { control: { type: 'select', options: Object.values(TimerThemes) } },
        strokeWidth: { control: 'number' },
        tooltipProps: { control: 'object' },
        maxUnit: { control: { type: 'select', options: [undefined, 'second', 'minute', 'hour', 'day'] } },
    },
};

const Template = (args) => ({
    // Components used in your story `template` are defined in the `components` object
    components: { Timer },
    // The story's `args` need to be mapped into the template through the `setup()` method
    setup() {
        const timerEnded = ref(true);
        const startTime = ref(args.startTime);
        const endTime = ref(args.endTime);

        function startTimer(time) {
            const now = Date.now();
            startTime.value = now;
            endTime.value = now + time;
            timerEnded.value = false;
        }

        // Story args can be spread into the returned object
        return {
            ...args,
            action,
            startTimer,
            timerEnded,
            startTime,
            endTime,
        };
    },
    // Then, the spread values can be accessed directly in the template
    template: `
        <div>
            <div :class="{ 'nq-blue-bg': theme === 'inverse' || theme === 'white' }" style="display: flex; align-items: center; padding: 7rem 3rem 10rem 12rem">
                <Timer :startTime="startTime" :endTime="endTime" :theme="theme" :alwaysShowTime="alwaysShowTime"
                    :tooltipProps="tooltipProps" @end="timerEnded = true" style="margin: 2rem" :maxUnit="maxUnit"/>
                <Timer :startTime="startTime" :endTime="endTime" :theme="theme" :alwaysShowTime="alwaysShowTime"
                    :tooltipProps="tooltipProps" style="width: 10rem; margin: 2rem" :maxUnit="maxUnit"/>
                <Timer :startTime="startTime" :endTime="endTime" :theme="theme" :alwaysShowTime="alwaysShowTime"
                    :tooltipProps="tooltipProps" style="width: 20rem; margin: 2rem" :maxUnit="maxUnit"/>
            </div>
            <div v-if="startTime" style="margin: 1rem 2rem">Timer {{ timerEnded ? 'ended' : 'running' }}</div>
            <div style="display: flex; flex-wrap: wrap; max-width: 95rem;">
                <button class="nq-button" @click="startTimer(15 * 1000)">Start 15s Timer</button>
                <button class="nq-button" @click="startTimer(60 * 1000)">Start 60s Timer</button>
                <button class="nq-button" @click="startTimer(90 * 1000)">Start 90s Timer</button>
                <button class="nq-button" @click="startTimer(3 * 60 * 1000)">Start 3m Timer</button>
                <button class="nq-button" @click="startTimer(15 * 60 * 1000)">Start 15m Timer</button>
                <button class="nq-button" @click="startTimer(60 * 60 * 1000)">Start 1h Timer</button>
                <button class="nq-button" @click="startTimer(2 * 60 * 60 * 1000)">Start 2h Timer</button>
            </div>
        </div>
    `,
});

export const Default = Template.bind({});
Default.args = {
    startTime: 0,
    endTime: 0,
    theme: TimerThemes.NORMAL,
    alwaysShowTime: true,
};
