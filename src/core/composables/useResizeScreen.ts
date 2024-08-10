import { onMounted, onUnmounted, ref } from "vue";

export const useResizeScreen = () => {
  const isMobileScreen = ref<boolean>(false);

  const checkHiddenCreateIssueButton = () => {
    isMobileScreen.value = window.innerWidth < 768;
  };

  onMounted(() => {
    window.addEventListener('resize', checkHiddenCreateIssueButton);
    checkHiddenCreateIssueButton();
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkHiddenCreateIssueButton);
  });

  return {
    isMobileScreen,
  };
};
