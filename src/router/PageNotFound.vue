<template>
  <div class="w-full h-full flex flex-col items-center justify-center">
    <h1>Not Found Page</h1>
    <app-button color="#42B883" class="mt-2" @click="goBackHome">
      Go Back Home
    </app-button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const goBackHome = () => {
  router.push({ name: 'dashboard' });
};
</script>