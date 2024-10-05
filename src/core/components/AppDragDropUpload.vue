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
      :accept="accepts['GRAPHIC']"
      @change="onAddFiles"
    />
    </div>
    <div class="upload__preview flex flex-col gap-y-4" v-if="currentUploadItems?.length">
      <div class="w-full" v-for="item in currentUploadItems" :key="item.id">
        <div class="flex w-full items-center gap-x-2">
          <div class="w-[50px] h-[50px]">
            <AppImage class="w-full h-full" :src="item.filePath"/>
          </div>
          <div class="min-w-[calc(100%-100px)] w-[calc(100%-100px)]">
            <AppEditable @change="onChangeFileName(item, $event)" v-model="item.name" :displayName="item.fileName"/>
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
import { ref } from 'vue';
import AppImage from './AppImage.vue';
import AppEditable from './AppEditable.vue';
import { kebaCase, uuid } from '@/common/string-utils';
import { getExtensionFile } from '@/common/file';

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
};

const currentUploadItems = defineModel('uploadItems', { type: Array<any> });
const currentUploadFiles = defineModel('files', { type: Array<File> });

const emit = defineEmits<{
  (e: 'change', items: TempItemUpload[]),
  (e: 'update-files', items: File[])
}>();

const inputEl = ref<HTMLInputElement>();

const onAddFiles = (e: Event) => {
  const target = e?.target as HTMLInputElement;
  if (!target.files) {
    return;
  }
  const inputFiles = Array.from(target.files);
  const items = inputFiles.map((file: File) => {
    const [nameWithoutExtension] = file.name.split(/(?=\.[^.]+$)/);
    const newTempUploadItem = {
      id: uuid(),
      name: kebaCase(nameWithoutExtension),
      fileName: file.name,
      filePath: URL.createObjectURL(file),
    }
    return newTempUploadItem;
  });
  currentUploadItems.value = items;
  currentUploadFiles.value = inputFiles;
  emit('change', items);
  emit('update-files', inputFiles);
};

const onChangeFileName = (item: TempItemUpload, value: string) => {
  console.log('onChangeFileName', item, value);
  const extension = getExtensionFile(item.fileName);
  const newFileName = `${value}.${extension}`;
  console.log(newFileName, 'newFileName...');
  const currentFile = currentUploadFiles.value.find((file: File) => file.name === item.fileName);
  if (currentFile) {
    Object.defineProperty(currentFile, 'name', {
      writable: true,
      value: newFileName,
    });
  }
  console.log(currentUploadFiles.value, 'currentUploadFiles.value...');
}

const removeFile = (id: string) => {
  const removeItem = currentUploadItems.value.find((item: any) => item.id === id);
  if (removeItem) {
    currentUploadItems.value = currentUploadItems.value.filter((item: File) => item.name !== removeItem.fileName);
  }
  currentUploadItems.value = currentUploadItems.value.filter((item: any) => item.id !== id);
}

const openInputUpload = async () => {
  if (inputEl.value) {
    inputEl.value.focus();
  }
};

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