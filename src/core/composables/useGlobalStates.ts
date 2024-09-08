import { computed } from "vue";
import { useRoute } from "vue-router";

export const useGlobalStates = () => {
  const route = useRoute();
  const listMetaHiddenLayout = [
    'Dashboard',
    'TodoLayout',
    'ProjectLayout'
  ];

  const isTodoLayoutTab = computed(() => {
    const { meta } = route;
    return meta.mode === 'TodoLayout';
  });

  const projectId = computed(() => {
    const { params } = route;
    return Number(params.projectId);
  });

  const isHiddenSideLeft = computed(() => {
    const { meta } = route;
    return listMetaHiddenLayout.includes(meta.mode as string);
  });
  
  return {
    projectId,
    isTodoLayoutTab,
    isHiddenSideLeft,
  };
};