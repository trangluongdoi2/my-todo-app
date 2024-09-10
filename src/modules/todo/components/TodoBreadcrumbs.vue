<template>
  <div ref="breadCrumbEl" class="breadcrumbs__content p-[0.25rem]">
    <!-- <p>TodoBreadcrumbs / TodoBreadcrumbs /TodoBreadcrumbs</p> -->
    <AppBreadcrumbs :items="[]"/>
    <v-divider />
  </div>
</template>
<script setup lang="ts">
import AppBreadcrumbs from '@/core/components/AppBreadcrumbs.vue';
</script>
<style lang="scss" scoped>
.breadcrumbs__content {
  height: 30px;
  background-color: $dark-base;
}
</style>