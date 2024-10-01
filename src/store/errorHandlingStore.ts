import { defineStore } from "pinia";


export type ErrorHandlingStore = {
  message: string | null;
  visible: boolean;
};

export const useErrorHandlingStore = defineStore("errorHandling", {
  state: () => ({
    message: '',
    visible: false,
  }),
  actions: {
    setMessage(message: string) {
      this.message = message;
      this.visible = true;
    },
    setVisible(visible: boolean) {
      this.visible = visible;
    },
    reset() {
      this.message = '';
      this.visible = false;
    },
  },
});
