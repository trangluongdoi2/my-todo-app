<template>
  <v-snackbar
    v-if="visible"
    v-model="visible"
    v-bind="$attrs"
    :color="iconColor"
  >
    <div class="flex items-center justify-between" :class="classText">
      <slot />
      <v-icon :icon="iconToast" color="#FFFFFF" size="40"/>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { defineModel, defineProps, computed, PropType } from 'vue';
import { NotificationType } from '@/types';

const props = defineProps({
  type: {
    type: String as PropType<NotificationType>,
    default: 'success',
  }
});

const visible = defineModel({ type: Boolean, required: true });

const iconToast = computed(() => {
  if (props.type === 'success') {
    return 'custom:done';
  }
  if (props.type === 'error') {
    return 'custom:error';
  }
  if (props.type === 'warning') {
    return 'custom:warning'
  }
});

const iconColor = computed(() => {
  if (props.type === 'success') {
    return '#42B883';
  }
  if (props.type === 'error') {
    return '#FD9891';
  }
  if (props.type === 'warning') {
    return '#F5CD47';
  }
});

const classText = computed(() => {
  if (props.type === 'success') {
    return 'text-success';
  }
  if (props.type === 'error') {
    return 'text-danger';
  }
  if (props.type === 'warning') {
    return 'text-warning';
  }
});
</script>
<style scoped lang="scss">
:deep(.v-snackbar__content) {
  padding: 6px 12px;
}
:deep(.text-success),
:deep(.text-danger),
:deep(.text-warning) {
  p {
    color: white;
    font-weight: bold;
  }
}
</style>
