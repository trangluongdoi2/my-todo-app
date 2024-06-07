<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <h1>Not Found Page</h1>
    <a-button @click="goBackHome">
      Go Back Home
    </a-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goBackHome = () => {
  router.push({
    name: 'dashboard',
  });
};
</script>
<style lang="scss" scoped>
</style>
