<template>
  <div class="todo-data-actions w-full flex justify-end gap-x-2">
    <v-tooltip text="Table View" location="top">
      <template v-slot:activator="{ props }">
        <AppButton
          @click="$emit('change-mode', 'table')"
          v-bind="props"
        >
          <template v-slot:append>
            <v-icon color="#FFFFFF" icon="custom:table" size="small" />
          </template>
          Table View
        </AppButton>
      </template>
    </v-tooltip>
    <v-tooltip text="Grid View" location="top">
      <template v-slot:activator="{ props }">
        <AppButton
          @click="$emit('change-mode', 'grid')"
          v-bind="props"
        >
          <template v-slot:append>
            <v-icon color="#FFFFFF" icon="custom:grid" size="small" />
          </template>
          List View
        </AppButton>
      </template>
    </v-tooltip>
  </div>
</template>
<script setup lang="ts">
import AppButton from '@/core/components/AppButton.vue';
defineEmits(['change-mode']);
</script>
<style lang="scss" scoped>
</style>