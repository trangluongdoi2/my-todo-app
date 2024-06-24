import Dashboard from "@/modules/dashboard/Dashboard.vue";
import Demo from "@/modules/demo/Demo.vue";
import Courses from "@/modules/courses/Courses.vue";
import EmptyRouterView from "./EmptyRouterView.vue";

export const routes = [
  {
    name: 'app',
    path: '/',
    component: EmptyRouterView,
    redirect: () => {
      return { name: 'dashboard' };
    },
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard,
        meta: { mode: 'Dashboard' }
      },
      {
        name: 'settings',
        path: '/settings',
        component: EmptyRouterView,
      },
      {
        name: 'profile',
        path: '/profile',
        component: EmptyRouterView,
      },
      {
        name: 'profile',
        path: '/courses',
        component: Courses,
      },
      {
        name: 'demo',
        path: '/demo',
        component: Demo,
      }
    ]
  }
];