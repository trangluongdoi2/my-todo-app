<template>
  <AppModal
    v-model:visible="visible"
    titleOk="Create Todo"
    title="Create"
    max-width="50%"
  >
    <template v-slot:default>
      <TodoCreateForm @change="onChange"/>
    </template>
    <template v-slot:actions>
       <div class="flex items-center justify-end gap-x-2 p-[24px] pt-0">
        <app-button variant="text" @click="handleCancel">
          Cancel
        </app-button>
        <app-button class="button-create" color="#42B883" :loading="loadingSubmit" @click="handleOk">
          Create Todo
        </app-button>
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppModal from '@/core/components/AppModal.vue';
import TodoCreateForm from './TodoCreateForm.vue';
import TodoApi from '../api/todo';
import EventBus from '@/core/composables/useEventbus';

const visible = defineModel('visible', { type: Boolean, default: false });
const loadingSubmit = ref<boolean>(false);

const todoData = ref();

const onChange = (data: any) => {
  todoData.value = data;
};

const handleOk = () => {
  loadingSubmit.value = true;
  TodoApi.createTodo(todoData.value)
    .then((data) => {
      EventBus.emit('CREATED_TODO', data);
    })
    .finally(() => {
      loadingSubmit.value = false;
      visible.value = false;
    });
};

const handleCancel = () => {
  visible.value = false;
};
</script>