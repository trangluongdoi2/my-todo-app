<template>
  <div class="upload-wrapper">
    <p class="upload__label" v-if="label">{{ label }}</p>
    <div class="upload__area relative flex items-center justify-center w-full h-full p-2">
      <span class="font-bold">Drop files to attach or 
        <span
          class="relative"
          variant="plain"
          @click.stop="openInputUpload"
        >
        <span class="span-upload underline text-[#579DFF] font-bold">browse</span>
      </span>
    </span>
    <input
      class="input-button"
      ref="inputEl"
      type="file"
      :multiple="multiple"
      :accept="accepts['GENERAL']"
      @change="onAddFiles"
    />
    </div>
    <div class="upload__preview flex flex-col gap-y-4" v-if="listItems?.length">
      <div class="w-full" v-for="item in listItems" :key="item.id">
        <div class="flex w-full items-center gap-x-2">
          <div class="w-[50px] h-[50px]">
            <AppImage class="w-full h-full" :src="item.filePath"/>
          </div>
          <div class="min-w-[calc(100%-100px)] w-[calc(100%-100px)]">
            <AppEditable @change="onChangeFileName(item.id, $event)" v-model="item.name" :displayValue="item.fileName" />
          </div>
          <div class="w-[50px]">
            <app-button class="w-full" icon variant="text" @click="removeFile(item.id)">
              <v-icon color="#FD9891" icon="custom:delete" />
            </app-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import {
  getExtensionFile,
  getFileNameWithoutExtension,
  getVideoThumbnail,
  isVideoFile,
} from '@/common/file';
import AppImage from './AppImage.vue';
import AppEditable from './AppEditable.vue';
import { kebaCase, uuid } from '@/common/string-utils';

export type TempItemUpload = {
  fileName: string,
  name?: string,
  filePath?: string,
  id?: string,
}

defineProps({
  label: {
    type: String,
    default: '',
  },
  multiple: {
    type: Boolean,
    default: true,
  }
});

const accepts: Record<string, string> = {
  FONT: '.woff, .woff2, .ttf, .zip, .otf',
  GRAPHIC: 'image/jpeg, image/jpg, image/png, image/gif, .zip, .heic, .heif, .svg',
  GENERAL: 'image/jpeg, image/jpg, image/png, image/gif, .zip, .heic, .heif, .svg, video/*, *',
};

const uploadedItemsList = defineModel('uploadItems', { type: Array<any>, default: () => [] });
const uploadedFilesList = defineModel('files', { type: Array<File> });
const uploadedItemsMap = ref<Map<string, TempItemUpload>>(new Map());
const uploadedFilesMap = ref<Map<string, File>>(new Map());

const emit = defineEmits<{
  (e: 'change', items: TempItemUpload[]),
  (e: 'update-files', items: File[])
}>();

const inputEl = ref<HTMLInputElement>();

const onAddFiles = async (e: Event) => {
  const target = e?.target as HTMLInputElement;
  if (!target.files) {
    return;
  }
  const inputFiles = Array.from(target.files);
  for (const file of inputFiles) {
    const nameWithoutExtensionLowerCase = getFileNameWithoutExtension(file.name);
    let filePath = URL.createObjectURL(file);
    if (isVideoFile(file)) {
      filePath = await getVideoThumbnail(file) as string;
    }
    const newTempUploadItem = {
      id: uuid(),
      name: kebaCase(nameWithoutExtensionLowerCase),
      fileName: file.name,
      filePath,
    }
    uploadedItemsMap.value.set(newTempUploadItem.id, newTempUploadItem);
    uploadedFilesMap.value.set(newTempUploadItem.id, file);
  }
};

const listItems = computed(() => {
  return Array.from(uploadedItemsMap.value.values());
});

const listFiles = computed(() => {
  return Array.from(uploadedFilesMap.value.values());
});

const onChangeFileName = (itemId: string, newValue: string) => {
  const item = uploadedItemsMap.value.get(itemId);
  if (item) {
    const extension = getExtensionFile(item.fileName);
    const newFileName = `${newValue}.${extension}`;
    uploadedItemsMap.value.set(itemId, item);
    const file = uploadedFilesMap.value.get(itemId);
    if (file) {
      Object.defineProperty(file, 'name', {
        writable: true,
        value: newFileName,
      });
      Object.defineProperty(file, 'originalName', {
        writable: true,
        value: item.fileName,
      });
      uploadedFilesMap.value.set(itemId, file);
    }
  }
}

const removeFile = (id: string) => {
  uploadedItemsMap.value.delete(id);
  uploadedFilesMap.value.delete(id);
}

const openInputUpload = async () => {
  if (inputEl.value) {
    inputEl.value.focus();
  }
};

watch(listItems, () => {
  uploadedItemsList.value = Array.from(uploadedItemsMap.value.values());
}, { deep: true });

watch(listFiles, () => {
  uploadedFilesList.value = Array.from(uploadedFilesMap.value.values());
}, { deep: true });

</script>
<style scoped lang="scss">
.upload-wrapper {
  .upload__label {
    font-size: 0.75rem;
    color: $text;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .upload__area {
    border-radius: 0.25rem;
    border-style: dashed;
    border-color: $text;
    border-width: 1px;
    padding: 1rem;
    &:hover {
      border-color: $blue-base;
    }
    .span-upload {
      &:hover {
        cursor: pointer;
      }
    }
    .input-button {
      position: absolute;
      cursor: pointer;
      right: 0;
      left: 0;
      opacity: 0;
    }
  }
  .upload__preview {
    margin-top: 8px;
    max-height: 200px;
    overflow-y: auto;
  }
}
</style>