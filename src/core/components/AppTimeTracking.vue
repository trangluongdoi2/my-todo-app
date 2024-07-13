<template>
  <v-progress-linear
    v-model="trackValue"
    :color="color"
  ></v-progress-linear>
</template>

<script setup lang="ts">
import { defineProps, defineModel } from 'vue';
defineProps({
  color: {
    type: String,
    default: '#42B883',
  }
});
const trackValue = defineModel('time', { type: Number, default: 50 });

</script>

<style lang="scss" scoped>

</style>