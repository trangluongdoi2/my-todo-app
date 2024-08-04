<template>
  <v-skeleton-loader v-bind="$attrs" class="item-wrapper" type="button"/>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  height: {
    type: [Number, String],
  }
});

const HEIGHT_SKELETON_BUTTON_DEFAULT = 36;
const heightVal = computed(() => {
  if (props.height) {
    return `${props.height}px`;
  }
  return `${HEIGHT_SKELETON_BUTTON_DEFAULT}px`;
});

</script>

<style scoped lang="scss">
.item-wrapper {
  :deep(.v-skeleton-loader__button) {
    margin: 8px;
    max-width: unset;
    height: v-bind(heightVal);
  }
}
</style>