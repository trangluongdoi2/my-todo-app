<template>
  <div class="details">
    <div class="details-title"></div>
    <div class="details-content">
      <div class="flex flex-col gap-y-2">
        <div>Tittle</div>
        <div>Tittle</div>
        <div>Tittle</div>
        <div>Tittle</div>
      </div>
    </div>
    <div class="details-comment"></div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
defineProps({
  item: {
    type: Object,
    default: undefiend,
  }
})
</script>

<style scoped>

</style>