<template>
  <template v-if="loading">
    <SkeletonTodoGrid />
  </template>
  <div v-else class="h-full flex flex-col overflow-hidden">
    <div class="flex w-full gap-x-2 h-[3rem]">
      <h2 class="bg-[#161A1D] text-[#8C9BAB] flex flex-1 min-w-[10rem] items-center pl-2 rounded-t-[4px]">
        PENDING {{ itemsPending.length }}
      </h2>
      <h2 class="bg-[#161A1D] text-[#8C9BAB] flex flex-1 min-w-[10rem] items-center pl-2 rounded-t-[4px]">
        IN PROGRESS {{ itemsInProgress.length }}
      </h2>
      <h2 class="bg-[#161A1D] text-[#8C9BAB] flex flex-1 min-w-[10rem] items-center pl-2 rounded-t-[4px]">
        DONE {{ itemsDone.length }}
      </h2>
    </div>
    <TodoDraggableGrid
      v-if="items?.length"
      :items="items"

      @delete-item="onDeleteItem"
      @edit-item="onEditItem"
      @update-item-status="onEditItemStatus"
    />
    <div v-else class="flex flex-col flex-1 gap-y-2 items-center justify-center">
      There are no todo items in this project
      <app-button
        color="#42B883"
        @click="isShowCreateTodoModal = true"
      >
        Create Todo
      </app-button>
    </div>
    <TodoDeleteModal
      :title="'Delete'"
      v-model="isVisibleTodoDeleteModal"
      :loading="isLoadingDelete"
      @cancel="resetCurrentItem"
      @ok="handleDeleteItem"
    />
    <TodoCreateModal v-model:visible="isShowCreateTodoModal" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import router from '@/router';
import { TodoItem, TodoStatus } from '@/types/todo-item';
import TodoDeleteModal from './modal/TodoDeleteModal.vue';
import TodoDraggableGrid from './TodoDraggableGrid.vue';
import TodoCreateModal from './modal/TodoCreateModal.vue';
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

const emit = defineEmits<{
  (e: 'edit-item', item: TodoItem): void,
  (e: 'delete-item', id: string): void,
  (e: 'update-item-status', item: TodoItem): void
}>();

const itemsInProgress = ref<TodoItem[]>([]);
const itemsPending = ref<TodoItem[]>([]);
const itemsDone = ref<TodoItem[]>([]);
const selectedTodoItem = ref<TodoItem>();
const isVisibleTodoDeleteModal = ref<boolean>(false);
const isLoadingDelete = ref<boolean>(false);
const isShowCreateTodoModal = ref<boolean>(false);

const onDeleteItem = (item: TodoItem) => {
  selectedTodoItem.value = item;
  isVisibleTodoDeleteModal.value = true;
}

const onEditItem = (item: TodoItem) => {
  selectedTodoItem.value = item;
  router.push({
    name: 'todoDetails',
    params: {
      todoId: selectedTodoItem.value.id,
    }
  });
}

const onEditItemStatus = async (item: TodoItem) => {
  if (!item) {
    return;
  }
  emit('update-item-status', item);
}

const handleDeleteItem = () => {
  if (!selectedTodoItem.value) {
    return;
  }
  isLoadingDelete.value = true;
  emit('delete-item', selectedTodoItem.value.id);
  isLoadingDelete.value = false;
  isVisibleTodoDeleteModal.value = false;
}

const resetCurrentItem = () => {
  selectedTodoItem.value = null;
}

watch(() => props.items, () => {
  itemsInProgress.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.IN_PRORGESS);
  itemsDone.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.DONE);
  itemsPending.value = props.items.filter((item: TodoItem) => item.todoStatus === TodoStatus.PENDING);
}, { immediate: true, deep: true });

</script>