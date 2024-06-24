<template>
  <div class="dashboard w-full h-full">
    <!-- <AppCard v-for="item in 7" :key="item" /> -->
  </div>
  <AppModal
    v-model:visible="visible"
    titleOk="Create Issue"
    title="Create"
    max-width="80%"
  >
    <template v-slot:default>
      <!-- <v-card
        prepend-icon="mdi-map-marker"
        text="Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running."
        title="Use Google's location service?"
      >
      </v-card> -->
      <div>Hello Modal</div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import EventBus from '@/core/composables/useEventbus';
import AppModal from '@/core/components/AppModal.vue';
import { onMounted, onUnmounted, ref } from 'vue';

const visible = ref<boolean>(false);

const showCreateIssueModal = () => {
  visible.value = true;
}

onMounted(() => {
  EventBus.on('CREATE_ISSUE', showCreateIssueModal);
});

onUnmounted(() => {
  EventBus.off('CREATE_ISSUE', showCreateIssueModal);
});
</script>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, 15rem);
  grid-template-rows: repeat(auto-fill, 20rem);
  grid-gap: 10px;
  padding: 1rem;
  overflow-y: auto;
  justify-content: start;
}
</style>

