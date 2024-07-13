<template>
  <div class="flex gap-x-2">
    <div class="avatar">
      <v-avatar size="28" :image="AvatarUrl" />
    </div>
    <v-text-field v-model="comment"></v-text-field>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AvatarUrl from '@/assets/avatar.jpeg';
const comment = ref<string>();
</script>

<style lang="scss" scoped>

</style>