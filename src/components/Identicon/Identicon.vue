<template>
    <nimiq-identicon :input="address" :should-validate-address="shouldValidateAddress" class="identicon" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import 'identicons-esm/web-component';

export default defineComponent({
    name: 'Identicon',
    props: {
        address: {
            required: true,
            type: String,
        },
        shouldValidateAddress: {
            required: false,
            type: Boolean,
        }
    }
})
</script>
