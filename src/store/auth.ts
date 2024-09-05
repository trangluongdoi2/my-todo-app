import { defineStore } from "pinia";

export enum UserRole {
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

type UserInfo = {
  email: string,
  username: string,
  role: UserRole,
}

type AuthState = {
  currentUser: UserInfo
}

export const useAuthStore = defineStore('authStore', {
  state: (): AuthState => ({
    currentUser: {
      email: '',
      username: '',
      role: UserRole.ADMIN,
    }
  }),
  getters: {
    isAdmin: state => state.currentUser.role === UserRole.ADMIN,
    isGuest: state => state.currentUser.role === UserRole.GUEST,
  },
  actions: {
    mounted(data: UserInfo) {
      this.currentUser = { ...data };
    }
  }
});