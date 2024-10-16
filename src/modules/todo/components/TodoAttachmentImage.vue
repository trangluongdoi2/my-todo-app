<template>
  <div
    class="relative w-full h-full"
    :class="{ 'hover': isHovering }"
    @mouseover="isHovering = true"
    @mouseleave="isHovering = false"
  >
    <AppLoading
      class="loading-wrapper"
      v-if="loading"
      :loading="loading"
    />
    <AppImage ref="imageEl" :src="src" cover />
    <div
      v-if="isHovering"
      class="flex gap-x-1 items-center justify-end absolute top-[1px] right-[2px]"
    >
      <app-button
        type="text"
        size="24"
        @click.stop="onPreview"
      >
        <v-icon icon="custom:eye" />
      </app-button>
      <app-button
        type="text"
        size="24"
        @click.stop="$emit('download')"
      >
        <v-icon icon="custom:download" />
      </app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import AppImage from '@/core/components/AppImage.vue';
import AppLoading from '@/core/components/AppLoading.vue';

defineProps({
  src: {
    type: String,
    required: true,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['download', 'preview']);

const imageEl = ref<HTMLImageElement>();
const isHovering = ref<boolean>(false);
const isPreview = ref<boolean>(false);

const onPreview = () => {
  isPreview.value = true;
}

</script>
<style scoped lang="scss">
.hover {
  opacity: 0.6;
}
.loading-wrapper {
  position: absolute;
  width: 100%;
  height: 100%;
}
.icon {
  position: absolute;
  top: 1px;
  right: 2px;
}
</style>