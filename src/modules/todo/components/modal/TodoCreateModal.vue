<template>
  <app-modal
    v-model:visible="visible"
    titleOk="Create Todo"
    title="Create"
    max-width="50%"
  >
    <template v-slot:default>
      <TodoCreateForm @change="onChange" />
    </template>
    <template v-slot:actions>
       <div class="flex items-center justify-end gap-x-2">
        <app-button variant="text" @click="handleCancel">
          Cancel
        </app-button>
        <app-button
          class="button-create"
          color="#42B883"
          :loading="loadingSubmit"
          @click="handleOk"
        >
          Create Todo
        </app-button>
      </div>
    </template>
  </app-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EventBus from '@/core/composables/useEventbus';
import TodoApi from '@/modules/todo/api/todoApi';
import TodoCreateForm from '@/modules/todo/components/TodoCreateForm.vue';

const visible = defineModel('visible', { type: Boolean, default: false });

const loadingSubmit = ref<boolean>(false);
const todoData = ref<any>();

const onChange = (data: any) => {
  todoData.value = data;
};

const handleOk = async () => {
  loadingSubmit.value = true;
  const { files, ...inputTodo } = todoData.value;
  const data = await TodoApi.createTodo(inputTodo);
  if (files?.length) {
    TodoApi.uploadAttachs({
      todoId: data.id,
      projectId: data.projectId,
      files: files || [],
    }).then(() => {
      EventBus.emit('CREATED_TODO', data);
      }).finally(() => {
        visible.value = false;
        loadingSubmit.value = false;
      })
  } else {
    EventBus.emit('CREATED_TODO', data);
    visible.value = false;
    loadingSubmit.value = false;
  }
};

const handleCancel = () => {
  visible.value = false;
};
</script>