import Api from "@/api";
import { API_URL } from "@/api/url";
import TodoItemDetails from "@/modules/todo/TodoItemDetails.vue";

const TODO_URL = {
  GET_TODOS: `${API_URL}/api/todo`,
  GET_TODO_BY_ID: `${API_URL}/api/todo`,
  GET_TODOS_BY_PROJECT_ID: `${API_URL}/api/todo-list`,
  CREATE_TODO: `${API_URL}/api/todo/create`,
  UPDATE_TODO: `${API_URL}/api/todo/update`,
  UPDATE_TODO_BY_FIELD: `${API_URL}/api/todo/update-field`,
  DELETE_TODO: `${API_URL}/api/todo/delete`,
  UPLOAD_ATTACH: `${API_URL}/api/todo/upload`,
  DOWNLOAD_ATTACH: `${API_URL}/api/todo/download`,
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
    return res.data;
  }

  async getTodoById(id: number) {
    const url = `${TODO_URL.GET_TODO_BY_ID}/${id}`;
    const res = await this.get(url);
    return res.data;
  }

  async updateTodo(input: any) {
    const url = `${TODO_URL.UPDATE_TODO}/${input.id}`;
    const res = await this.put(url, input);
    return res.data;
  }

  async updateTodoByField(input: { id: string, field: keyof typeof TodoItemDetails, value: any }) {
    const url = `${TODO_URL.UPDATE_TODO_BY_FIELD}/${input.id}`;
    const { field, value } = input;
    const res = await this.put(url, { field, value });
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

  async deleteTodo(id: string) {
    const res = await this.delete(`${TODO_URL.DELETE_TODO}/${id}`);
    return res.data;
  }

  async downloadAttachment(key: string) {
    const res = await this.get(`${TODO_URL.DOWNLOAD_ATTACH}/${key}`);
    return res.data;
  }
}

export default new TodoApi();