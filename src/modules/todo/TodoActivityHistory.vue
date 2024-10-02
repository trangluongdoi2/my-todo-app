<template>
  <div class="flex flex-col gap-y-8">
    <template v-for="log in history" :key="log.id">
      <TodoStatusLog :log="log" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { TTodoStatusLog } from '@/types';
import TodoStatusLog from './components/TodoStatusLog.vue';

defineProps({
  history: {
    type: Array as PropType<TTodoStatusLog[]>,
    required: true,
  },
});
</script>