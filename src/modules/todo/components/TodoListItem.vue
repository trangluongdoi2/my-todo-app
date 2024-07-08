<template>
  <div class="todo-list-item">
    <div class="item-content">
      <div>{{ item.id }}</div>
      <div>{{ item.title }}</div>
    </div>
    <div class="item-info">
      <v-icon :icon="item.status"></v-icon>
      <AppButton icon size="28">
        <v-avatar size="28" :image="AvatarUrl" />
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarUrl from '@/assets/avatar.jpeg';
import AppButton from '@/core/components/AppButton.vue';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

</script>

<style lang="scss" scoped>
.todo-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  padding: 4px;
  border-radius: 0.25rem;
  color: $text-brand;
  &:hover {
    background-color: $background-information-bold-hovered;
  }
}
</style>