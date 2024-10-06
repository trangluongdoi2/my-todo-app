import Api from "@/api";
import { API_URL } from "@/api/url";

const PREFIX_URL = `${API_URL}/api/todo`;

const TODO_URL = {
  GET_TODOS: `${PREFIX_URL}`,
  GET_TODO_BY_ID: `${PREFIX_URL}`,
  GET_TODOS_BY_PROJECT_ID: `${API_URL}/api/todo-list`,
  CREATE_TODO: `${PREFIX_URL}/create`,
  UPDATE_TODO: `${PREFIX_URL}/update`,
  UPDATE_TODO_BY_FIELD: `${PREFIX_URL}/update-field`,
  DELETE_TODO: `${PREFIX_URL}/delete`,
  UPLOAD_ATTACH: `${PREFIX_URL}/upload`,
  DOWNLOAD_ATTACH: `${PREFIX_URL}/download`,
  ADD_COMMENT: `${PREFIX_URL}/add-comment`,
  UPDATE_COMMENT: `${PREFIX_URL}/update-comment`,
  DELETE_COMMENT: `${PREFIX_URL}/delete-comment`,
  GET_HISTORY_LOGS: `${PREFIX_URL}/logs`,
};

export class TodoApi extends Api {
  async createTodo(input: any) {
    console.log(input, 'createTodo...');
    const res = await this.post(TODO_URL.CREATE_TODO, input);
    return res.data;
  }

  async getTodosList() {
    const res = await this.get(TODO_URL.GET_TODOS);
    return res.data;
  }

  async getTodosByProjectId(projectId: number) {
    const res = await this.get(`${TODO_URL.GET_TODOS_BY_PROJECT_ID}/${projectId}`);
    return res.data || [];
  }

  async getTodoById(id: number) {
    const url = `${TODO_URL.GET_TODO_BY_ID}/${id}`;
    const res = await this.get(url);
    return res.data;
  }

  async updateTodo<T>(input: any): Promise<T> {
    const url = `${TODO_URL.UPDATE_TODO}/${input.id}`;
    const res = await this.put(url, input);
    return res.data;
  }

  async updateTodoByField<T>(input: { id: string, field: keyof T, value: any }): Promise<T> {
    const url = `${TODO_URL.UPDATE_TODO_BY_FIELD}/${input.id}`;
    const { field, value } = input;
    const res = await this.put(url, { field, value });
    return res.data;
  }

  async deleteTodo(id: string) {
    const res = await this.delete(`${TODO_URL.DELETE_TODO}/${id}`);
    return res.data;
  }


  async uploadAttachs(id: string, files: File[]) {
    const url = `${TODO_URL.UPLOAD_ATTACH}/${id}`;
    const formData = new FormData();
    files.forEach((item: File) => {
      formData.append('images', item);
    });
    formData.append('id', id);
    const configs = {
      headers: { 'Content-Type': 'multipart/form-data' }
    };
    await this.post(url, formData, configs);
    return [];
  }
  async getHistoryLogs(id: string) {
    const res = await this.get(`${TODO_URL.GET_HISTORY_LOGS}/${id}`);
    return res.data;
  }


  async downloadAttachment(key: string) {
    const res = await this.get(`${TODO_URL.DOWNLOAD_ATTACH}/${key}`);
    return res.data;
  }

  async addComment<T>(id: string, data: T): Promise<T> {
    console.log(data, '===> addComment...');
    const res = await this.post(`${TODO_URL.ADD_COMMENT}/${id}`, data);
    return res.data;
  }

  async updateComment(id: string, data: any) {
    const res = await this.put(`${TODO_URL.UPDATE_COMMENT}/${id}`, data as any);
    return res.data;
  }

  async deleteComment(commentId: string) {
    const res = await this.delete(`${TODO_URL.DELETE_COMMENT}/${commentId}`);
    return res.data;
  }
}

export default new TodoApi();