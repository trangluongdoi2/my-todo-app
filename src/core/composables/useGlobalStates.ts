import { computed } from "vue";
import { useRoute } from "vue-router";

export const useGlobalStates = () => {
  const route = useRoute();
  const isTodoLayoutTab = computed(() => {
    const { meta } = route;
    return meta.mode === 'TodoLayout';
  });
  
  return {
    isTodoLayoutTab,
  };
};