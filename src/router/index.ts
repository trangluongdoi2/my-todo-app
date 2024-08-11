import { RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import checkAuth from '@/middleware/checkAuth';

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes as any ],
});

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => checkAuth(to, next));

export default router;
