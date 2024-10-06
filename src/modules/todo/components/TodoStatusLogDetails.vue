<template>
  <slot />
</template>
<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
  log: {
    type: Object,
    required: true,
  },
});
</script>