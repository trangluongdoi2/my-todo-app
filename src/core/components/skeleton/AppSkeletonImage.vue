<template>
  <v-skeleton-loader v-bind="$attrs" class="item" type="image" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  height: {
    type: [Number, String],
  }
});
const heightVal = computed(() => {
  if (props.height) {
    return `${props.height}px`;
  }
  return '100%';
});
</script>

<style scoped lang="scss">
.item {
  :deep(.v-skeleton-loader__image) {
    border-radius: 0.25rem;
    height: v-bind(heightVal);
  }
}
</style>