<template>
  <div class="container-header w-full flex items-center">
    <div class="header-icon">
      <AppButton variant="plain" color="white" @click="backToDashboard">
        To do App
      </AppButton>
    </div>
    <div class="header-middle flex-1">
      <div class="flex items-center space-between">
        <AppButton :color="'#42B883'" v-if="!isMobileScreen" @click="onCreateIssue">Create</AppButton>
        <AppButton :color="'#42B883'" v-else type="text" @click="onCreateIssue">
          <v-icon :icon="'mdi-plus'"/>
        </AppButton>
        <div class="min-w-0 flex-1 shrink-0"></div>
        <TheHeaderTab :mobileMode="isMobileScreen"/>
    </div>
  </div>
  <div class="header-right">
    <TheHeaderActions />
    </div>
  </div>
  <v-divider color="white" />
</template>

<script setup lang="ts">
import AppButton from '@/core/components/AppButton.vue';
import TheHeaderActions from './TheHeaderActions.vue';
import TheHeaderTab from './TheHeaderTab.vue';
import { useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';
import EventBus from '@/core/composables/useEventbus';

const isMobileScreen = ref<boolean>(false);

const router = useRouter();

const backToDashboard = () => {
  router.push({ name: 'dashboard' });
}

const onCreateIssue = () => {
  EventBus.emit('CREATE_TODO');
};

const checkHiddenCreateIssueButton = () => {
  isMobileScreen.value = window.innerWidth < 768;
};

onMounted(() => {
  window.addEventListener('resize', checkHiddenCreateIssueButton);
  checkHiddenCreateIssueButton();
});

onUnmounted(() => {
  window.removeEventListener('resize', checkHiddenCreateIssueButton);
});

</script>
<style lang="scss" scoped>
.v-list {
  background-color: transparent;
  :deep(.v-list-item__spacer) {
    display: none;
  }
}
.container-header {
  height: 60px;
  padding: 8px;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  gap: 10px;
}
</style>

