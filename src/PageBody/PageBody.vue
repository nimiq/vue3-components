<template>
    <div class="page-body nq-card-body">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
    .page-body {
        flex-grow: 1;
        overflow-y: auto;
    }
</style>
