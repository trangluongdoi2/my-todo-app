<template>
  <v-dialog
    v-bind="$attrs"
    v-model="visible"
  >
    <slot name="header">
      <div class="modal-header flex items-center justify-between p-[24px]">
        <div v-if="title" class="text-lg font-bold">{{ title }}</div>
        <div v-else class="flex flex-1"></div>
        <v-btn variant="text">
          <v-icon icon="mdi-close" @click="handleCancel"/>
        </v-btn>
      </div>
    </slot>
    <div class="modal-content p-[24px] pt-0">
      <slot />
    </div>
    <slot name="actions">
      <div class="flex items-center justify-end gap-x-2 p-[24px] pt-0">
        <v-btn variant="text" @click="handleCancel">
          {{ titleCancel }}
        </v-btn>
        <v-btn color="#42B883" @click="handleOk">
          {{ titleOk }}
        </v-btn>
      </div>
    </slot>
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