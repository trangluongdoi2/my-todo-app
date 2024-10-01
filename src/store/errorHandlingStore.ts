import { defineStore } from "pinia";


export type ErrorHandlingStore = {
  message: string | null;
  visible: boolean;
};

const TIMEOUT = 2000;

export const useErrorHandlingStore = defineStore("errorHandling", {
  state: () => ({
    message: '',
    visible: false,
  }),
  actions: {
    setMessage(message: string) {
      this.message = message;
      this.visible = true;
      setTimeout(() => {
        this.reset();
      }, TIMEOUT);
    },
    setVisible(visible: boolean) {
      this.visible = visible;
    },
    reset() {
      this.$reset();
    },
  },
});
