<template>
  <div class="header w-full flex items-center justify-between">
    <div class="child1">
      <AppButton variant="plain" color="white">
        To do App
      </AppButton>
    </div>
    <div class="header-middle">Child2</div>
    <div class="header-right">Child3</div>
  </div>
  <v-divider></v-divider>
</template>

<script setup lang="ts">
import AppButton from '@/core/components/AppButton.vue';
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  padding: 8px;
  position: sticky;
  top: 0;
  left: 0;
  gap: 10px;
  &-middle {
    flex: 1 1 0;
  }
  &-right {
    flex: 1 1 0;
  }
}
</style>

