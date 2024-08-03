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
        <div class="flex justify-between items-center gap-x-2">
          <div class="w-[50px] h-50px">
            <AppImage :src="item.filePath"/>
          </div>
          <AppEditable v-model="item.name" :displayName="item.fileName"/>
          <app-button icon variant="text" @click="removeFile(item.id)">
            <v-icon color="#FD9891" icon="custom:delete" />
          </app-button>
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

const currentFiles = defineModel('currentFiles', { type: Array });

const accepts: Record<string, string> = {
  FONT: '.woff, .woff2, .ttf, .zip, .otf',
  GRAPHIC: 'image/jpeg, image/jpg, image/png, image/gif, .zip, .heic, .heif, .svg',
};

const emit = defineEmits<{
  (e: 'change', items: TempItemUpload[]),
  (e: 'update-files', items: File[])
}>();

const inputEl = ref<HTMLInputElement>();
const currentUploadItems = ref<any[]>();

const onAddFiles = (e: Event) => {
  const target = e?.target as HTMLInputElement;
  if (!target.files) {
    return;
  }
  const inputFiles = Array.from(target.files);
  const items = inputFiles.map((file: File) => {
    console.log(file, 'file..');
    const [nameWithoutExtension] = file.name.split(/(?=\.[^.]+$)/);
    const newTempUploadItem = {
      id: uuid(),
      name: kebaCase(nameWithoutExtension),
      fileName: file.name,
      filePath: URL.createObjectURL(file),
    }
    console.log(newTempUploadItem, 'newTempUploadItem...');
    return newTempUploadItem;
  });
  currentUploadItems.value = items;
  emit('change', items);
  emit('update-files', inputFiles);
};

const removeFile = (id: string) => {
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
  }
}
</style>