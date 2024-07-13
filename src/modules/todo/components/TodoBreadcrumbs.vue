<template>
  <div ref="breadCrumbEl" class="breadcrumbs__content p-[0.25rem]">
    <p>TodoBreadcrumbs / TodoBreadcrumbs /TodoBreadcrumbs</p>
    <v-divider />
  </div>
</template>

<script setup lang="ts">
// import { watch } from 'fs';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const breadCrumbEl = ref<HTMLElement>();

const topPosition = computed(() => {
  if (!breadCrumbEl.value) {
    return 0;
  }
  const bounding = breadCrumbEl.value.getBoundingClientRect();
  return bounding.top;
});

const handleScrollElement = () => {
console.log('handleScrollElement...');
}

onMounted(() => {
  console.log('onMounted...');
  window.addEventListener('scroll', handleScrollElement);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollElement);
});
</script>

<style lang="scss" scoped>
.breadcrumbs__content {
  height: 30px;
  background-color: $dark-base;
}
</style>