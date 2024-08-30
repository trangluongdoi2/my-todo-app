<template>
  <div class="dashboard w-full h-full" :class="{'dashboard-list': isListMode}">
    <h1>Today</h1>
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
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DisplayMode, TodoItem } from '@/types';
import EventBus from '@/core/composables/useEventbus';
import TodoItemsTable from './components/TodoItemsTable.vue';
import TodoItemsGrid from './components/TodoItemsGrid.vue';
import TodoDataActions from './components/TodoDataActions.vue';
import TodoApi from './api/todo';

const isListMode = ref<boolean>(true);
const isFetchingTodosList = ref<boolean>(false);
const currentItemsList = ref<any>([]);
const displayMode = ref<DisplayMode>('grid');

const getListItems = async () => {
  isFetchingTodosList.value = true;
  const res = await TodoApi.getTodosList().finally(() => {
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

onMounted(() => {
  EventBus.on('CREATED_TODO', addNewTodoItem);
  getListItems();
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

