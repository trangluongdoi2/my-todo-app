import { NotificationType } from "@/types";
import { defineStore } from "pinia";

const TIMEOUT = 2000;

export type ErrorHandlingStore = {
  message: string | null;
  visible: boolean;
  status: NotificationType;
};

export const useNotificationStore = defineStore("notification", {
  state: (): ErrorHandlingStore => ({
    message: '',
    visible: false,
    status: NotificationType.ERROR,
  }),
  actions: {
    setStatus(status: boolean) {
      this.status = status;
    },
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
    setSuccess(message: string) {
      this.message = message;
      this.visible = true;
      this.status = NotificationType.SUCCESS;
      setTimeout(() => {
        this.reset();
      }, TIMEOUT);
    },
    setError(message: string) {
      this.message = message;
      this.visible = true;
      this.status = NotificationType.ERROR;
      setTimeout(() => {
        this.reset();
      }, TIMEOUT);
    },
    setInfo(message: string) {
      this.message = message;
      this.visible = true;
      this.status = NotificationType.INFO;
      setTimeout(() => {
        this.reset();
      }, TIMEOUT);
    },
    setWarning(message: string) {
      this.message = message;
      this.visible = true;
      this.status = NotificationType.WARNING;
      setTimeout(() => {
        this.reset();
      }, TIMEOUT);
    },
    reset() {
      this.$reset();
    },
  },
});
