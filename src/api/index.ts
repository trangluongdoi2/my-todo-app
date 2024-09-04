import customAxios from './axios';
export default class Api {
  protected async get(url: string, configs?: Record<string, any>) {
    try {
      const res = await customAxios.get(url, configs);
      return res.data;
    } catch (error) {
      return null;
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
          status
        };
      }
    } catch ({ response }) {
      console.log(response, 'response post api..');
      return { 
        data: null,
        status: 404,
        message: response?.data?.message,
      };
    }
  }

  protected async patch(
    url: string,
    input?: Record<string, unknown>,
    configs?: Record<string, unknown>
  ) {
    const res = await customAxios.patch(url, input, configs);
    return res.data;
  }

  protected async put(
    url: string,
    input?: Record<string, unknown>,
    configs?: Record<string, unknown>
  ) {
    const res = await customAxios.put(url, input, configs);
    return res.data;
  }

  protected async delete(url: string) {
    const res = await customAxios.delete(url);
    return res.data;
  }
}
