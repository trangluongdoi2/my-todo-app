<template>
  <div>
    <div class="flex gap-x-2">
      <div class="avatar">
        <v-avatar size="32" :image="AvatarUrl" />
      </div>
      <div class="w-full flex gap-y-2 justify-between">
        <template v-if="!isShowInput">
          <div class="w-full">
            <span class="status-content">
              <strong>{{ currentUser.username }}</strong>
            </span>
            <div class="comment-content">
              <p>{{ comment.content }}</p>
            </div>
          </div>
          <h2 class="min-w-fit history-time">{{ time }}</h2>
        </template>
        <app-text-area class="w-full mb-1" v-else v-model="currentComment" />
      </div>
    </div>
    <template v-if="!isShowInput">
      <div class="content__actions flex items-center gap-x-2">
        <app-button
          class="action__edit"
          variant="text"
          @click="onEdit"
        >
          Edit
        </app-button>
        <app-button
          class="action__delete"
          :textColor="'#FD9891'"
          variant="text"
          @click="onDelete"
        >
          Delete
        </app-button>
      </div>
    </template>
    <template v-else>
      <div class="content__actions flex items-center gap-x-2">
        <app-button
          class="action__edit"
          :color="'#42B883'"
          :textColor="'#1D2125'"
          @click="onUpdateComment"
        >
          Save
        </app-button>
        <app-button
          class="action__edit"
          @click="onCancelUpdateComment"
        >
          Cancel
        </app-button>
      </div>
    </template>
    <TodoCommentDeleteModal
      title="Delete Comment"
      v-model="isShowDeleteCommentModal"
      @ok="emit('delete-comment', comment)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, PropType, ref } from 'vue';
import { TTodoComment } from '@/types/todo-item';
import { formatDateToDDMMYYWithDayjs } from '@/common/date';
import AvatarUrl from '@/assets/avatar.jpeg';
import TodoCommentDeleteModal from '@/modules/todo/components/modal/TodoCommentDeleteModal.vue';

const props = defineProps({
  comment: {
    type: Object as PropType<TTodoComment>,
    required: true,
  },
  todoId: {
    type: [Number, String],
    required: true,
  },
});

const emit = defineEmits(['update-comment', 'delete-comment']);

const currentComment = ref<string>(props.comment.content);
const listEmoji = ref<any>([]);
const isShowInput = ref<boolean>(false);
const isShowDeleteCommentModal = ref<boolean>(false);

const time = computed(() => formatDateToDDMMYYWithDayjs(props.comment.updatedAt));
const currentUser = computed(() => props.comment.user);

const onEdit = () => {
  console.log('onEdit...');
  isShowInput.value = true;
};

const onCancel = () => {
  isShowInput.value = false;
}

const onDelete = () => {
  console.log('onDelete...');
  isShowDeleteCommentModal.value = true;
}

const onUpdateComment = () => {
  const data = {
    ...props.comment,
    todoId: props.todoId,
    content: currentComment.value,
  }
  // console.log(data, '===> onUpdateComment...');
  emit('update-comment', data);
  isShowInput.value = false;
}

const onCancelUpdateComment = () => {
  isShowInput.value = false;
  currentComment.value = props.comment.content;
}
onMounted(() => {
  console.log(props.comment, '===> onMounted...');
  // currentComment.value = props.comment.content;
})
</script>
<style lang="scss" scoped>
.content {
  &__actions {
    margin-left: 40px;
    :deep(.v-btn) {
      padding: 0;
      height: 24px;
    }
    .action__edit, .action__delete {
      :deep(.v-btn__content) {
        font-weight: bold;
        padding: 0;
      }
    }
  }
}
</style>