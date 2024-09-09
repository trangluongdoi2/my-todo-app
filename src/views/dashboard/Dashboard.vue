<template>
  <!-- <DashboardAdmin v-if="isAdmin" /> -->
  <DashboardAdmin />
  <!-- <DashboardGuest v-else /> -->
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/store/auth';
import DashboardAdmin from './DashboardAdmin.vue';
import DashboardGuest from './DashboardGuest.vue';

const authStore = useAuthStore();
const { isAdmin } = storeToRefs(authStore);

</script>
<style scoped lang="scss">
.dashboard__container {
  width: 100%;
  height: 100%;
  padding: 0 40px;
  .dashboard__projects {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  h2.link {
    color: $green-base;
    line-height: 1.14286;
    font-weight: 500;
    letter-spacing: -0.003em;
    :hover {
      text-decoration: underline;
    }
  }
}
</style>