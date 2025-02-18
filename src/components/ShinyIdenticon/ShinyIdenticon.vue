<template>
    <nimiq-shiny-identicon :input="address" :material="material" :should-validate-address="shouldValidateAddress" class="identicon" />
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { IdenticonMaterial } from 'identicons-esm/types'
import 'identicons-esm/shiny-web-component';

export default defineComponent({
    name: 'ShinyIdenticon',
    props: {
        address: {
            required: true,
            type: String,
        },
        shouldValidateAddress: {
            required: false,
            type: Boolean,
        },
        material: {
            required: false,
            type: String as PropType<IdenticonMaterial>,
            default: false,
        }
    },
})
</script>
