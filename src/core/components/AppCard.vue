<template>
  <div class="card">
    <div class="card-image">
      <AppCustomImage :source="randomImage()" />
    </div>
    <div class="card-content">
      <h3 class="card__title">{{ item.title }}</h3>
      <p class="card__description">{{ item.description }}</p>
    </div>
    <div class="card-actions">
      <app-button
        icon
        class="icon-edit"
        variant="text"
        size="28"
      >
        <v-icon :icon="`custom:edit`" size="small" />
      </app-button>
      <app-button
        icon
        class="icon-delete"
        variant="text"
        size="28"
      >
        <v-icon :icon="`custom:delete`" size="small" />
      </app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { CardItem } from '@/type';
// import AppImage from './AppImage.vue';
import AppCustomImage from './AppCustomImage.vue';

const emits = defineEmits(['delete-item', 'edit-item']);

defineProps({
  item: {
    type: Object as PropType<CardItem>,
    // required: true,
    default: () => ({
      title: 'Title 1',
      description: 'Description 1',
      image: 'https://picsum.photos/200/300',
    }),
  }
})

const randomImage = () => {
  return 'https://picsum.photos/200/3000';
};

</script>

<style scoped lang="scss">
.card {
  background-color: #f0f0f0;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  position: relative;
  width: 15rem;
  height: 20rem;
  &:hover {
    .card-actions {
      opacity: 1;
    }
  }
  &-actions {
    position: absolute;
    top: 0.125rem;
    right: 0.125rem;
    opacity: 0;
    display: flex;
    gap: 4px;
    .icon-delete {
      background-color: $text-danger;
    }
    .icon-edit {
      background-color: $green-base;
    }
  }
  &-image {
    border-radius: 10px;
    width: 100%;
    height: 50%;
    .image {
      object-fit: cover;
      aspect-ratio: 3 / 2;
      width: 100%;
      height: 100%;
    }
  }
  &-content {
    flex: 1 1 0;
    .card__title {
      font-size: clamp(1rem, 1vw + 1rem, 2rem);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: red;
    }
    .card__description {
      // font-size: clamp(0.5rem, 1vw + 0.5rem, 1rem);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: red;
    }
  }
}
</style>