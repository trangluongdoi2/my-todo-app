<template>
  <TodoCommentInput :todo-id="item.id" @change="handleAddComment" />
  <div class="flex flex-col mt-2 gap-y-2">
    <template v-for="comment in currentComments" :key="comment.id">
      <TodoComment
        :comment="comment"
        :todo-id="item.id"

        @update-comment="handleUpdateComment" 
        @delete-comment="handleDeleteComment"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { TodoItemDetails, TTodoComment, TTodoCommentInput } from '@/types/todo-item';
import TodoApi from '@/modules/todo/api/todoApi';
import { useNotificationStore } from '@/store/notificationStore';
import { useAuthStore } from '@/store/authStore';
import TodoComment from '@/modules/todo/components/TodoComment.vue';
import TodoCommentInput from '@/modules/todo/components/TodoCommentInput.vue';
import EventBus from '@/core/composables/useEventbus';

defineOptions({
  inheritAttrs: false,
});

const authStore = useAuthStore();
const { currentUser } = storeToRefs(authStore);
const notificationStore = useNotificationStore();

const props = defineProps({
  item: {
    type: Object as PropType<TodoItemDetails>,
    required: true,
  },
});

const currentComments = ref<TTodoComment[]>([]);

const handleAddComment = async (data: TTodoCommentInput) => {
  TodoApi.addComment<TTodoCommentInput>(data.todoId as string, data).then((res) => {
    currentComments.value.push(res as unknown as TTodoComment);
    notificationStore.setSuccess('Add comment successfully');
    EventBus.emit('CHANGE_COMMENTS');
  }).catch(() => {
    notificationStore.setError('Add comment failed');
  });
};

const handleUpdateComment = (data: TTodoComment) => {
  const index = currentComments.value.findIndex((comment) => comment.id === data.id);
  if (index !== -1) {
    currentComments.value[index].content = data.content;
  }
  TodoApi.updateComment(data.id as string, {
    content: data.content,
    userId: currentUser.value.id,
    todoId: props.item.id as string,
  }).then(() => {
    notificationStore.setSuccess('Update comment successfully');
    EventBus.emit('CHANGE_COMMENTS');
  }).catch(() => {
    notificationStore.setError('Update comment failed');
  });
};

const handleDeleteComment = (data: TTodoComment) => {
  currentComments.value = currentComments.value.filter((comment) => comment.id !== data.id);
  TodoApi.deleteComment(data.id as string).then(() => {
    notificationStore.setSuccess('Delete comment successfully');
    EventBus.emit('CHANGE_COMMENTS');
  }).catch(() => {
    notificationStore.setError('Delete comment failed');
  });
};

onMounted(async () => {
  currentComments.value = props.item.comments;
});
</script>