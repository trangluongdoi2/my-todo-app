<template>
  <v-menu>
    <!-- <slot /> -->
    
  </v-menu>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>

