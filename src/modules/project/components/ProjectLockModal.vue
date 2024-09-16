<template>
  <app-modal
    title="Delete project"
    v-model:visible="visible"
    max-width="50%"
  >
    <template v-slot:default>
      <div class="flex flex-col items-center justify-center">
        <p class="text-[#FD9891]">Do you want lock this projects?</p>
        <p class="text-[#FD9891]">It will prevent all of members can access to this project!</p>
      </div>
    </template>
    <template v-slot:actions>
      <div class="flex items-center justify-end gap-x-2">
        <app-button variant="text" @click="handleCancel">Cancel</app-button>
        <app-button
          color="#FD9891"
          :loading="isLockingProject" 
          @click="handleOk"
        >
          Lock
        </app-button>
      </div>
    </template>
  </app-modal>
</template>

<script setup lang="ts">
import { ref, defineModel, defineProps } from 'vue';
import { useRouter } from "vue-router";
import ProjectApi from '@/modules/project/api/projectApi';

const router = useRouter();
const isLockingProject = ref<boolean>(false);
const visible = defineModel('visible', { type: Boolean, default: false });
const props = defineProps({
  projectId: {
    type: Number,
    required: true,
  },
});

const handleOk = () => {
  visible.value = false;
  isLockingProject.value = true;
  // ProjectApi.deleteProject(props.projectId).then(() => {
  //   isLockingProject.value = false;
  //   router.replace({ name: 'project' });
  // });
};

const handleCancel = () => {
  visible.value = false;
};

</script>

<style scoped lang="scss">

</style>