import customAxios from './axios';
export default class Api {
  error: any;
  protected async get(url: string, configs?: Record<string, any>) {
    try {
      const { data, status } = await customAxios.get(url, configs);
      return {
        data: data.data,
        status,
      };
    } catch ({ response }) {
      return { 
        data: null,
        status: response?.status || 500,
        message: response?.data?.message,
      };
    }
  }

  protected async post(
    url: string,
    input: Record<string, any>,
    configs?: Record<string, any>
  ) {
    try {
      const { data, status } = await customAxios.post(url, input, configs);
      if (data) {
        return {
          data: data.data,
          status,
        };
      }
    } catch ({ response }) {
      console.log(response, 'response...');
      this.error = response?.data?.message;
      return {
        data: null,
        status: response?.status || 500,
        message: response?.data?.message,
      };
    }
  }

  protected async patch(
    url: string,
    input?: Record<string, unknown>,
    configs?: Record<string, unknown>
  ) {
    try {
      const res = await customAxios.patch(url, input, configs);
      return res.data;
    } catch ({ response }) {
      return { 
        data: null,
        status: response?.status || 500,
        message: response?.data?.message,
      };
    }
  }

  protected async put(
    url: string,
    input?: Record<string, unknown>,
    configs?: Record<string, unknown>
  ) {
    try {
      const res = await customAxios.put(url, input, configs);
      return res.data;
    } catch ({ response }) {
      return { 
        data: null,
        status: response?.status || 500,
        message: response?.data?.message,
      };
    }
  }

  protected async delete(url: string) {
    try {
      console.log(url, 'url...');
      const res = await customAxios.delete(url);
      return res.data;
    } catch ({ response }) {
      console.log(response, 'response...');
      return { 
        data: null,
        status: response?.status || 500,
        message: response?.data?.message,
      };
    }
  }
}
