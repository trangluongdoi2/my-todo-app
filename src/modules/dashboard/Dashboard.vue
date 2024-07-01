<template>
  <div class="dashboard w-full h-full" :class="{'dashboard-list': isListMode}">
    <h1>Today</h1>
    <v-divider></v-divider>
    <TodoDataActions @change-mode="onChangeMode"/>
    <keep-alive>
      <div>
        <TodoItemsTable v-if="displayMode === 'table'" :items="currentItemsList" :loading="isFetchingTodosList"/>
        <TodoItemsGrid v-else :items="currentItemsList" :loading="isFetchingTodosList"/>
      </div>
    </keep-alive>
  </div>
  <TodoCreateModal v-model:visible="visible"/>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DisplayMode, TodoItem } from '@/type';
import EventBus from '@/core/composables/useEventbus';
import TodoCreateModal from './components/TodoCreateModal.vue';
import TodoItemsTable from './components/TodoItemsTable.vue';
import TodoItemsGrid from './components/TodoItemsGrid.vue';
import TodoDataActions from './components/TodoDataActions.vue';
import TodoApi from './api/todo';

const visible = ref<boolean>(false);
const isListMode = ref<boolean>(true);
const isFetchingTodosList = ref<boolean>(false);
const currentItemsList = ref<any>([]);
const displayMode = ref<DisplayMode>('grid');

const getListItems = async () => {
  isFetchingTodosList.value = true;
  const res = await TodoApi.getTodosList();
  isFetchingTodosList.value = false;
  currentItemsList.value = res;
};

const showTodoCreateModal = () => {
  visible.value = true;
};

const onChangeMode = (mode: DisplayMode) => {
  displayMode.value = mode;
};

const updateTodo =  (todo: TodoItem) => {
  currentItemsList.value.splice(0, 0, todo);
}

onMounted(() => {
  EventBus.on('CREATE_TODO', showTodoCreateModal);
  EventBus.on('CREATED_TODO', updateTodo);
  getListItems();
});

onUnmounted(() => {
  EventBus.off('CREATE_TODO', showTodoCreateModal);
  EventBus.off('CREATED_TODO', updateTodo);
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

