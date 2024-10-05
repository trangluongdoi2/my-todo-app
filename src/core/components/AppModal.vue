<template>
  <v-dialog
    v-bind="$attrs"
    v-model="visible"
  >
    <slot name="header">
      <div class="modal-header flex items-center justify-between pl-[24px] pr-[24px] pt-[12px] pb-[12px]">
        <div v-if="title" class="text-lg font-bold">{{ title }}</div>
        <div v-else class="flex flex-1"></div>
        <v-btn variant="text" icon size="10">
          <v-icon icon="mdi-close" @click="handleCancel"/>
        </v-btn>
      </div>
      <v-divider />
    </slot>
    <div class="modal-content overflow-y-auto p-[24px] pt-[12px] pb-[12px]">
      <slot />
    </div>
    <v-divider />
    <div class="modal-actions w-100 pl-[24px] pr-[24px] pt-[12px] pb-[12px]">
      <slot name="actions">
        <div class="flex items-center justify-end gap-x-2">
          <app-button variant="text" @click="handleCancel">
            {{ titleCancel }}
          </app-button>
          <app-button color="#FD9891" @click="handleOk" >
            {{ titleOk }}
          </app-button>
        </div>
      </slot>
    </div>
  </v-dialog>
</template>
<script setup lang="ts">
import { defineModel, defineEmits } from 'vue';

const visible = defineModel('visible', { type: Boolean, default: false });

defineProps({
  title: {
    type: String,
    default: '',
  },
  titleCancel: {
    type: String,
    default: 'Cancel',
  },
  titleOk: {
    type: String,
    default: 'Oke',
  }
});

const emit = defineEmits(['ok', 'cancel']);

const handleCancel = () => {
  visible.value = false;
  emit('cancel');
};

const handleOk = () => {
  visible.value = false;
  emit('ok');
};

</script>