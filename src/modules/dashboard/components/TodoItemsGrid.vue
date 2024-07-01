<template>
  <div class="issues-container h-full overflow-hidden">
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
    <v-layout class="issues-grid overflow-y-auto">
      <div class="todo-pending flex flex-col gap-y-2">
        <TodoCard
          v-if="itemsPending.length"
          v-for="(item, index) in itemsPending"
          :key="index" 
          :item="item"

          @delete-item="onDeleteItem"
          @edit-item="onEditItem"
        />
      </div>
      <div class="todo-inprogress flex flex-col gap-y-2">
        <TodoCard
          v-for="(item, index) in itemsInProgress" 
          :key="index"
          :item="item"

          @delete-item="onDeleteItem"
          @edit-item="onEditItem"
        />
      </div>
      <div class="todo-done flex flex-col gap-y-2">
        <TodoCard
          v-for="(item, index) in itemsDone"
          :key="index"
          :item="item"

          @delete-item="onDeleteItem"
          @edit-item="onEditItem"
        />
      </div>
    </v-layout>
    <TodoDeleteModal
      :title="'Delete'"
      v-model="isVisibleTodoDeleteModal"
      :loading="isLoadingDelete"
      @cancle="resetCurrentItem"
      @ok="handleDeleteItem"
    />
    <!-- <TodoDraggableColumn :items="items"/> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, PropType, watch } from 'vue';
import { TodoItem, TodoStatus } from '@/type';
import TodoCard from './TodoCard.vue';
import TodoDraggableColumn from './TodoDraggableColumn.vue';
import TodoDeleteModal from './TodoDeleteModal.vue';
import TodoApi from '@/modules/dashboard/api/todo';
import router from '@/router';

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

const filterItemsByStatus = () => {
  const { id, status } = selectedTodoItem.value;
  console.log(status, 'status..');
  switch (status) {
    case TodoStatus.DONE:
      itemsDone.value = itemsDone.value.filter((todo: TodoItem) => todo.id !== id);
      break;
    case TodoStatus.INPROGESS:
      itemsInProgress.value = itemsInProgress.value.filter((todo: TodoItem) => todo.id !== id);
    case TodoStatus.PENDING:
    default:
      itemsPending.value = itemsPending.value.filter((todo: TodoItem) => todo.id !== id);
      break;
  }
}

const onDeleteItem = (item: TodoItem) => {
  console.log('onDeleteItem...');
  selectedTodoItem.value = item;
  isVisibleTodoDeleteModal.value = true;
}

const onEditItem = (item: TodoItem) => {
  console.log('onEditItem...');
  selectedTodoItem.value = item;
  isVisibleTodoEditModal.value = false;
  router.push({
    params: {
      id: selectedTodoItem.value.id,
    }
  })
}

const handleDeleteItem = () => {
  if (!selectedTodoItem.value) {
    return;
  }
  isLoadingDelete.value = true;
  TodoApi.deleteTodo(selectedTodoItem.value.id)
    .then(() => {
      filterItemsByStatus();
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
  itemsInProgress.value = props.items.filter((item: TodoItem) => item.status === TodoStatus.IN_PROGESS);
  itemsDone.value = props.items.filter((item: TodoItem) => item.status === TodoStatus.DONE);
  itemsPending.value = props.items.filter((item: TodoItem) => item.status === TodoStatus.PENDING);
}, { immediate: true, deep: true });

</script>

<style lang="scss" scoped>
.issues-container {
  height: 100%;
  .issues-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(10rem, 1fr));
    gap: 10px;
    height: 100%;
    .todo-done, .todo-inprogress, .todo-pending {
      border-radius: 0.5rem;
      padding: 0.5rem;
    }
    .todo-pending {
      background-color: $surface-suken;
    }
    .todo-inprogress {
      background-color: $surface-suken;
    }
    .todo-done {
      background-color: $surface-suken;
    }
  }
}
</style>