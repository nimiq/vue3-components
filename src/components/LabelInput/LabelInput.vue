<template>
    <form class="label-input" @submit.prevent="onBlur" :class="{ disabled }">
        <span class="width-finder width-placeholder" ref="widthPlaceholder$">{{
            placeholder || $t('Name your address')
        }}</span>
        <span class="width-finder width-value" ref="widthValue$">{{ liveValue }}</span>
        <input type="text" class="nq-input" :class="{ 'vanishing': vanishing }"
            :placeholder="placeholder || $t('Name your address')"
            :style="{ width: `${width}px` }"
            v-model="liveValue"
            :disabled="disabled"
            @input="onInput"
            @blur="onBlur"
            @paste="$emit('paste', $event)"
            ref="input$">
    </form>
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from '@vue/runtime-core';
import { Utf8Tools } from '@nimiq/utils';
import { loadI18n } from '../../i18n/I18nComposable';

export default defineComponent({
    name: 'LabelInput',
    emits: ['input', 'changed', 'paste'],
    props: {
        maxBytes: Number, // was a `protected` prop with vue2 class component
        modelValue: {
            type: String,
            default: '',
        },
        placeholder: String,
        vanishing: {
            type: Boolean,
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, context) {
        const $t = loadI18n('LabelInput');

        const input$ = ref<HTMLInputElement | null>(null);
        const widthPlaceholder$ = ref<HTMLSpanElement | null>(null);
        const widthValue$ = ref<HTMLSpanElement | null>(null);

        const liveValue = ref('');
        const lastValue = ref('');
        const lastEmittedValue = ref('');
        const width = ref(50);

        function focus() {
            if (input$.value) input$.value.focus();
        }
        context.expose({ focus });

        function onInput() {
            if (props.maxBytes) {
                const lengthInBytes = Utf8Tools.stringToUtf8ByteArray(liveValue.value!).byteLength;
                if (lengthInBytes > props.maxBytes) {
                    liveValue.value = lastValue.value;
                    return;
                }
                lastValue.value = liveValue.value;
            }
            context.emit('input', liveValue.value);
        }

        function onBlur() {
            if (liveValue.value === lastEmittedValue.value) return;
            context.emit('changed', liveValue.value);
            lastEmittedValue.value = liveValue.value;
            if (input$.value) input$.value.blur();
        }

        watch(() => props.modelValue, updateValue, { immediate: true })
        function updateValue(newValue: string) {
            liveValue.value = newValue;
            lastValue.value = liveValue.value;
            lastEmittedValue.value = lastValue.value;
        }

        watch(liveValue, updateWidth, { immediate: true });
        async function updateWidth() {
            await nextTick(); // Await updated DOM
            if (!widthPlaceholder$.value || !widthValue$.value || !input$.value) return;

            const placeholderWidth = widthPlaceholder$.value.offsetWidth;
            const valueWidth = widthValue$.value.offsetWidth;

            // Add an additional padding, so entering new letters does not flicker the input before width is adjusted
            //
            // A third of the font-size was found to be a good compromise between not adding too big a gap and
            // still resonably supporting wide letters (it still jumps for W at bigger font-sizes, but that's why
            // it's called a compromise).
            const fontSize = parseFloat(window.getComputedStyle(input$.value, null)
                .getPropertyValue('font-size'));

            width.value = (liveValue.value.length ? valueWidth : placeholderWidth) + fontSize / 3;
        }

        return {
            $t,

            input$,
            widthPlaceholder$,
            widthValue$,

            liveValue,
            width,

            onInput,
            onBlur,
        };
    },
})
</script>

<style scoped>
    .label-input {
        position: relative;
        overflow: hidden; /* limit width-finder width to parent available width */
        max-width: 100%;
        box-sizing: border-box;
    }

    .width-finder {
        position: absolute;
        color: transparent;
        pointer-events: none;
        user-select: none;
        white-space: pre;
        padding: 0 2.25rem; /* nq-input padding + border-width */
    }

    input {
        padding-right: 0;
        max-width: 100%;
        transition:
            color .2s ease, box-shadow .2s ease, /* Copied from Nimiq Styles */
            width 50ms ease-out;
    }

    input:disabled {
        pointer-events: none; /* Prevent hover effects */
    }
</style>
