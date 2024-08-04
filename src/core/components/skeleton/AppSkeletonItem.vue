<template>
  <v-skeleton-loader v-bind="$attrs" class="item-wrapper" type="list-item"/>
</template>
<script setup lang="ts">
import { computed, defineProps } from 'vue';
const props = defineProps({
  height: {
    type: Number,
  }
});

const HEIGHT_SKELETON_TEXT = 12;
const MARGIN_SEKELETON_BOUND_DEFAULT = 16;

const marginVal = computed(() => {
  if (props.height) {
    const newMargin = (props.height - HEIGHT_SKELETON_TEXT) / 2;
    return newMargin > 0 ? `${newMargin}px` : `${MARGIN_SEKELETON_BOUND_DEFAULT}px`;
  }
  return `${MARGIN_SEKELETON_BOUND_DEFAULT}px`;
});
</script>
<style scoped lang="scss">
.item-wrapper {
  :deep(.v-skeleton-loader__list-item) {
    margin: v-bind(marginVal);
  }
}
</style>