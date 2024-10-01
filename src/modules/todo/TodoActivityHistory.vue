<template>
  <div>
    TodoActivityHistory
    {{ JSON.stringify(history) }}
  </div>
</template>

<script setup lang="ts">
import { TodoStatusLog } from '@/types';
import { defineProps, PropType } from 'vue';

defineProps({
  history: {
    type: Array as PropType<TodoStatusLog[]>,
    required: true,
  },
});
</script>