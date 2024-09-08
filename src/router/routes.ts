import EmptyRouterView from "./EmptyRouterView.vue";
import PageNotFound from "@/router/PageNotFound.vue";
import TodoLayout from "@/modules/todo/TodoLayout.vue";
import TodoItemLayout from "@/modules/todo/TodoItemLayout.vue";
import Demo from "@/modules/demo/Demo.vue";
import Courses from "@/modules/courses/Courses.vue";
import TheMain from "@/views/main/TheMain.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import Auth from "@/views/auth/Auth.vue";
import ProjectLayout from "@/views/project/ProjectLayout.vue";

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
        name: 'auth',
        path: '/auth',
        component: Auth,
        meta: {
          middleware: ['guest'],
        }
      },
      {
        name: '',
        path: '/',
        component: TheMain,
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
            name: 'todo',
            path: '/:projectId/todo',
            component: TodoLayout,
            meta: { mode: 'TodoLayout' },
          },
          {
            name: 'todoDetails',
            path: '/:projectId/todo/:todoId',
            component: TodoItemLayout,
            meta: { mode: 'TodoLayout' },
          },
          {
            name: 'project',
            path: '/:projectId/settings',
            component: ProjectLayout,
            meta: { mode: 'ProjectLayout' },
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
      },
    ]
  },
  {
    name: 'error',
    path: "/:catchAll(.*)",
    component: PageNotFound,
  },
];