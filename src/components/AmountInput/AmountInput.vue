<template>
    <div class="amount-input" :class="{ 'has-value': valueInLuna > 0, 'focussed': isFocussed }">
        <form class="label-input" @submit.prevent="$emit(AmountInputEvent.SUBMIT, $event)" ref="fullWidth$">
            <span class="width-finder width-placeholder" ref="widthPlaceholder$">{{ placeholder }}</span>
            <div v-if="maxFontSize" class="full-width" :class="{ 'width-finder': maxWidth > 0 }">Width</div>
            <span class="width-finder width-value" ref="widthValue$">{{ formattedValue || '' }}</span>
            <input type="text" inputmode="decimal" class="nq-input"
                ref="input$"
                :class="{ vanishing }"
                :placeholder="placeholder"
                :style="{ width: `${width}px`, fontSize: `${fontSize}rem` }"
                @focus="isFocussed = true"
                @blur="isFocussed = false"
                @paste="$emit(AmountInputEvent.PASTE, $event)"
                v-model="formattedValue"
            />
        </form>
        <span class="nim">NIM</span>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, nextTick } from 'vue';

export enum AmountInputEvent {
    MODELVALUE_UPDATE = 'update:modelValue',
    PASTE = 'paste',
    SUBMIT = 'submit',
}

export default defineComponent({
    name: 'AmountInput',
    emits: Object.values(AmountInputEvent),
    props: {
        modelValue: Number,
        maxFontSize: {
            type: Number,
            default: 8,
        },
        placeholder: {
            type: String,
            default: '0',
        },
        vanishing: {
            type: Boolean,
            default: false,
        },
        decimals: {
            type: Number,
            default: 5,
        },
    },
    setup(props, context) {
        const fullWidth$ = ref<HTMLDivElement | null>(null);
        const input$ = ref<HTMLInputElement | null>(null);
        const widthPlaceholder$ = ref<HTMLSpanElement | null>(null);
        const widthValue$ = ref<HTMLSpanElement | null>(null);

        const liveValue = ref('');
        const lastEmittedValue = ref(0);
        const width = ref(50);
        const fontSize = ref(props.maxFontSize);
        const maxWidth = ref(0);
        const valueInLuna = ref(0);
        const isFocussed = ref(false);

        onMounted(() => {
            if (props.maxFontSize && fullWidth$.value) {
                maxWidth.value = fullWidth$.value.offsetWidth;
            }
        });

        function focus() {
            if (input$.value) input$.value.focus();
        }

        function updateValue(newValue: number) {
            if (newValue === valueInLuna.value) return;
            lastEmittedValue.value = newValue || 0;
            formattedValue.value = newValue ? (newValue / Math.pow(10, props.decimals)).toString() : '';
            updateWidth();
        }

        async function updateWidth() {
            await nextTick(); // Await updated DOM
            if (!widthPlaceholder$.value || !widthValue$.value) return;

            const placeholderWidth = widthPlaceholder$.value.offsetWidth;
            const valueWidth = widthValue$.value.offsetWidth;
            const fontSizeFactor = Math.min(1.0, Math.max(maxWidth.value / valueWidth, 1 / props.maxFontSize));

            fontSize.value = fontSizeFactor * props.maxFontSize;
            width.value = (formattedValue.value ? (fontSizeFactor === 1 ? valueWidth : maxWidth.value) : placeholderWidth);
        }

        const formattedValue = computed({
            get() {
                return liveValue.value;
            },
            set(value: string) {
                liveValue.value = value;

                if (!value) {
                    liveValue.value = '';
                    lastEmittedValue.value = 0;
                    valueInLuna.value = 0;
                    context.emit(AmountInputEvent.MODELVALUE_UPDATE, valueInLuna.value);
                    return;
                }

                value = value.replace(/\,/, '.');
                const regExp = new RegExp(`(\\d*)(\\.(\\d{0,${props.decimals}}))?`, 'g'); // Backslashes are escaped
                const regExpResult = regExp.exec(value)!;
                if (regExpResult[1] || regExpResult[2]) {
                    liveValue.value = `${regExpResult[1] ? regExpResult[1] : '0'}${regExpResult[2] ? regExpResult[2] : ''}`;
                    valueInLuna.value = Number(
                        `${regExpResult[1]}${(regExpResult[2] ? regExpResult[3] : '').padEnd(props.decimals, '0')}`,
                    );
                } else {
                    liveValue.value = '';
                    valueInLuna.value = 0;
                }

                if (lastEmittedValue.value !== valueInLuna.value) {
                    context.emit(AmountInputEvent.MODELVALUE_UPDATE, valueInLuna.value);
                    lastEmittedValue.value = valueInLuna.value;
                }
            }
        });

        watch(formattedValue, updateWidth);
        watch(
            () => props.modelValue,
            (newValue: number | undefined) => newValue && updateValue(newValue),
            { immediate: true }
        );

        context.expose({ focus, formattedValue });

        return {
            fullWidth$,
            input$,
            widthPlaceholder$,
            widthValue$,

            valueInLuna,
            isFocussed,
            maxWidth,
            formattedValue,
            width,
            fontSize,

            AmountInputEvent,
        };
    },
});
</script>

<style scoped>
    .label-input {
        position: relative;
        overflow: hidden; /* limit width-finder width to parent available width */
        max-width: 100%;
        height: 100%;
    }

    .width-finder {
        position: absolute;
        color: transparent;
        pointer-events: none;
        user-select: none;
        white-space: pre;
        padding: 1.25rem;
    }

    input {
        padding: 0 0.25rem;
        max-width: 100%;
        text-align: center;
        transition: width 50ms ease-out, color .2s var(--nimiq-ease);
    }

    .full-width {
        width: 1000px;
    }

    .amount-input {
        display: flex;
        align-items: baseline;
        justify-content: center;
        width: 100%;
        font-size: 8rem;
        color: rgba(31, 35, 72, 0.5); /* Based on Nimiq Blue */
        transition: color .2s var(--nimiq-ease);
    }

    .amount-input.has-value {
        color: var(--nimiq-blue);
    }

    .amount-input.focussed {
        color: var(--nimiq-light-blue);
    }

    .amount-input form {
        display: flex;
    }

    .amount-input .nim {
        margin-left: 1rem;
        font-size: 4rem;
        font-weight: 700;
        line-height: 4.5rem;
    }
</style>
