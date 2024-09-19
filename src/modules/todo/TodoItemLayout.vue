<template>
  <div class="flex h-full w-full overflow-hidden">
    <TodoItemDetails class="flex-1" v-if="item" :item="item" :loading="isLoadingTodoItem" />
    <TodoItemSideBarRight v-if="item" :item="item" :loading="isLoadingTodoItem" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import TodoApi from './api/todoApi';
import TodoItemSideBarRight from '@/modules/todo/TodoItemSideBarRight.vue';
import TodoItemDetails from '@/modules/todo/TodoItemDetails.vue';

const route = useRoute();
const item = ref<any>();
const isLoadingTodoItem = ref<boolean>(false);

const getDetails = async () => {
  const { todoId } = route.params;
  if (todoId) {
    isLoadingTodoItem.value = true;
    item.value = await TodoApi.getTodoById(Number(todoId)).finally(() => {
      setTimeout(() => {
        isLoadingTodoItem.value = false;
      }, 500);
    });
  }
}

onBeforeMount(() => {
  getDetails();
})
</script>

<style lang="scss" scoped>
.breadcrumbs {
  position: sticky;
  top: 0;
  left: 0;
}
</style>