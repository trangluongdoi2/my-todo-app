<template>
  <v-divider vertical></v-divider>
  <div class="details-container flex flex-col gap-y-4 h-full min-w-[500px] max-w-[500px] p-2 overflow-y-auto">
    <div class="details-status bg-[#42B883] rounded-[0.25rem] w-fit h-[32px] flex items-center justify-center p-1">
      <span class="bold text-[#1D2125]">{{ item.todoStatus }}</span>
    </div>
    <div class="flex flex-row justify-between items-center gap-y-4">
      <h2 class="title max-w-[170px]">Assignee</h2>
      <div class="content w-[60%] h-full flex items-center gap-x-2">
        <v-avatar size="28" :image="AvatarUrl" />
        <span>Nguyen Tan Vinh</span>
      </div>
    </div>
    <div class="flex flex-row justify-between items-center gap-x-4">
      <h2 class="title max-w-[170px]">Priority</h2>
      <div class="content w-[60%] h-full">
        <AppSelectEditable v-model="currentSelect" :options="listPriority"></AppSelectEditable>
      </div>
    </div>
    <!-- <div class="flex flex-row justify-between items-center gap-x-4">
      <h2 class="title max-w-[170px]">Test</h2>
      <div class="content w-[60%] h-full">
        <AppEditable v-model="todoDetails.priority"/>
      </div>
    </div> -->
    <div class="flex flex-row justify-between items-center gap-x-4">
      <h2 class="title max-w-[170px]">Orignal Estimate</h2>
      <div class="content w-[60%] h-full">
        <AppEditable v-model="originalEstimate"/>
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
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, reactive, ref, watch } from 'vue';
import AvatarUrl from '@/assets/avatar.jpeg';
import AppEditable from '@/core/components/AppEditable.vue';
import AppSelectEditable from '@/core/components/AppSelectEditable.vue';
import AppTimeTracking from '@/core/components/AppTimeTracking.vue';
import { Priority } from '@/type';

const props = defineProps({
  item: {
    type: Object as PropType<any>,
    required: true,
  }
});


const todoExpandnfos = reactive({
  priority: 'Medium',
  originalEstimate: '1h',
});

const percentTimeTracking = computed(() => {
  return 50;
});

const todoDetails = ref<any>();
const originalEstimate = ref<string>('');
const currentSelect = ref<Priority>();

const listPriority = [
  { label: Priority.HIGHEST, icon: 'highest' },
  { label: Priority.HIGH, icon: 'high' },
  { label: Priority.MEDIUM, icon: 'medium' },
  { label: Priority.LOW, icon: 'low' },
];

const rules = {
  required: (value: string) => {
    console.log(value, 'value...');
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