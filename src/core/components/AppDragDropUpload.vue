<template>
  <div class="upload-wrapper">
    <p class="upload__label" v-if="label">{{ label }}</p>
    <div class="upload__area relative flex items-center justify-center w-full h-full p-2">
      <span class="font-bold">Drop files to attach or 
        <span
          class="test underline h-fit text-[#579DFF] font-bold"
          variant="plain"
          @click.stop="openInputUpload"
        >
          browse
        </span>
      </span>
      <input
        class="input-button"
        ref="inputEl"
        type="file"
        :accept="accepts['GRAPHIC']"
        @change="onAddFiles"
        @click.prevent
      >
    </div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
defineProps({
  label: {
    type: String,
    default: '',
  }
});

const currentFiles = defineModel('currentFiles', { type: Array });

const accepts: Record<string, string> = {
  FONT: '.woff, .woff2, .ttf, .zip, .otf',
  GRAPHIC: 'image/jpeg, image/jpg, image/png, image/gif, .zip, .heic, .heif, .svg',
};

const inputEl = ref<HTMLInputElement>();

const onAddFiles = (e: Event) => {
  // const { files } = e.target;
};

const openInputUpload = async () => {
  console.log('openInputUpload...');
  console.log(inputEl.value, 'inputEl.value...');
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
    .test {
      &:hover {
        cursor: pointer;
      }
    }
    .input-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      opacity: 0;
    }
  }
}
</style>