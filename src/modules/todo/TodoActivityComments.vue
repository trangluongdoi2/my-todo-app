<template>
  <div>
    <TodoCommentInput />
    <div class="flex flex-col gap-y-2">
      <template v-for="n in 3" :key="n">
        <TodoComment />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import TodoComment from '@/modules/todo/components/TodoComment.vue';
import TodoCommentInput from '@/modules/todo/components/TodoCommentInput.vue';

</script>

<style lang="scss" scoped>

</style>