import { API_URL } from '@/api/url';
import axios from 'axios';

export const originAxios = axios.create({
  baseURL: API_URL
});

const customAxios = axios.create({
  baseURL: API_URL,
  // headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
});

// customAxios.interceptors.request()

customAxios.interceptors.request.use(
  config => {
    const accessToken = storage.getToken()
    if (!config.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
)

customAxios.interceptors.response.use(
  response => {
    return response
  },
  async error => {
    const prevRequest = error?.config
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const refreshToken = storage.getRefreshToken()
      // customAxios
      //   .post(`${AUTH_ENDPOINT}/refresh-token`, { refreshToken })
      //   .then((res: AxiosResponse) => {
      //     const { data } = res
      //     prevRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
      //     storage.clearToken()
      //     storage.clearRefreshToken()
      //     storage.setToken(data.accessToken)
      //     storage.setRefreshToken(data.newRefreshToken)
      //     window.location.reload()
      //     return customAxios(prevRequest)
      //   })
      //   .catch((error: AxiosError) => {
      //     storage.clearToken()
      //     storage.clearRefreshToken()
      //     const host = location.protocol
      //       .concat('//')
      //       .concat(window.location.host)
      //     window.location.href = `${host}/login`
      //     return customAxios(prevRequest)
      //   })
    }
    return Promise.reject(error)
  }
)


export default customAxios;
