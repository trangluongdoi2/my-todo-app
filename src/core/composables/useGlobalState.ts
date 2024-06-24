import { computed } from "vue";
import { useRoute } from "vue-router";

export const useGlobalState = () => {
  // const router = useRouter();
  const route = useRoute();
  const isDashboardTab = computed(() => {
    const { meta } = route;
    return meta.mode === 'Dashboard';
  });

  return {
    isDashboardTab,
  };
};