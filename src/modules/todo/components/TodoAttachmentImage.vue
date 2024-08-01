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
    <AppImage :src="src" cover />
    <app-button
      v-if="isHovering"
      class="icon"
      type="text"
      size="24"
      @click.stop="$emit('download')"
    >
      <v-icon icon="custom:download" />
    </app-button>
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
  }
});

defineEmits(['download']);

const isHovering = ref<boolean>(false);
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