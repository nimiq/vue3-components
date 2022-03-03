<template>
    <div class="page-footer nq-card-footer">
        <slot></slot>
    </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
    .page-footer {
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        box-sizing: border-box;
    }

    .page-footer >>> .nq-button {
        margin: 2rem 4.75rem 3rem;
    }
</style>
