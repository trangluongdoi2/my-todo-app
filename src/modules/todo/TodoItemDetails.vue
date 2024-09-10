<template>
  <div v-if="loading" class="overflow-y-auto">
    <SkeletonTodoDetails />
  </div>
  <div v-else class="overflow-y-auto p-[1.25rem] text-[16px]">
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
        <div v-if="attachments?.length" class="w-full flex flex-wrap gap-2">
          <div class="w-[100px] h-[100px]" v-for="(file, index) in attachments" :key="index">
            <TodoAttachmentImage :src="file.filePath" :item="file" @download="onDownloadAttach(file)"/>
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
import { computed, PropType, ref } from 'vue';
import { TodoItemDetails } from '@/types';
import TodoApi from './api/todoApi';
import { saveArrayToFile } from '@/common/file';
import AppUpload, { TempItemUpload } from '@/core/components/AppUpload.vue';
import TodoAttachmentImage from '@/modules/todo/components/TodoAttachmentImage.vue';
import TodoBreadcrumbs from '@/modules/todo/components/TodoBreadcrumbs.vue';
import TodoActivities from '@/modules/todo/TodoActivities.vue';
import SkeletonTodoDetails from './skeleton/SkeletonTodoDetails.vue';

const props = defineProps({
  item: {
    type: Object as PropType<TodoItemDetails>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

const tempAttachUploads = ref<any[]>([]);
const attachments = computed(() => (props.item?.attachments || []).concat(tempAttachUploads.value));

const onDownloadAttach = async (file: any) => {
  const base64 = await TodoApi.downloadAttachment(file.fileName);
  saveArrayToFile(base64, file.fileName);
}

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
  height: 2.25rem;
  z-index: 10;
}

</style>