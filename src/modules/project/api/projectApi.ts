import Api from "@/api";
import { API_URL } from "@/api/url";

const PROJECT_URL = {
  GET_ALL: `${API_URL}/api/projects`,
  GET_PROJECTS_BY_USER_ID: `${API_URL}/api/projects-list`,
  DELETE: `${API_URL}/api/projects/delete`,
  GET_MEMBERS: `${API_URL}/api/projects/members-list`,
  SEND_INVITATION: `${API_URL}/api/projects/send-invite-mail`,
  ADD_MEMBER: `${API_URL}/api/projects/add-member`,
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

  async getProjectById(id: number) {
    const url = `${PROJECT_URL.GET_ALL}/${id}`;
    const res = await this.get(url);
    return res.data;
  }

  async deleteProject(id: number) {
    const url = `${PROJECT_URL.DELETE}/${id}`;
    const res = await this.delete(url);
    return res.data;
  }

  async getMembersByProjectId(projectId: number) {
    const url = `${PROJECT_URL.GET_MEMBERS}/${projectId}`;
    const res = await this.get(url);
    return res.data;
  }

  async addMemberToProject(memberEmail: string) {
    const url = `${PROJECT_URL.ADD_MEMBER}`;
    const res = await this.post(url, { email: memberEmail });
    return res.data;
  }

  async sendInvitation(input: { projectId: number, fromEmail: string, destEmail: string }) {
    const { projectId, fromEmail, destEmail } = input;
    const url = `${PROJECT_URL.SEND_INVITATION}/${projectId}`;
    const res = await this.post(url, { fromEmail, destEmail });
    return res.data;
  }
}

export default new ProjectApi();