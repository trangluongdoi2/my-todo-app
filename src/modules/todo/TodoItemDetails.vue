<template>
  <div class="overflow-y-auto p-[1.25rem] text-[16px]">
    <TodoBreadcrumbs class="breadcrumbs"/>
    <div class="flex flex-col gap-y-2 mt-4 text-[14px]">
      <div>
        <h1>{{ item.todoName }}</h1>
      </div>
      <div>
        <h2>Description</h2>
        <p>{{ item.description }}</p>
      </div>
      <div class="flex flex-col gap-y-1">
        <h2>Attachments <v-chip size="x-small">2</v-chip></h2>
        <!-- Grid Attachments -->
        <AppImage :src="AvatarUrl" width="200" height="200"/>
        <AppImage :src="AvatarUrl" width="200" height="200"/>
      </div>
      <div>
        <h2>Activities</h2>
        <TodoActivities />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppImage from '@/core/components/AppImage.vue';
import TodoBreadcrumbs from '@/modules/todo/components/TodoBreadcrumbs.vue';
import AvatarUrl from '@/assets/avatar.jpeg';
import TodoActivities from '@/modules/todo/TodoActivities.vue';

import { onMounted } from 'vue';
const props = defineProps({
  item: {
    type: Object,
    required: true,
  }
});

onMounted(() => {
  console.log(props.item, 'props.item...');
});
</script>

<style lang="scss" scoped>
.breadcrumbs {
  position: sticky;
  top: -1.25rem;
  left: 0;
  height: 2rem;
  z-index: 10;
}

</style>