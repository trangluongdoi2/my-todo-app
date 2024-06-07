import { RouteLocationNormalized } from 'vue-router';
// import { getCurrentUser } from 'aws-amplify/auth';

export default async function checkAuth(to: RouteLocationNormalized, next: Function) {
  if (!to.name) {
    return next({
      name: 'not-found',
    });
  }
  if (to.meta && Array.isArray(to.meta.middleware) && to.meta.middleware.includes('guest')) {
    return next();
  }
  let user;
  try {
    // user = await getCurrentUser();
    if (user) {
      return next();
    }
  } catch (err: any) {
    console.error(err);
  }
  // window.location.href='/auth/login';
}
