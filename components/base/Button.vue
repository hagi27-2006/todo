<template>
  <button
    @click="$emit('action')"
    class="p-2 rounded-lg font-semibold"
  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
}>();
</script>

<style scoped>
/* Add any additional styles here */
</style>
