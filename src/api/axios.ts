import axios, { AxiosError, AxiosResponse } from 'axios';
import { API_URL } from '@/api/url';
import { useAuthStorage } from '@/core/composables/useAuthStorage';

const {
  clearToken,
  getAccessToken,
  getRefreshToken,
  setRefreshToken,
  setAccessToken,
} = useAuthStorage();

export const originAxios = axios.create({
  baseURL: API_URL
});

const customAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
  // withCredentials: true,
  // headers: {'X-Requested-With': 'XMLHttpRequest'},
});

customAxios.interceptors.request.use(async (config) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  console.log(config.headers, 'config.headers...');
  // if (!config.headers['Authorization']) {
  // }
  return config;
},
(error: any) => {
  return Promise.reject(error);
}
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const refreshToken = await getRefreshToken();
      console.log(refreshToken, 'refreshToken...');
      customAxios
        .post(`${API_URL}/api/auth/refresh-token`, { refreshToken })
        .then(({ data }: any) => {
          console.log(data?.data, 'data..');
          prevRequest.headers['Authorization'] = `Bearer ${data.data.accessToken}`;
          clearToken();
          setRefreshToken(data.data.refreshToken);
          setAccessToken(data.data.accessToken);
          window.location.reload();
          return customAxios(prevRequest);
        })
        .catch(() => {
          clearToken();
          const host = location.protocol.concat('//').concat(window.location.host);
          window.location.href = `${host}/auth`;
          return customAxios(prevRequest);
        });
    }
    return Promise.reject(error);
  }
);

export default customAxios;
