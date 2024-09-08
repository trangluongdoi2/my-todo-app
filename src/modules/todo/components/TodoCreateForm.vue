<template>
 <v-form validate-on="blur lazy" @submit.prevent>
    <div class="flex flex-col gap-y-4">
      <AppSelect
        :loading="isFetchingProjects"
        label="Project"
        v-model:currentSelect="todoForm.projectId"
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
import { TProject } from '@/types/project';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import ProjectApi from '@/modules/project/api/projectApi';

const authStore = useAuthStore();
const { userIdSelected } = storeToRefs(authStore);

const emit = defineEmits(['change']);

const initialTodoItem: TodoItem = {
  projectId: 0,
  todoName: 'The First Issue' + Math.floor(Math.random() * 10),
  title: 'The My Title',
  label: 'The First Label' + Math.floor(Math.random() * 10),
  assignee: ['User 1'],
  description: 'This is the first description',
  priority: Priority.MEDIUM,
  todoStatus: TodoStatus.PENDING,
}

const todoForm = reactive(initialTodoItem);

const currentFiles = ref<File[]>();
const isFetchingProjects = ref(false);

const listPriority = [
  { label: Priority.HIGHEST, icon: 'highest' },
  { label: Priority.HIGH, icon: 'high' },
  { label: Priority.MEDIUM, icon: 'medium' },
  { label: Priority.LOW, icon: 'low' },
];

const listProjects = ref<{ label: string, value: number }[]>([]);

const getProjectsByUserId = async () => {
  isFetchingProjects.value = true;
  const res = await ProjectApi.getProjectsByUserId(userIdSelected.value);
  listProjects.value = res.map((project: TProject) => ({
    label: project.projectName,
    value: project.id,
  }));
  initialTodoItem.projectId = listProjects.value[0].value;
  isFetchingProjects.value = false;
};

watch(todoForm, () => {
  emit('change', todoForm);
}, { immediate: true, deep: true });

onMounted(() => {
  getProjectsByUserId();
});
</script>