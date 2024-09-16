<template>
  <div class="h-100 w-100 p-4 pt-[2px]">
    <AppBreadcrumbs :items="breadcrumbItems" />
    <div class="flex flex-col gap-y-4">
      <div class="content-item flex flex-col gap-y-2">
        <h2>More Options</h2>
        <v-card variant="outlined">
          <v-card-text>Oke</v-card-text>
        </v-card>
      </div>
      <div class="content-item flex flex-col gap-y-2">
        <h2 class="text-[#F15B50]">Danger Zone</h2>
        <v-card variant="outlined" color="#F15B50">
          <div class="flex flex-col gap-y-4 items-center p-[12px]">
            <template v-for="(item, index) in listEventsInDangerZone" :key="index">
              <div class="flex items-center justify-between w-100">
                <p>{{ item.desrciption }}</p>
                <app-button color="#F15B50" @click="item.event()">{{ item.name }}</app-button>
              </div>
            </template>
          </div>
        </v-card>
      </div>
    </div>
  </div>
  <ProjectDeleteModal :projectId="projectId" v-model:visible="isShowProjectDeleteModal" />
  <ProjectLockModal :projectId="projectId" v-model:visible="isShowProjectLockModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useGlobalStates } from '@/core/composables/useGlobalStates';
import AppBreadcrumbs, { BreadcrumbItem } from '@/core/components/AppBreadcrumbs.vue';
import ProjectDeleteModal from '@/modules/project/components/ProjectDeleteModal.vue';
import ProjectLockModal from '@/modules/project/components/ProjectLockModal.vue';

const { projectId } = useGlobalStates();
const breadcrumbItems = ref<BreadcrumbItem[]>([
  {
    title: 'Projects',
    disabled: false,
    href: '/projects',
  },
  {
    title: projectId.value.toString(),
    disabled: false,
    href: `/projects/${projectId.value}`,
  },
  {
    title: 'Add member',
    disabled: true,
    href: '',
  }
]);

const isShowProjectDeleteModal = ref<boolean>(false);
const isShowProjectLockModal = ref<boolean>(false);

const listEventsInDangerZone = [
  {
    name: 'Lock Project',
    desrciption: 'This event will be ....',
    event: () => { isShowProjectLockModal.value = true },
  },
  {
    name: 'Delete Project',
    desrciption: 'This event will...',
    event: () => { isShowProjectDeleteModal.value = true },
  }
]
</script>