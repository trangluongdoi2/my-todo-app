<template>
  <div class="flex gap-x-2">
    <div class="avatar">
      <v-avatar size="32" :image="AvatarUrl" />
    </div>
    <div class="flex-1 flex gap-y-2 flex-col">
      <v-text-field 
        v-if="!isShowInput" 
        placeholder="Add a comment" 
        :hide-details="true" 
        @update:focused="focusInput"
      />
      <app-text-area v-else v-model="commentContent" />
      <div v-if="isShowInput" class="flex gap-x-2">
        <app-button
          :color="'#42B883'"
          class="button_save-comment"
          :textColor="'#1D2125'"
          @click="onAddComment"
        >
          Save
        </app-button>
        <app-button
          class="button_cancel-comment"
          @click="reset"
        >
          Cancel
        </app-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import AvatarUrl from '@/assets/avatar.jpeg';
import { useAuthStore } from '@/store/authStore';

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);

const commentContent = ref<string>('');
const isShowInput = ref<boolean>(false);

const props = defineProps({
  todoId: {
    type: [Number, String],
    required: true,
  },
});
const emit = defineEmits(['change']);

const reset = () => {
  isShowInput.value = false;
  commentContent.value = '';
}

const onAddComment = () => {
  const newComment = {
    content: commentContent.value,
    userId: currentUser.value.id,
    todoId: props.todoId,
  };
  emit('change', newComment);
  reset();
};

const focusInput = () => {
  isShowInput.value = true;
};

</script>

<style lang="scss" scoped>
.button_save-comment, .button_cancel-comment {
  height: 24px;
  width: 24px;
  :deep(.v-btn__content) {
    font-weight: bold;
  }
}
</style>