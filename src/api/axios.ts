import axios from 'axios';
import { API_URL } from '@/api/url';
import { useAuthStorage } from '@/core/composables/useAuthStorage';

const {
  clearToken,
  clearAccessToken,
  getAccessToken,
  getRefreshToken,
  setAccessToken,
} = useAuthStorage();

export const originAxios = axios.create({
  baseURL: API_URL
});

const customAxios = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

customAxios.interceptors.request.use(async (request) => {
  const accessToken = await getAccessToken();
  if (accessToken) {
    request.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const refreshToken = await getRefreshToken();
      customAxios
        .post(`${API_URL}/api/auth/refresh-token`, { refreshToken })
        .then(async ({ data }: any) => {
          prevRequest.headers['Authorization'] = `Bearer ${data.data.accessToken}`;
          await clearAccessToken();
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
