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
import { useGlobalStates } from '@/core/composables/useGlobalStates';
import ProjectApi from '@/modules/project/api/projectApi';
import ProjectSettingsSidebar from './ProjectSettingsSidebar.vue';
import ProjectSettingMember from './ProjectSettingMember.vue';
import ProjectSettingGeneral from './ProjectSettingGeneral.vue';

type ProjectSettingsTab = 'Member' | 'General';

const dynamicComponent: { [key in ProjectSettingsTab]: any } = {
  'Member': ProjectSettingMember,
  'General': ProjectSettingGeneral,
}

const projectInfos = ref<any>();
const currentSelectTab = ref<ProjectSettingsTab>('Member');
const { projectId } = useGlobalStates();
const currentTabComponent = computed(() => dynamicComponent[currentSelectTab.value]);

const onSelectTab = (tab: ProjectSettingsTab) => {
  if (currentSelectTab.value === tab) {
    return;
  }
  currentSelectTab.value = tab;
}

onMounted(async () => {
  if (projectId.value) {
    projectInfos.value = await ProjectApi.getProjectById(projectId.value);
  }
})
</script>