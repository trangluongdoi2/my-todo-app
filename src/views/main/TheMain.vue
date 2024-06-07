<template>
  <div class="main flex flex-col w-full h-full">
    <TheHeader />
    <div class="main-content">
      <TheSidebar />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheHeader from './TheHeader.vue';
import TheMainDashboard from './TheMainDashboard.vue';
import TheSidebar from './TheSidebar.vue';

</script>

<style lang="scss" scoped>
.main {
  background-color: $dark-base;
  &-content {
    display: flex;
    flex: 1 1 0;
  }
}
</style>

