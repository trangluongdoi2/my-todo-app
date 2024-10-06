<template>
  <div class="flex flex-col gap-y-8">
    <template v-for="log in historyLogs" :key="log.id">
      <TodoStatusLog :log="log" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onActivated, ref } from 'vue';
import { TTodoStatusLog } from '@/types/todo-item';
import TodoApi from './api/todoApi';
import TodoStatusLog from './components/TodoStatusLog.vue';

const props = defineProps({
  todoId: {
    type: [String, Number],
    required: true,
  },
});
const historyLogs = ref<TTodoStatusLog[]>([]);

const getHistoryLogs = async () => {
  historyLogs.value = await TodoApi.getHistoryLogs(props.todoId as string);
};

onActivated(async () => {
  console.log('onActivated...');
  await getHistoryLogs();
});
</script>
