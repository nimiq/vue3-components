<template>
    <div class="select-bar">
        <div v-for="option of sortedOptions" :key="option.value">
            <input :value="option" type="radio" :name="name" :id="option.value.toString()" v-model="selectedOption">
            <label :for="option.value.toString()" class="nq-label" :class="getColor(option)">{{ option.text }}</label>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from '@vue/runtime-core';

export interface SelectBarOption {
    color: string;
    value: number;
    text: string;
    index: number;
}

export default defineComponent({
    name: 'SelectBar',
    props: {
        name: {
            type: String,
            required: true,
        },
        options: {
            type: Array as () => SelectBarOption[],
            required: true,
        },
        selectedValue: Number,
    },
    setup(props, context) {
        const value = computed(() => selectedOption.value?.value);
        const sortedOptions = computed(() => props.options.sort((a, b) => a.index - b.index));
        const selectedOption = computed(() => props.selectedValue
                ? sortedOptions.value.find((val) => val.value === props.selectedValue)!
                : sortedOptions.value[0]);

        function getColor(option: SelectBarOption) {
            if (option.index <= selectedOption.value!.index) {
                return selectedOption.value!.color;
            } else return 'nq-highlight-bg';
        }

        watch(selectedOption, onChanged);
        function onChanged(option: SelectBarOption | null) {
            if (!option) return;
            context.emit('changed', option.value);
        }

        context.expose({ value });

        return {
            sortedOptions,
            selectedOption,

            getColor,
        };
    },
})
</script>

<style scoped>
    .select-bar {
        display: flex;
        border-radius: 3.75rem;
        overflow: hidden;
        width: 100%;
    }

    .select-bar > div {
        display: flex;
        flex-grow: 1;
        flex-basis: 0;
    }

    .select-bar > div + div {
        margin-left: .25rem;
    }

    input {
        display: none;
    }

    label {
        padding: 1.75rem 2rem;
        margin: 0;
        width: 100%;
        text-align: center;
        cursor: pointer;
        border-radius: .5rem;
    }

    .nq-highlight-bg {
        background: var(--nimiq-highlight-bg);
    }
</style>
