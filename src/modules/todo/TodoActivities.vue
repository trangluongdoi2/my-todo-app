<template>
  <div class="options flex gap-x-2 justify-between items-center mb-2">
    <div class="flex items-center gap-x-2">
      <p>Show:</p>
      <v-chip label @click="onSelectTab(Tab.ALL)">All</v-chip>
      <v-chip label @click="onSelectTab(Tab.COMMENTS)">Comments</v-chip>
      <v-chip label @click="onSelectTab(Tab.HISTORY)">History</v-chip>
    </div>
    <div>
      <app-button icon variant="text">
        <v-icon icon="custom:add"></v-icon>
      </app-button>
    </div>
  </div>
  <div class="activities">
    <keep-alive>
      <component :is="activitiesComponentName" :history="item.statusLogs"/>
    </keep-alive>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue';
import { TodoItemDetails } from '@/types';
import TodoActivityComments from '@/modules/todo/TodoActivityComments.vue';
import TodoActivityAll from '@/modules/todo/TodoActivityAll.vue';
import TodoActivityHistory from '@/modules/todo/TodoActivityHistory.vue';

enum Tab {
  ALL = 'ALL',
  COMMENTS = 'COMMENTS',
  HISTORY = 'HISTORY',
}

const props = defineProps({
  item: {
    type: Object as PropType<TodoItemDetails>,
    required: true,
  },
});
const selectedTab = ref<Tab>(Tab.COMMENTS);

const onSelectTab = (tab: Tab) => {
  selectedTab.value = tab;
}

const layouts = {
  'ALL': TodoActivityAll,
  'COMMENTS': TodoActivityComments,
  'HISTORY': TodoActivityHistory
};

const activitiesComponentName = computed(() => layouts[selectedTab.value]);
onMounted(() => {
  console.log(props.item, 'props.item...');
});
</script>