import { defineStore } from "pinia";
import { TProject } from "@/types/project";
import ProjectApi from '@/modules/project/api/projectApi';

type ProjectStore = {
  selectedProjectId: number | null;
  selectedProject: TProject | null;
};

export const useProjectStore = defineStore('project', {
  state: (): ProjectStore => ({
    selectedProjectId: null,
    selectedProject: null,
  }),
  actions: {
    async mounted(projectId: number) {
      this.selectedProjectId = projectId;
      this.selectedProject = await ProjectApi.getProjectById(projectId);
    },
  },
});