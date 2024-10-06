<template>
  <router-view></router-view>
  <app-toast
    v-model="visible"
    :timeout="2000"
    :type="status"
    location="top center"
  >
    <p>{{ message }}</p>
  </app-toast>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotificationStore } from './store/notificationStore';

const errorHandlingStore = useNotificationStore();
const { visible, message, status } = storeToRefs(errorHandlingStore);
</script>