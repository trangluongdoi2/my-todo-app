<template>
  <figure v-lazy-loading class="image-container">
    <img
      class="image-element"
      :data-url="source"
      v-bind="$attrs"
    />
  </figure>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

type ObjectFit = 'fit' | 'cover' | 'fill' | 'contain' | 'scale-down' | 'none' | 'initial' | 'inherit';

defineProps({
  source: {
    type: String,
    required: true,
  },
  ratio: {
    type: String,
    default: '3/2'
  },
  mode: {
    type: String as PropType<ObjectFit>,
    default: 'cover',
  },
});
</script>

<style lang="scss" scoped>
.image-container {
  width: 100%;
  height: 100%;
  margin: 0;
  .image-element {
    width: 100%;
    height: 100%;
    aspect-ratio: v-bind(ratio);
    object-fit: v-bind(mode);
  }
}
</style>