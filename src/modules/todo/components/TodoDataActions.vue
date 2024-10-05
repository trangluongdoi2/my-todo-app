<template>
  <div class="todo-data-actions w-full flex justify-end gap-x-2">
    <app-button color="#161A1D" @click="$emit('change-mode', 'table')">
      <template v-slot:append>
        <v-icon color="#FFFFFF" icon="custom:table" size="small" />
      </template>
      Table View
    </app-button>
    <app-button color="#161A1D" @click="$emit('change-mode', 'grid')">
      <template v-slot:append>
        <v-icon color="#FFFFFF" icon="custom:grid" size="small" />
      </template>
      List View
    </app-button>
  </div>
</template>
<script setup lang="ts">
defineEmits(['change-mode']);
</script>