<template>
  <div class="flex flex-col w-full h-full">
    <div>Breadcrumbs...</div>
    <div class="flex h-full w-full overflow-hidden">
      <!-- <div class="flex-1">Div1</div> -->
      <TodoItemDetails class="flex-1" v-if="item" :item="item" />
      <TodoItemSideBarRight v-if="item" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import TodoApi from './api/todo';
import TodoItemSideBarRight from '@/modules/todo/TodoItemSideBarRight.vue';
import TodoItemDetails from '@/modules/todo/TodoItemDetails.vue';
// import { TodoItem, TodoItemDetails } from '@/type';

const route = useRoute();
const item = ref<any>();

const getDetails = async () => {
  const { id } = route.params;
  if (id) {
    item.value = await TodoApi.getTodoById(id as string);
    const { createdAt } = item.value;
    console.log(createdAt, 'createdAt..');
  }
}

onBeforeMount(() => {
  getDetails();
})
</script>

<style scoped>

</style>