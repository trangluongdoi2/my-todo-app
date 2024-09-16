import { computed } from "vue";
import { useRoute } from "vue-router";

export const useGlobalStates = () => {
  const route = useRoute();
  const listMetaHiddenLayout = [
    'Dashboard',
    'TodoLayout',
    'ProjectLayout'
  ];

  const isTodoLayoutTab = computed(() => route?.meta?.mode === 'TodoLayout');

  const projectId = computed(() => Number(route.params?.projectId));

  const todoId = computed(() => Number(route.params?.todoId));

  const isHiddenSideLeft = computed(() => {
    const { meta } = route;
    return listMetaHiddenLayout.includes(meta.mode as string);
  });
  
  return {
    projectId,
    todoId,
    isTodoLayoutTab,
    isHiddenSideLeft,
  };
};