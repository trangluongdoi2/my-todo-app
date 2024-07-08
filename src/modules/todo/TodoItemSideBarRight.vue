<template>
  <v-divider vertical></v-divider>
  <div class="details-container h-full min-w-[500px] max-w-[500px] p-2 overflow-y-auto">
    <!-- <div class="details-container">
    </div> -->
    <div class="details-status w-[80px] h-[32px] flex items-center justify-center">
      <div class="rounded-[0.25rem] bg-light-blue h-full w-full">Done</div>
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
  </div>
</template>

<script setup lang="ts">
import AvatarUrl from '@/assets/avatar.jpeg';
import AppTimeTracking from '@/core/components/AppTimeTracking.vue';
import { computed, onMounted } from 'vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
    // const packageName = require('packageName');
  }
});

const percentTimeTracking = computed(() => {
  return 50;
})

onMounted(() => {
  console.log(props.item, 'props.item...');
});
</script>

<style lang="scss" scoped>

</style>