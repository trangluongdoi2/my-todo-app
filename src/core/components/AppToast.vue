<template>
  <v-snackbar
    v-if="visible"
    v-model="visible"
    v-bind="$attrs"
  >
    <div class="flex items-center justify-between">
      <slot />
      <v-icon :icon="iconToast" :color="iconColor" size="40"/>
    </div>
  </v-snackbar>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';

type ToastType = 'success' | 'error' | 'warning'

const props = defineProps({
  type: {
    type: String as PropType<ToastType>,
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
    return '#F5CD47'
  }
})

</script>