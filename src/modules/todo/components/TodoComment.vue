<template>
  <div class="flex gap-x-2">
    <div class="avatar">
      <v-avatar size="28" :image="AvatarUrl" />
    </div>
    <div class="comment-content flex flex-col gap-y-[0.25rem]">
      <div class="content__overview flex gap-x-1">
        <span>Nguyen Tan Vinh</span>
        <span class="text-[#8C9BAB]">June 27, 2024 at 13:01 PM</span>
      </div>
      <div class="content__details">
        <p>
          Hi We believe there is confusion with this feature.
          The name of the layer item can only be changed when the text element is added to the canvas for the first time.
          When we change the name directly at the layer the name stays the same regardless of the text changes; it only changes when you rename it directly.
          You can check it out with the video below. If you have any more issues or want to update, please feedback to me. Thank you so much!
        </p>
      </div>
      <div class="content__actions flex items-center gap-x-2">
        <app-button
          variant="text"
          density="compact"
          class="action__edit"
          @click="onEdit"
        >
          Edit
        </app-button>
        <app-button
          variant="text"
          density="compact"
          class="action__delete"
           @click="onDelete"
        >
          Delete
        </app-button>
        <div v-if="listEmoji?.length > 0">
          <div>Emoji 1</div>
          <div>Emoji 2</div>
          <div>Emoji 3</div>
        </div>
        <span>Emoji Picker...</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarUrl from '@/assets/avatar.jpeg';
import { ref } from 'vue';

const listEmoji = ref<any>([]);
const onEdit = () => {
  console.log('onEdit...');
};

const onDelete = () => {
  console.log('onDelete...');
}
</script>

<style lang="scss" scoped>
.comment-content {
  font-size: 0.875rem;
  .content {
    &__actions {
      .action__edit, .action__delete {
        :deep(.v-btn__content) {
          font-weight: bold;
          color: $text;
          width: fit-content;
          height: fit-content;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>