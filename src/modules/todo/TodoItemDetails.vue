<template>
  <div class="overflow-y-auto">
    TodoItemDetails
    {{ item }}
  </div>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    required: true,
    // const packageName = require('packageName');
  }
});
</script>

<style lang="scss" scoped>

</style>