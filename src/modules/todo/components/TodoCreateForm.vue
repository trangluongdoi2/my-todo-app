<template>
 <v-form validate-on="blur lazy" @submit.prevent="submit">
    <div class="flex flex-col gap-y-4">
    <AppSelect
      label="Project"
      v-model:currentSelect="todoForm.projects[0]"
      :items="listProjects"
    />
      <AppInput v-model="todoForm.todoName" :required="true" label="Name" />
      <AppInput v-model="todoForm.title" label="Title" />
      <AppInput v-model="todoForm.label" :required="true" label="Label" />
      <AppInput v-model="todoForm.description" :required="true" label="Description" />
      <AppDragDropUpload label="Attachments" v-model="currentFiles"/>
      <AppSelect
        label="Piority"
        v-model:currentSelect="todoForm.priority"
        :items="listPriority">
        <template v-slot:default="{ item }">
          {{ item.label }}
        </template>
      </AppSelect>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { TodoItem, Priority, TodoStatus } from '@/types';
import AppInput from '@/core/components/AppInput.vue';
import AppSelect from '@/core/components/AppSelect.vue';
import AppDragDropUpload from '@/core/components/AppDragDropUpload.vue';

const emit = defineEmits(['change']);

const initIssue: TodoItem = {
  projects: ['The First Project' + Math.floor(Math.random() * 10)],
  todoName: 'The First Issue' + Math.floor(Math.random() * 10),
  title: 'The My Title',
  label: 'The First Label' + Math.floor(Math.random() * 10),
  assignee: 'Nguyen Tan Vinh' + Math.floor(Math.random() * 10),
  description: 'This is the first description',
  priority: Priority.MEDIUM,
  todoStatus: TodoStatus.PENDING,
}

const todoForm = reactive(initIssue);

const currentFiles = ref<File[]>();

const listPriority = [
  { label: Priority.HIGHEST, icon: 'highest' },
  { label: Priority.HIGH, icon: 'high' },
  { label: Priority.MEDIUM, icon: 'medium' },
  { label: Priority.LOW, icon: 'low' },
];

// need get api to get projects...
const listProjects = [
  { label: 'Project 1' },
  { label: 'Project 2' },
  { label: 'Project 3' },
  { label: 'Project 4' },
];

const submit = () => {
  console.log(todoForm, 'todoForm...');
};

onMounted(() => {
  console.log('onMounted..');
});

watch(() => todoForm, () => {
  emit('change', todoForm);  
}, { immediate: true, deep: true });

</script>

<style lang="scss" scoped>
.test3 {
  :deep(.v-list-item) {
    .v-list-item__prepend > .v-icon ~ .v-list-item__spacer {
      width: 1px;
    }
  }
}
</style>