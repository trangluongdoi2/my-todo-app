<template>
  <v-breadcrumbs
    :items="items"
    v-bind="$attrs"
  >
    <template v-slot:prepend>
      <slot name="prepend"></slot>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export type BreadcrumbItem = {
  title: string,
  disabled: boolean,
  href: string,
}
defineProps({
  items: {
    type: Array as PropType<BreadcrumbItem[]>,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.v-breadcrumbs {
  font-size: 1rem;
  font-weight: 500;
  padding: 4px;
  > li.v-breadcrumbs-divider {
    padding: 0 4px;
  }
}
</style>