<template>
  <div class="issues-container h-full overflow-hidden">
    <div class="flex w-full mb-2 gap-x-[10px] h-[3rem]">
      <div class="bg-[#161A1D] text-[#8C9BAB] flex items-center flex-1 pl-2 rounded-t-[4px]">TODO</div>
      <div class="bg-[#161A1D] text-[#8C9BAB] flex items-center flex-1 pl-2 rounded-t-[4px]">PENDING</div>
      <div class="bg-[#161A1D] text-[#8C9BAB] flex items-center flex-1 pl-2 rounded-t-[4px]">DONE</div>
    </div>
    <v-layout class="issues-grid overflow-y-auto">
      <div class="issue-todo flex flex-col gap-y-2">
        <TodoCard
          v-if="itemsTodo.length"
          v-for="(item, index) in itemsTodo"
          :key="index" 
          :item="item"

          @delete-item="onDeleteItem"
          @edit-item="onEditItem"
        />
        <!-- <v-skeleton- -->
      </div>
      <div class="issue-inprogress flex flex-col gap-y-2">
        <TodoCard
          v-for="(item, index) in itemsInProgress" 
          :key="index"
          :item="item"

          @delete-item="onDeleteItem"
          @edit-item="onEditItem"
        />
      </div>
      <div class="issue-done flex flex-col gap-y-2">
        <TodoCard
          v-for="(item, index) in itemsDone"
          :key="index"
          :item="item"

          @delete-item="onDeleteItem"
          @edit-item="onEditItem"
        />
      </div>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, PropType } from 'vue';
import { TodoItem } from '@/type';
import TodoCard from './TodoCard.vue';

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
const itemsDone = ref<TodoItem[]>([]);
const itemsTodo = ref<TodoItem[]>([]);

const onDeleteItem = (item: TodoItem) => {
  console.log('onDeleteItem...');
}

const onEditItem = (item: TodoItem) => {
  console.log('onEditItem...');
}



onMounted(() => {
  itemsInProgress.value = props.items.filter((item: any) => item.status === 'PENDING');
  itemsDone.value = props.items.filter((item: any) => item.status === 'DONE');
  itemsTodo.value = props.items.filter((item: any) => item.status === 'TODO');
});

</script>

<style lang="scss" scoped>
.issues-container {
  height: 100%;
  .issues-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    height: 100%;
    .issue-done, .issue-inprogress, .issue-todo {
      border-radius: 0.5rem;
      padding: 0.5rem;
    }
    .issue-todo {
      background-color: $surface-suken;
    }
    .issue-inprogress {
      background-color: $surface-suken;
    }
    .issue-done {
      background-color: $surface-suken;
    }
  }
}
</style>