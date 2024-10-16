<template>
  <div class="dashboard w-full h-full" :class="{'dashboard-list': isListMode}">
    <div class="w-full flex justify-between items-center">
      <h1>{{ selectedProject?.projectName }}</h1>
      <div class="flex gap-x-2">
        <v-tooltip text="Edit project" location="bottom">
          <template v-slot:activator="{ props }">
            <app-button
              type="text"
              size="28"
              v-bind="props"
              @click="navigateToProjectSettings()"
            >
            <v-icon icon="custom:edit" /> 
            </app-button>
          </template>
        </v-tooltip>
        <v-tooltip text="Project settings" location="bottom">
          <template v-slot:activator="{ props }">
            <app-button
              icon
              type="text"
              size="28"
              v-bind="props"
              @click="navigateToProjectSettings()"
            >
            <v-icon icon="custom:setting" /> 
            </app-button>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete project" location="bottom">
          <template v-slot:activator="{ props }">
            <app-button
              icon
              type="text"
              size="28"
              v-bind="props"
              @click="onShowDeleteProjectModal()"
            >
            <v-icon color="#FD9891" icon="custom:delete" /> 
            </app-button>
          </template>
        </v-tooltip>
      </div>
    </div>
    <v-divider></v-divider>
    <TodoDataActions @change-mode="onChangeMode"/>
    <keep-alive>
      <div class="h-full overflow-hidden">
        <TodoItemsTable
          v-if="displayMode === 'table'" 
          :items="currentItemsList" 
          :loading="isFetchingTodosList"
        />
        <TodoItemsGrid 
          v-else
          :items="currentItemsList"
          :loading="isFetchingTodosList"

          @delete-item="deleteTodo"
          @update-item-status="updateTodoStatus"
        />
      </div>
    </keep-alive>
  </div>
  <ProjectDeleteModal
    v-if="isShowProjectDeleteModal"
    :projectId="projectId"
    v-model:visible="isShowProjectDeleteModal"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { DisplayMode } from '@/types';
import { TodoItem } from '@/types/todo-item';
import TodoApi from './api/todoApi';
import EventBus from '@/core/composables/useEventbus';
import { useGlobalStates } from '@/core/composables/useGlobalStates';
import ProjectDeleteModal from '@/modules/project/components/ProjectDeleteModal.vue';
import TodoItemsTable from './components/TodoItemsTable.vue';
import TodoItemsGrid from './components/TodoItemsGrid.vue';
import TodoDataActions from './components/TodoDataActions.vue';
import { useProjectStore } from '@/store/projectStore';

const router = useRouter();
const projectStore = useProjectStore();
const { selectedProject } = storeToRefs(projectStore);
const { projectId } = useGlobalStates();

const isListMode = ref<boolean>(true);
const isFetchingTodosList = ref<boolean>(false);
const isShowProjectDeleteModal = ref<boolean>(false);
const currentItemsList = ref<TodoItem[]>([]);
const displayMode = ref<DisplayMode>('grid');

const getListItems = async () => {
  isFetchingTodosList.value = true;
  const res = await TodoApi.getTodosByProjectId(projectId.value || 1).finally(() => {
    setTimeout(() => {
      isFetchingTodosList.value = false;
    }, 100);
  });
  currentItemsList.value = res;
};

const onChangeMode = (mode: DisplayMode) => {
  displayMode.value = mode;
};

const addNewTodoItem =  (todo: TodoItem) => {
  currentItemsList.value.splice(0, 0, todo);
}

const deleteTodo = (todoId: string) => {
  currentItemsList.value = currentItemsList.value.filter((item: TodoItem) => item.id !== todoId);
  TodoApi.deleteTodo(todoId);
}

const updateTodoStatus = (newTodo: TodoItem) => {
  const index = currentItemsList.value.findIndex((item: TodoItem) => item.id === newTodo.id);
  if (index > -1) {
    currentItemsList.value[index] = { ...newTodo };
  }
  TodoApi.updateTodoByField({ id: newTodo.id, field: 'todoStatus', value: newTodo.todoStatus });
}

const onShowDeleteProjectModal = () => {
  isShowProjectDeleteModal.value = true;
}

const navigateToProjectSettings = () => {
  router.push({ name: 'projectSettings', params: { projectId: projectId.value } });
}

onMounted(() => {
  EventBus.on('CREATED_TODO', addNewTodoItem);
  getListItems();
  projectStore.mounted(projectId.value);
});

onUnmounted(() => {
  EventBus.off('CREATED_TODO', addNewTodoItem);
});
</script>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, 15rem);
  grid-template-rows: repeat(auto-fill, 20rem);
  grid-gap: 10px;
  padding: 1rem;
  overflow-y: auto;
  justify-content: start;
  &-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
}
</style>

