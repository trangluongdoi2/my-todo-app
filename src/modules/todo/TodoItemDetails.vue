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
        <div class="flex w-full justify-between items-center">
          <div class="flex-1">
            <h2>Attachments <span><v-chip size="x-small">2</v-chip></span></h2>
          </div>
          <AppUpload @change="onAddFilesUpload" @update-files="uploadFiles"/>
        </div>
        <div v-if="attachments?.length" class="w-full flex flex-wrap gap-1">
          <div class="w-[200px] h-[200px]" v-for="(file, index) in attachments" :key="index">
            <AppImage :src="file.filePath || ''" />
          </div>
        </div>
        <div v-else class="w-full max-h-[100px]">No Attachments</div>
      </div>
      <div>
        <h2>Activities</h2>
        <TodoActivities />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref, watch } from 'vue';
import AppImage from '@/core/components/AppImage.vue';
import TodoBreadcrumbs from '@/modules/todo/components/TodoBreadcrumbs.vue';
import AvatarUrl from '@/assets/avatar.jpeg';
import TodoActivities from '@/modules/todo/TodoActivities.vue';
import AppUpload, { TempItemUpload } from '@/core/components/AppUpload.vue';
import TodoApi from './api/todo';
import { TodoItemDetails } from '@/type';

const props = defineProps({
  item: {
    type: Object as PropType<TodoItemDetails>,
    required: true,
  }
});

const tempAttachUploads = ref<any>();
const attachments = computed(() => [...props.item?.attachments || [], ...tempAttachUploads.value || []]);

const onAddFilesUpload = (items: TempItemUpload[]) => {
  tempAttachUploads.value = items;
}

const uploadFiles = (items: File[]) => {
  TodoApi.uploadAttachs(props.item.id, items);
}
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