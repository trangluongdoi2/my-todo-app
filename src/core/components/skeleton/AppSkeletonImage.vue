<template>
  <v-skeleton-loader v-bind="$attrs" class="item" type="image" />
</template>

<script setup lang="ts">
import { computed } from 'vue';

const HEIGHT_SKELETON_IMAGE_DEFAULT = 150;
const props = defineProps({
  height: {
    type: [Number, String],
  }
});
const heightVal = computed(() => {
  if (props.height) {
    return `${props.height}px`;
  }
  return `${HEIGHT_SKELETON_IMAGE_DEFAULT}px`;
});
</script>

<style scoped lang="scss">
.item {
  :deep(.v-skeleton-loader__image) {
    height: v-bind(heightVal);
  }
}
</style>