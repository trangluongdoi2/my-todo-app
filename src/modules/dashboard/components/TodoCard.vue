<template>
  <div
    class="todo-card relative flex flex-col p-4"
    @mouseover="isHover = true"
    @mouseleave="isHover = false"
  >
    <div class="todo-title flex-1">{{ item.title }}</div>
    <div class="todo-more flex justify-between">
      <div class="project">{{ item.project }}</div>
      <div class="avatar">
        <v-avatar size="28" :image="AvatarUrl" />
      </div>
    </div>
    <div v-if="isHover" class="absolute top-[0.25rem] right-[0.25rem]">
      <v-tooltip text="Edit" location="top">
        <template v-slot:activator="{ props }">
          <AppButton
            class="icon-actions"
            icon
            size="28"
            type="text"
            @click="$emit('edit-item', item)"
            v-bind="props"
          >
            <v-icon color="#42B883" icon="custom:edit" />
          </AppButton>
        </template>
      </v-tooltip>
      <v-tooltip text="Delete" location="top">
        <template v-slot:activator="{ props }">
          <AppButton
            icon
            class="icon-actions"
            size="28"
            type="text"
            v-bind="props"
             @click="$emit('delete-item', item)"
          >
            <v-icon color="#FD9891" icon="custom:delete" />
          </AppButton>
        </template>
      </v-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarUrl from '@/assets/avatar.jpeg';
import AppButton from '@/core/components/AppButton.vue';
import { TodoItem } from '@/type';
import { PropType, ref } from 'vue';

const emit = defineEmits<{
  (e: 'edit-item', item: TodoItem): void
  (e: 'delete-item', item: TodoItem): void
}>()

const props = defineProps({
  item: {
    type: Object as PropType<TodoItem>,
    required: true,
  },
});

const isHover = ref<boolean>(false);

</script>

<style lang="scss" scoped>
.todo-card {
  border-radius: 0.25rem;
  background-color: $background-input;
  height: clamp(20rem, 1vw + 20rem, 25rem);
  &:hover {
    background-color: $background-selected
  }
  .icon-actions {
    &:hover {
      background-color: gray;
    }
  }
}
</style>