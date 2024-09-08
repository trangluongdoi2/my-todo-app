<template>
  <template v-if="isAdmin">
    <div class="container-header w-full flex items-center">
      <div class="header-icon">
        <AppButton class="button-dashboard" variant="text" color="white" @click="backToDashboard">
          To do App
        </AppButton>
      </div>
      <div class="header-middle flex-1">
        <TheHeaderActionMiddle
          @create-todo="isShowCreateTodoModal = true"
          @create-project="isShowCreateProjectModal = true"
        />
      </div>
      <div class="header-right">
        <TheHeaderActions />
      </div>
    </div>
    <v-divider color="white" />
    <TodoCreateModal v-model:visible="isShowCreateTodoModal" />
    <ProjectCreateModal v-model:visible="isShowCreateProjectModal" />
  </template>
  <template v-else>
    <div class="flex-1">
    </div>
    <div class="header-right">
      <TheHeaderActions />
    </div>
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import TodoCreateModal from '@/modules/todo/components/TodoCreateModal.vue';
import AppButton from '@/core/components/AppButton.vue';
import ProjectCreateModal from '@/modules/project/components/ProjectCreateModal.vue';
import TheHeaderActionMiddle from './TheHeaderActionMiddle.vue';
import TheHeaderActions from './TheHeaderActions.vue';
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';

const isShowCreateTodoModal = ref<boolean>(false);
const { isAdmin } = storeToRefs(useAuthStore());
const isShowCreateProjectModal = ref<boolean>(false);

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
    :deep(.v-btn__content) {
      text-transform: uppercase;
      font-weight: bold;
    }
  }
}
</style>

