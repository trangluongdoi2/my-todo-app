<template>
  <div class="container-header w-full flex items-center">
    <div class="header-icon">
      <AppButton class="button-dashboard" variant="text" color="white" @click="backToDashboard">
        To do App
      </AppButton>
    </div>
    <div class="header-middle flex-1">
      <TheHeaderActionMiddle  @on-create-todo="isShowCreateTodoModal = true"/>
    </div>
    <div class="header-right">
      <TheHeaderActions />
    </div>
  </div>
  <v-divider color="white" />
  <TodoCreateModal v-model:visible="isShowCreateTodoModal"/>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TodoCreateModal from '@/modules/todo/components/TodoCreateModal.vue';
import AppButton from '@/core/components/AppButton.vue';
import TheHeaderActionMiddle from './TheHeaderActionMiddle.vue';
import TheHeaderActions from './TheHeaderActions.vue';

const isShowCreateTodoModal = ref<boolean>(false);

const router = useRouter();

const backToDashboard = () => {
  router.push({ name: 'dashboard' });
};


</script>
<style lang="scss" scoped>
.container-header {
  height: 60px;
  padding: 8px;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  gap: 10px;
  .button-dashboard {
    width: fit-content;
    // &:hover {
    //   background-color: transparent;
    // }
    :deep(.v-btn__content) {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>

