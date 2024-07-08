import TodoLayout from "@/modules/todo/TodoLayout.vue";
import TodoItemLayout from "@/modules/todo/TodoItemLayout.vue";
import Demo from "@/modules/demo/Demo.vue";
import Courses from "@/modules/courses/Courses.vue";
import EmptyRouterView from "./EmptyRouterView.vue";

export const routes = [
  {
    name: 'app',
    path: '/',
    component: EmptyRouterView,
    redirect: () => {
      return { name: 'todo' };
    },
    children: [
      {
        name: 'todo',
        path: '/todo',
        component: TodoLayout,
        meta: { mode: 'TodoLayout' },
      },
      {
        name: 'todoDetails',
        path: '/todo/:id',
        component: TodoItemLayout,
        meta: { mode: 'TodoLayout' },
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