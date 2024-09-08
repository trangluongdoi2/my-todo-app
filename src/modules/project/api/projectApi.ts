import Api from "@/api";
import { API_URL } from "@/api/url";

const PROJECT_URL = {
  GET_ALL: `${API_URL}/api/projects`,
  GET_PROJECTS_BY_USER_ID: `${API_URL}/api/projects-list`,
  GET_PROJECT_BY__ID: `${API_URL}/api/projects`,
  CREATE_PROJECT: `${API_URL}/api/projects/create`,
};

class ProjectApi extends Api {
  async getProjectsList() {
    const res = await this.get(PROJECT_URL.GET_ALL);
    return res.data;
  }

  async getProjectsByUserId(userId: number) {
    const url = `${PROJECT_URL.GET_PROJECTS_BY_USER_ID}/${userId}`;
    const res = await this.get(url);
    return res.data;
  }

  async createProject(input: any) {
    const res = await this.post(PROJECT_URL.CREATE_PROJECT, input);
    return res.data;
  }
}

export default new ProjectApi();