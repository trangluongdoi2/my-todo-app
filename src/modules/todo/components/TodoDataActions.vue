<template>
  <div class="todo-data-actions w-full flex justify-end gap-x-2">
    <AppButton
      @click="$emit('change-mode', 'table')"
    >
      <template v-slot:append>
        <v-icon color="#FFFFFF" icon="custom:table" size="small" />
      </template>
      Table View
    </AppButton>
    <AppButton
      @click="$emit('change-mode', 'grid')"
    >
      <template v-slot:append>
        <v-icon color="#FFFFFF" icon="custom:grid" size="small" />
      </template>
      List View
    </AppButton>
  </div>
</template>
<script setup lang="ts">
import AppButton from '@/core/components/AppButton.vue';
defineEmits(['change-mode']);
</script>
<style lang="scss" scoped>
</style>