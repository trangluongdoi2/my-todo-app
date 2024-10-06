<template>
 <v-form validate-on="blur lazy" @submit.prevent>
    <div class="flex flex-col gap-y-4">
      <app-select
        :loading="isFetchingProjects"
        label="Project"
        v-model:currentSelect="todoForm.projectId"
        :items="listProjects"
      />
      <app-input v-model="todoForm.todoName" :required="true" label="Name" />
      <app-input v-model="todoForm.title" label="Title" />
      <app-input v-model="todoForm.label" :required="true" label="Label" />
      <app-text-area v-model="todoForm.description" :required="true" label="Description" />
      <AppDragDropUpload label="Attachments" v-model:files="currentFiles" />
      <app-select
        label="Piority"
        v-model:currentSelect="todoForm.priority"
        :items="listPriority">
        <template v-slot:default="{ item }">
          {{ item.label }}
        </template>
      </app-select>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { TProject } from '@/types/project';
import { Priority, TodoInput, TodoStatus } from '@/types/todo-item';
import { useAuthStore } from '@/store/authStore';
import ProjectApi from '@/modules/project/api/projectApi';
import AppDragDropUpload from '@/core/components/AppDragDropUpload.vue';

const authStore = useAuthStore();
const { userIdSelected } = storeToRefs(authStore);

const emit = defineEmits(['change']);

const initialTodoItem: TodoInput = {
  todoName: '',
  title: '',
  label: '',
  description: '',
  priority: Priority.MEDIUM,
  todoStatus: TodoStatus.PENDING,
  files: [],
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
  if (!res) {
    return isFetchingProjects.value = false;;
  }
  listProjects.value = res.map((project: TProject) => ({
    label: project.projectName,
    value: project.id,
  }));
  initialTodoItem.projectId = listProjects.value[0].value;
  isFetchingProjects.value = false;
};

watch(currentFiles, () => {
  todoForm.files = currentFiles.value;
}, { immediate: true, deep: true });

watch(todoForm, () => {
  const newTodoForm = {
    ...todoForm,
    files: currentFiles.value,
  }
  emit('change', newTodoForm);
}, { immediate: true, deep: true });

onMounted(() => {
  getProjectsByUserId();
});
</script>