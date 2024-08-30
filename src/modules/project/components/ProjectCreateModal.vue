<template>
  <AppModal
    v-model:visible="visible"
    titleOk="Create New Project"
    title="Create"
    max-width="50%"
  >
    <template v-slot:default>
      <ProjectCreateNewForm @change="onChange" />
    </template>
    <template v-slot:actions>
       <div class="flex items-center justify-end gap-x-2 p-[24px] pt-0">
        <app-button variant="text" @click="handleCancel">
          Cancel
        </app-button>
        <app-button class="button-create" color="#42B883" :loading="loadingSubmit" @click="handleOk">
          Create New Project
        </app-button>
      </div>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppModal from '@/core/components/AppModal.vue';
import ProjectApi from '../api/project';
import EventBus from '@/core/composables/useEventbus';
import ProjectCreateNewForm from '@/modules/project/components/ProjectCreateNewForm.vue';

const visible = defineModel('visible', { type: Boolean, default: false });
const loadingSubmit = ref<boolean>(false);

const projectData = ref();

const onChange = (data: any) => {
  projectData.value = data;
  console.log(projectData.value, 'projectData.value.`');
};

const handleOk = () => {
  loadingSubmit.value = true;
};

const handleCancel = () => {
  visible.value = false;
};
</script>