import { useLocalStorage } from "@/core/composables/useLocalStorage";

export const useAuthStorage = () => {
  const { storage } = useLocalStorage();

  const clearUserInLocalStorage = () => {
    storage.removeItem.removeItem('auth', 'user');
  };

  const clearToken = async () => {
    await Promise.all([
      storage.removeItem('auth', 'accessToken'),
      storage.removeItem('auth', 'accessToken'),
    ]);
  };

  const setAccessToken = (token: string) => {
    storage.setItem('auth', 'accessToken', token);
  };

  const setRefreshToken = (token: string) => {
    storage.setItem('auth', 'refreshToken', token);
  };

  const getAccessToken = async () => {
    return await storage.getItem('auth', 'accessToken');
  };

  const getRefreshToken = async () => {
    return await storage.getItem('auth', 'refreshToken');
  };

  const getCurrentUser = async () => {
    const user = await storage.getItem('auth', 'user');
    return user;
  };

  return {
    clearToken,
    setAccessToken,
    setRefreshToken,
    getRefreshToken,
    getAccessToken,
    getCurrentUser,
    clearUserInLocalStorage
  };
};