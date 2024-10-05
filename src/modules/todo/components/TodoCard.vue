<template>
  <div
    class="todo-card relative flex flex-col p-4"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
    @click="navigateToDetails(item.id)"
  >
    <div class="todo-title flex-1">{{ item.title }}</div>
    <div class="todo-more flex justify-between">
      <div class="avatar">
        <v-avatar size="28" :image="AvatarUrl" />
      </div>
    </div>
    <div v-if="true" class="absolute top-[0.25rem] right-[0.25rem]">
      <div class="flex gap-x-1">
        <v-tooltip text="Edit" location="top">
          <template v-slot:activator="{ props }">
            <app-button
              class="icon-actions"
              icon
              size="28"
              type="text"
              @click.stop="$emit('edit-item', item)"
              v-bind="props"
            >
              <v-icon color="#42B883" icon="custom:edit" />
            </app-button>
          </template>
        </v-tooltip>
        <v-tooltip text="Delete" location="top">
          <template v-slot:activator="{ props }">
            <app-button
              icon
              class="icon-actions"
              size="28"
              type="text"
              v-bind="props"
              @click.stop="$emit('delete-item', item)"
            >
              <v-icon color="#FD9891" icon="custom:delete" />
            </app-button>
          </template>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import AvatarUrl from '@/assets/avatar.jpeg';
import { TodoItem } from '@/types';
import { useRouter } from 'vue-router';

const emit = defineEmits<{
  (e: 'edit-item', item: TodoItem): void,
  (e: 'delete-item', item: TodoItem): void
}>()

const props = defineProps({
  item: {
    type: Object as PropType<TodoItem>,
    required: true,
  },
});

const isHover = ref<boolean>(false);
const router = useRouter();
const navigateToDetails = (todoId: string) => {
  router.push({
    name: 'todoDetails',
    params: {
      todoId,
    }
  });
};
onMounted(() => {
  // console.log(props.item, 'props.item');
});
</script>
<style lang="scss" scoped>
.todo-card {
  border-radius: 0.25rem;
  background-color: $background-input;
  min-height: 200px;
  border: 2px solid transparent;
  &:hover {
    background-color: $background-selected;
    border: 2px solid $blue-base;
  }
  .icon-actions {
    &:hover {
      background-color: gray;
    }
  }
}
</style>