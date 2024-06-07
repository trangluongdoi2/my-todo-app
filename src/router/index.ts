import { RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import checkAuth from '@/middleware/checkAuth';
import checkTrackPages from '@/middleware/checkTrackPage';

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes as any ],
});

// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => checkAuth(to, next));
// router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: Function) => checkTrackPages(to, from, next));

export default router;
