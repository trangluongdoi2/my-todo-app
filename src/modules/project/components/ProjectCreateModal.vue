<template>
  <AppModal
    v-model:visible="visible"
    titleOk="Create New Project"
    title="Create"
    max-width="50%"
  >
    <template v-slot:default>
      <ProjectCreateNewForm @change="onChange($event)" />
    </template>
    <template v-slot:actions>
       <div class="flex items-center justify-end gap-x-2">
        <app-button variant="text" @click="handleCancel">
          Cancel
        </app-button>
        <app-button 
          class="button-create"
          color="#42B883"
          :loading="loadingSubmit" 
          @click="handleOk"
        >
          Create New Project
        </app-button>
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppModal from '@/core/components/AppModal.vue';
import ProjectCreateNewForm from '@/modules/project/components/ProjectCreateNewForm.vue';
import ProjectApi from '@/modules/project/api/projectApi';
import { useAuthStore } from '@/store/authStore';
import { storeToRefs } from 'pinia';
import EventBus from '@/core/composables/useEventbus';
import { useNotificationStore } from '@/store/notificationStore';

const errorHandlingStore = useNotificationStore();
const visible = defineModel('visible', { type: Boolean, default: false });
const loadingSubmit = ref<boolean>(false);
const authStore = useAuthStore();
const { userIdSelected } = storeToRefs(authStore);

const projectData = ref();

const onChange = (data: any) => {
  projectData.value = {
    ...data,
    members: [userIdSelected.value],
  };
};

const handleOk = async () => {
  loadingSubmit.value = true;
  const data = await ProjectApi.createProject(projectData.value);
  if (data) {
    EventBus.emit('CREATED_PROJECT', data);
  }
  loadingSubmit.value = false;
  visible.value = false;
  if (ProjectApi.error) {
    errorHandlingStore.setMessage(ProjectApi.error);
  }
};

const handleCancel = () => {
  visible.value = false;
};
</script>