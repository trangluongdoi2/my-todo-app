<template>
  <div class="h-100 p-4 pt-[2px]">
    <AppBreadcrumbs :items="breadcrumbItems" />
    Overview
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGlobalStates } from '@/core/composables/useGlobalStates';
import AppBreadcrumbs, { BreadcrumbItem } from '@/core/components/AppBreadcrumbs.vue';

const { projectId } = useGlobalStates();
const breadcrumbItems = ref<BreadcrumbItem[]>([
  {
    title: 'Projects',
    disabled: false,
    href: '/projects',
  },
  {
    title: projectId.value.toString(),
    disabled: false,
    href: `/projects/${projectId.value}`,
  },
  {
    title: 'Add member',
    disabled: true,
    href: '',
  }
]);
</script>