import Api from "@/api";
import { API_URL } from "@/api/url";


const ISSUE_URL = {
  GET_ISSUES: `${API_URL}/api/todo-list`,
  CREATE_ISSUE: `${API_URL}/api/create-todo`,
  UPDATE_ISSUE: `${API_URL}/api/update-todo`,
  DELETE_ISSUE: `${API_URL}/api/delete-todo`,
}

export class IssueApi extends Api {
  async createIssue(input: any) {
    const res = await this.post(ISSUE_URL.CREATE_ISSUE, input);
    console.log(res, 'res...');
  }

  async getListTodos() {
    const res = await this.get(ISSUE_URL.GET_ISSUES);
    return res.data;
  }
}

export default new IssueApi();