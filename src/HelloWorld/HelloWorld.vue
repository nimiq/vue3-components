<template>
  <h1>{{ msg }}</h1>
  <span>THIS SHOULD NOT BE THERE</span>
  <button @click="count++">count is: {{ count }}</button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
</script>

<style scoped>
</style>
