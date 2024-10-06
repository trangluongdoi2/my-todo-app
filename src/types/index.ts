export type DisplayMode = 'table' | 'grid';

export enum NotificationType {
  ERROR = 'error',
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
};

export type Tab = {
  id?: number,
  name: string,
  event?: any,
  children?: Tab[],
}