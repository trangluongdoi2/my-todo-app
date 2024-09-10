<template>
  <div class="w-full h-full flex">
    <ProjectSettingsSidebar @select-tab="onSelectTab" />
    <keep-alive>
      <component :is="currentTabComponent" class="flex-1" />
    </keep-alive>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ProjectApi from '@/modules/project/api/projectApi';
import ProjectSettingsSidebar from './ProjectSettingsSidebar.vue';
import ProjectSettingMember from './ProjectSettingMember.vue';
import ProjectSettingOverview from './ProjectSettingOverview.vue';

type ProjectSettingsTab = 'Member' | 'Overview';

const dynamicComponent: { [key: ProjectSettingsTab]: any } = {
  'Member': ProjectSettingMember,
  'Overview': ProjectSettingOverview,
}

const projectInfos = ref<any>();
const currentSelectTab = ref<ProjectSettingsTab>('Member');
const currentTabComponent = computed(() => dynamicComponent[currentSelectTab.value]);

const onSelectTab = (tab: ProjectSettingsTab) => {
  if (currentSelectTab.value === tab) {
    return;
  }
  currentSelectTab.value = tab;
}

onMounted(async () => {
  const projectId = useRoute().params?.projectId;
  if (projectId) {
    projectInfos.value = await ProjectApi.getProjectById(projectId as any);
  }
})
</script>