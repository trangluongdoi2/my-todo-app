<template>
  <div class="relative flex items-center justify-end">
    <app-button icon size="20">
      <v-icon icon="mdi-plus" />
    </app-button>
    <input
      class="hidden-input" 
      type="file"
      :multiple="multiple"
      :accept="accepts['GRAPHIC']"

      @change="onAddFiles($event)"
    >
  </div>
</template>

<script setup lang="ts">
import { uuid } from '@/common/string-utils';
import { TodoAttachment } from '@/types';

export interface TempItemUpload extends TodoAttachment {
  name: string,
}

const accepts: Record<string, string> = {
  FONT: '.woff, .woff2, .ttf, .zip, .otf',
  GRAPHIC: 'image/jpeg, image/jpg, image/png, image/gif, .zip, .heic, .heif, .svg',
};

const emit = defineEmits<{
  (e: 'change', items: TempItemUpload[]),
  (e: 'update-files', items: File[])
}>();

const props = defineProps({
  multiple: {
    type: Boolean,
    default: true,
  }
});

const onAddFiles = (e: Event) => {
  const target = e?.target as HTMLInputElement;
  if (!target?.files) {
    return;
  }
  const inputFiles = Array.from(target.files);
  const items: TempItemUpload[] = inputFiles.map((file: File) => {
    const [nameWithoutExtension] = file.name.split(/(?=\.[^.]+$)/);
    const newTempUploadItem = {
      id: uuid(),
      name: nameWithoutExtension,
      fileName: file.name,
      filePath: URL.createObjectURL(file),
    }
    return newTempUploadItem;
  });
  emit('change', items);
  emit('update-files', inputFiles);
}
</script>

<style scoped lang="scss">
.hidden-input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>