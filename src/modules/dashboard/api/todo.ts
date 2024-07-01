import Api from "@/api";
import { API_URL } from "@/api/url";

const TODO_URL = {
  GET_TODOS: `${API_URL}/api/todo`,
  GET_TODO_BY_ID: `${API_URL}/api/todo`,
  CREATE_TODO: `${API_URL}/api/todo/create`,
  UPDATE_TODO: `${API_URL}/api/todo/update`,
  DELETE_TODO: `${API_URL}/api/todo/delete`,
};

export class TodoApi extends Api {
  async createTodo(input: any) {
    const res = await this.post(TODO_URL.CREATE_TODO, input);
    return res.data;
  }

  async getTodosList() {
    const res = await this.get(TODO_URL.GET_TODOS);
    return res.data;
  }

  async getTodoById(id: string) {
    const res = await this.get(`${TODO_URL.GET_TODO_BY_ID}/${id}`);
    return res.data;
  }

  async updateTodo(input: any) {
    console.log(input, 'updateTodo....');
    const res = await this.put(`${TODO_URL.GET_TODO_BY_ID}/${input.id}`, input);
    return res.data;
  }

  async deleteTodo(id: string) {
    const res = await this.delete(`${TODO_URL.DELETE_TODO}/${id}`);
    return res.data;
  }
}

export default new TodoApi();