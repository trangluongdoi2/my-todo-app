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
       <div class="flex items-center justify-end gap-x-2 p-[24px] pt-0">
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
import { useAuthStore } from '@/store/auth';
import { storeToRefs } from 'pinia';
import EventBus from '@/core/composables/useEventbus';

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
  console.log(projectData.value, 'handleOk..');
  ProjectApi.createProject(projectData.value).then((data) => {
    console.log(data, 'data..');
    if (data) {
      EventBus.emit('CREATED_PROJECT', data);
    }
  }).finally(() => {
    loadingSubmit.value = false;
    visible.value = false;
  })
};

const handleCancel = () => {
  visible.value = false;
};
</script>