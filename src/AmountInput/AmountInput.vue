<template>
    <form class="amount-input" @submit.prevent>
        <input type="text" inputmode="decimal" class="nq-input"
            :placeholder="placeholder"
            :value="liveValue" @input="onInput"
            v-bind="$attrs"
            ref="refInput">
    </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
    props: {
        modelValue: Number,
        max: {
            type: Number,
            required: false,
        },
        placeholder: {
            type: String,
            default: '0',
        },
        decimals: {
            type: Number,
            default: 5,
        },
        preserveSign: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, context) {
        const liveValue = ref('');
        const lastEmittedValue = ref(0);
        const valueInUnits = ref(0);

        // Refs
        const refInput = ref<HTMLInputElement | null>(null);

        function formatValue(val: string) {
            const regExp = new RegExp(`([-+])?(\\d*)(\\.\\d{0,${props.decimals}})?`, 'g'); // Backslashes are escaped
            const regExpResult = regExp.exec(val)!;
            if (regExpResult[1] || regExpResult[2] || regExpResult[3]) {
                // regExpResult[1] contains the sign
                // regExpResult[2] contains the whole integers
                // regExpResult[3] contains the decimal point and decimals
                return [
                    props.preserveSign ? (regExpResult[1] || '+') : '',
                    regExpResult[2] || (regExpResult[3] ? '0' : ''),
                    regExpResult[3] || '',
                ].join('');
            }
            return '';
        }

        function updateValue(value: string) {
            let newValue = formatValue(value.replace(/,/, '.'));
            let newValueInUnits = Math.round(Number(newValue || 0) * 10 ** props.decimals);

            if (props.max && props.max < newValueInUnits) {
                newValueInUnits = props.max;
                newValue = String(newValueInUnits / 10 ** props.decimals);
            }

            liveValue.value = newValue;
            valueInUnits.value = newValueInUnits;
        }

        function onInput(event: { target: EventTarget | null }) {
            const target = event.target as HTMLInputElement;
            updateValue(target.value);
            target.value = liveValue.value;

            if (lastEmittedValue.value !== valueInUnits.value) {
                context.emit('update:modelValue', valueInUnits.value);
                lastEmittedValue.value = valueInUnits.value;
            }
        }

        watch(() => props.modelValue, (newValue: number | undefined) => {
            if (newValue === valueInUnits.value) return;
            lastEmittedValue.value = newValue || 0;
            updateValue(newValue ? String(newValue / 10 ** props.decimals) : '');
        }, { immediate: true });

        watch(() => props.max, (newMax: number | undefined) => {
            // Disabling a max value, or setting it higher than the current value, has no effect on
            // the current value, but will take effect only on the next input.
            if (!newMax || newMax >= valueInUnits.value) return;

            onInput({ target: refInput.value });
        });

        watch(() => props.decimals, () => onInput({ target: refInput.value }));

        return {
            valueInUnits,
            liveValue,
            onInput,
            refInput,
        };
    },
    methods: {
        focus() {
            (this.$refs.$input as HTMLInputElement).focus();
        },
    },
});
</script>

<style lang="scss" scoped>
input {
    max-width: 100%;
}
</style>
