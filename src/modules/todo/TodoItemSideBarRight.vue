<template>
  <div v-if="loading" class="overflow-y-auto">
    <SkeletonTodoSideBarRight />
  </div>
  <div v-else>
    <v-divider vertical />
    <div class="details-container flex flex-col gap-y-4 h-full min-w-[400px] max-w-[500px] p-2 overflow-y-auto">
      <div class="details-status bg-[#42B883] rounded-[0.25rem] w-fit h-[32px] flex items-center justify-center p-2">
        <span class="font-bold text-[#1D2125]">{{ capitalize(item.todoStatus, false) }}</span>
      </div>
      <div class="flex flex-row justify-between items-center gap-y-4">
        <h2 class="title max-w-[170px]">Assignee</h2>
        <div class="content w-[60%] h-full">
          <app-select-editable v-model="currentAssignee" :options="listPriority" />
        </div>
      </div>
      <div class="flex flex-row justify-between items-center gap-x-4">
        <h2 class="title max-w-[170px]">Priority</h2>
        <div class="content w-[60%] h-full">
          <app-select-editable v-model="currentSelect" :options="listPriority" />
        </div>
      </div>
      <div class="flex flex-row justify-between items-center gap-x-4">
        <h2 class="title max-w-[170px]">Orignal Estimate</h2>
        <div class="content w-[60%] h-full">
          <app-editable v-model="originalEstimate"/>
        </div>
      </div>
      <div class="flex flex-row justify-between items-start gap-x-4">
        <h2 class="title max-w-[170px]">Time Tracking</h2>
        <div class="content w-[60%] max-h-[40px] flex flex-col gap-y-1 justify-center">
          <AppTimeTracking v-model:time="percentTimeTracking"/>
          <div class="text-[0.75rem]">Remaining: 1h</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, reactive, ref } from 'vue';
import { capitalize } from '@/common/string-utils';
import { Priority, TodoItemDetails } from '@/types/todo-item';
import AppTimeTracking from '@/core/components/AppTimeTracking.vue';
import SkeletonTodoSideBarRight from './skeleton/SkeletonTodoSideBarRight.vue';

defineProps({
  item: {
    type: Object as PropType<any>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  }
});

const todoExpandnfos = reactive({
  priority: 'Medium',
  originalEstimate: '1h',
});

const percentTimeTracking = computed(() => {
  return 50;
});

const todoDetails = ref<TodoItemDetails>();
const originalEstimate = ref<string>('');
const currentSelect = ref<Priority>();
const currentAssignee = ref<string>('');

const listPriority = [
  { label: Priority.HIGHEST, icon: 'highest' },
  { label: Priority.HIGH, icon: 'high' },
  { label: Priority.MEDIUM, icon: 'medium' },
  { label: Priority.LOW, icon: 'low' },
];

const rules = {
  required: (value: string) => {
    const timeFormats = ['w', 'd', 'h', 'm'];
    const ruleFormat = 'Your estimate must be in the format 2h 4d 6w';
    const time = value[value.length - 1] ?? '';
    if (!timeFormats.includes(time)) {
      const inValid =  ruleFormat;
      return inValid;
    }
    return Boolean(value);
  },
}
</script>
<style lang="scss" scoped>
.details-container {
  h2 {
    font-weight: bold;
    color: $text-accent-blue-bolder;
    font-size: 0.75rem;
  }
}
</style>