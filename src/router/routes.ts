import Dashboard from "@/modules/dashboard/Dashboard.vue";
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
        path: '',
        component: Dashboard,
      },
      {
        name: 'settings',
        path: '/settings',
        component: EmptyRouterView,
      }
    ]
  }
];