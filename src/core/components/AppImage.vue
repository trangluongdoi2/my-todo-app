<template>
  <v-img class="app-image" v-bind="$attrs" :src="src" :aspect-ratio="aspectRatio"/>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

defineProps({
  src: {
    type: String,
    required: true,
  },
  aspectRatio: {
    type: [String, Number],
    default: '3 / 2',
  }
});
</script>
<style lang="scss" scoped>
.app-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
