import { defineStore } from "pinia";
import { TProject } from "@/types/project";
import ProjectApi from '@/modules/project/api/projectApi';

type ProjectStore = {
  projectId: number | null;
  selectedProject: TProject | null;
};

export const useProjectStore = defineStore('project', {
  state: (): ProjectStore => ({
    projectId: null,
    selectedProject: null,
  }),
  actions: {
    async mounted(projectId: number) {
      this.projectId = projectId;
      this.selectedProject = await ProjectApi.getProjectById(projectId);
      console.log(this.selectedProject, 'this.selectedProject..');
    },
  },
});