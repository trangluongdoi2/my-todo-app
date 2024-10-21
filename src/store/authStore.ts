import { useAuthStorage } from "@/core/composables/useAuthStorage";
import { defineStore } from "pinia";

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

type UserInfo = {
  email: string,
  username: string,
  role: UserRole,
  id: number | undefined,
}

type AuthState = {
  currentUser: UserInfo,
  authLocalStorage: any,
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    currentUser: {
      email: '',
      username: '',
      role: UserRole.ADMIN,
      id: undefined,
    },
    authLocalStorage: useAuthStorage(),
  }),
  getters: {
    isAdmin: state => state.currentUser.role === UserRole.ADMIN || state.currentUser.role === UserRole.GUEST,
    isGuest: state => state.currentUser.role === UserRole.GUEST,
    userIdSelected: state => state.currentUser.id,
  },
  actions: {
    async mounted() {
      this.currentUser = await this.authLocalStorage.getCurrentUser();
      return this.currentUser;
    }
  }
});