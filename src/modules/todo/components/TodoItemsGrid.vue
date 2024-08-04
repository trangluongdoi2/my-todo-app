<template>
  <template v-if="loading">
    <SkeletonTodoGrid />
  </template>
  <div v-else class="h-full flex flex-col overflow-hidden">
    <div class="flex w-full mb-2 gap-x-[10px] h-[3rem]">
      <div class="bg-[#161A1D] text-[#8C9BAB] flex flex-1 min-w-[10rem] items-center pl-2 rounded-t-[4px]">
        PENDING {{ itemsPending.length }}
      </div>
      <div class="bg-[#161A1D] text-[#8C9BAB] flex flex-1 min-w-[10rem] items-center pl-2 rounded-t-[4px]">
        IN PROGRESS {{ itemsInProgress.length }}
      </div>
      <div class="bg-[#161A1D] text-[#8C9BAB] flex flex-1 min-w-[10rem] items-center pl-2 rounded-t-[4px]">
        DONE {{ itemsDone.length }}
      </div>
    </div>
    <TodoDraggableGrid
      :items="items"

      @delete-item="onDeleteItem"
      @edit-item="onEditItem"
      @edit-item-status="onEditItemStatus"
    />
    <TodoDeleteModal
      v-if="isVisibleTodoDeleteModal"
      :title="'Delete'"
      v-model="isVisibleTodoDeleteModal"
      :loading="isLoadingDelete"
      @cancle="resetCurrentItem"
      @ok="handleDeleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import router from '@/router';
import { TodoItem, TodoStatus } from '@/types';
import TodoDeleteModal from './TodoDeleteModal.vue';
import TodoDraggableGrid from './TodoDraggableGrid.vue';
import TodoApi from '@/modules/todo/api/todo';
import SkeletonTodoGrid from '../skeleton/SkeletonTodoGrid.vue';

const props = defineProps({
  items: {
    type: Array as PropType<TodoItem[]>,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

const itemsInProgress = ref<TodoItem[]>([]);
const itemsPending = ref<TodoItem[]>([]);
const itemsDone = ref<TodoItem[]>([]);
const selectedTodoItem = ref<TodoItem>();
const isVisibleTodoDeleteModal = ref<boolean>(false);
const isVisibleTodoEditModal = ref<boolean>(false);
const isLoadingDelete = ref<boolean>(false);

const filterItemsByStatus = (item: TodoItem) => {
  const { id, todoStatus } = item;
  switch (todoStatus) {
    case TodoStatus.DONE:
      itemsDone.value = itemsDone.value.filter((todo: TodoItem) => todo.id !== id);
      break;
    case TodoStatus.IN_PROGESS:
      itemsInProgress.value = itemsInProgress.value.filter((todo: TodoItem) => todo.id !== id);
    case TodoStatus.PENDING:
    default:
      itemsPending.value = itemsPending.value.filter((todo: TodoItem) => todo.id !== id);
      break;
  }
}

const onDeleteItem = (item: TodoItem) => {
  selectedTodoItem.value = item;
  isVisibleTodoDeleteModal.value = true;
}

const onEditItem = (item: TodoItem) => {
  selectedTodoItem.value = item;
  isVisibleTodoEditModal.value = false;
  router.push({
    params: {
      id: selectedTodoItem.value.id,
    }
  })
}

const onEditItemStatus = async (item: TodoItem) => {
  if (!item) {
    return;
  }
  const data = await TodoApi.updateTodo(item);
  console.log(data, 'data onEditItemStatus...');
}

const handleDeleteItem = () => {
  if (!selectedTodoItem.value) {
    return;
  }
  isLoadingDelete.value = true;
  TodoApi.deleteTodo(selectedTodoItem.value.id)
    .then(() => {
      filterItemsByStatus(selectedTodoItem.value);
    })
    .finally(() => {
      isLoadingDelete.value = false;
      isVisibleTodoDeleteModal.value = false;
    })
}

const resetCurrentItem = () => {
  selectedTodoItem.value = null;
}

watch(() => props.items, () => {
  itemsInProgress.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.IN_PROGESS);
  itemsDone.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.DONE);
  itemsPending.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.PENDING);
}, { immediate: true, deep: true });

</script>