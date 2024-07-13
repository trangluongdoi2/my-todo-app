<template>
  <v-divider vertical></v-divider>
  <div class="details-container flex flex-col gap-y-4 h-full min-w-[500px] max-w-[500px] p-2 overflow-y-auto">
    <div class="details-status bg-light-green rounded-[0.25rem] w-[80px] h-[32px] flex items-center justify-center">
      Done
    </div>
    <div class="flex flex-row justify-between items-center gap-y-4">
      <h2 class="title max-w-[170px]">Assignee</h2>
      <div class="content w-[60%] flex gap-x-2">
        <v-avatar size="28" :image="AvatarUrl" />
        <span>Nguyen Tan Vinh</span>
      </div>
    </div>
    <div class="flex flex-row justify-between items-center gap-x-4">
      <h2 class="title max-w-[170px]">Time Tracking</h2>
      <div class="content w-[60%]">
        <AppTimeTracking v-model:time="percentTimeTracking"/>
      </div>
    </div>
    <div class="flex flex-row justify-between items-center gap-x-4">
      <h2 class="title max-w-[170px]">Priority</h2>
      <div class="content w-[60%]">
        Medium
      </div>
    </div>
    <div class="flex flex-row justify-between items-center gap-x-4">
      <h2 class="title max-w-[170px]">Test</h2>
      <div class="content w-[60%]">
        <AppEditable v-model="item.priority"/>
      </div>
    </div>
    <div class="flex flex-row justify-between items-center gap-x-4">
      <h2 class="title max-w-[170px]">Orignal Estimate</h2>
      <div class="content w-[60%]">
         <!-- <v-text-field
          :rules="[rules.required]"
         ></v-text-field> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarUrl from '@/assets/avatar.jpeg';
import AppEditable from '@/core/components/AppEditable.vue';
import AppTimeTracking from '@/core/components/AppTimeTracking.vue';
import { computed, onMounted, PropType, reactive } from 'vue';

const props = defineProps({
  item: {
    type: Object as PropType<any>,
    required: true,
  }
});

const todoExpandnfos = reactive({
  priority: 'Medium',
  originalEstimate: '1h',
})

const percentTimeTracking = computed(() => {
  return 50;
});

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
    return !!value;
  },
}

onMounted(() => {
  console.log(props.item, 'props.item...');
});
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