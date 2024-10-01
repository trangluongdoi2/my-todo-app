<template>
  <router-view></router-view>
  <app-toast
    v-model="visible"
    :timeout="2000"
    location="top center"
    type="error"
  >
    <p>{{ message }}</p>
  </app-toast>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useErrorHandlingStore } from './store/errorHandlingStore';

const errorHandlingStore = useErrorHandlingStore();
const { visible, message } = storeToRefs(errorHandlingStore);
</script>