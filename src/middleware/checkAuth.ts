import { useAuthStorage } from '@/core/composables/useAuthStorage';
import { RouteLocationNormalized } from 'vue-router';

const { getCurrentUser } = useAuthStorage();

export default async function checkAuth(to: RouteLocationNormalized, next: Function) {
  if (!to.name) {
    return next({
      name: 'error',
    });
  }
  if (to.meta && Array.isArray(to.meta.middleware) && to.meta.middleware.includes('guest')) {
    return next();
  }
  let user;
  try {
    user = await getCurrentUser();
    if (user) {
      return next();
    }
  } catch (err: any) {
    console.error(err);
  };
  window.location.href='/auth';
}
