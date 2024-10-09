<template>
  <div class="projects-list">
    <template v-if="loading">
      <SkeletonProjectCard v-for="n of 2" :key="n" />
    </template>
    <template v-else>
      <div v-if="!projects.length" class="w-full flex flex-col items-center justify-center">
        <p>There are no todo items in this project</p>
        <app-button
          color="#42B883"
          @click="$emit('create-project')"
        >
          Create Project
        </app-button>
      </div>
      <div class="projects-list__card">
        <ProjectCard
          v-for="(project, index) in projects" :key="index" 
          :project="project"
          @click="selectProject(project.id)"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { TProject } from '@/types/project';
import ProjectCard from '@/modules/dashboard/components/ProjectCard.vue';
import SkeletonProjectCard from '@/modules/project/sekeleton/SkeletonProjectCard.vue';

const emit = defineEmits(['select-project', 'create-project']);
defineProps({
  projects: {
    type: Array as PropType<TProject[]>,
    required: true,
  },
  loading: {
    type: Boolean,
    default: true,
  },
});

const selectProject = (id: number) => {
  emit('select-project', id);
};

</script>
<style scoped lang="scss">
.projects-list {
  max-height: 500px;
  width: 100%;
  padding: 1px;
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  &__card {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>