<template>
  <div class="dashboard w-full h-full" :class="{'dashboard-list': isListMode}">
    <h1>Today</h1>
    <v-divider></v-divider>
    <TodoDataActions @change-mode="onChangeMode"/>
    <keep-alive>
      <template v-if="currentItemsList?.length">
        <TodoItemsTable v-if="displayMode === 'table'" :items="currentItemsList" :loading="isFetchingListIssue"/>
        <TodoItemsGrid v-else :items="currentItemsList" :loading="isFetchingListIssue"/>
      </template>
    </keep-alive>
  </div>
  <TodoCreateModal v-model:visible="visible"/>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { DisplayMode } from '@/type';
import EventBus from '@/core/composables/useEventbus';
import TodoCreateModal from './components/TodoCreateModal.vue';
import TodoItemsTable from './components/TodoItemsTable.vue';
import TodoItemsGrid from './components/TodoItemsGrid.vue';
import TodoDataActions from './components/TodoDataActions.vue';
import IssueApi from './api/issues';

const visible = ref<boolean>(false);
const isListMode = ref<boolean>(true);
const isFetchingListIssue = ref<boolean>(false);
const currentItemsList = ref<any>([]);
const displayMode = ref<DisplayMode>('grid');


const getListItems = async () => {
  isFetchingListIssue.value = true;
  const res = await IssueApi.getListTodos();
  isFetchingListIssue.value = false;
  currentItemsList.value = res;
};

const showCreateIssueModal = () => {
  visible.value = true;
};


const onChangeMode = (mode: DisplayMode) => {
  displayMode.value = mode;
};

onMounted(() => {
  EventBus.on('CREATE_ISSUE', showCreateIssueModal);
  getListItems();
});

onUnmounted(() => {
  EventBus.off('CREATE_ISSUE', showCreateIssueModal);
});
</script>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, 15rem);
  grid-template-rows: repeat(auto-fill, 20rem);
  grid-gap: 10px;
  padding: 1rem;
  overflow-y: auto;
  justify-content: start;
  &-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  // .list-container {
  //   display: flex;
  //   gap: 10px;
  // }
}
</style>

