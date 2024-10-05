export enum TodoStatus {
  DONE = 'DONE',
  IN_PRORGESS = 'IN PROGRESS',
  STUCK = 'STUCK',
  PENDING = 'PENDING',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  HIGHEST = 'HIGHEST',
}

export type TodoAttachment = {
  id: string,
  filePath: string,
  fileName: string,
}
export interface TodoItem {
  id?: string;
  title?: string,
  todoName: string,
  label: string,
  description: string,
  priority: Priority,
  assignee?: string[],
  todoStatus: TodoStatus,
  projectId?: number | string,
}

export interface TTodoStatusLog {
  id: string,
  action: 'create' | 'update',
  oldValue: any,
  newValue: any,
  createdAt: string,
}

export interface TodoItemDetails extends Omit<TodoItem, 'id'> {
  id: string,
  createdAt: string,
  updateAt: string,
  attachments: TodoAttachment[],
  statusLogs: TTodoStatusLog[],
}

export type DisplayMode = 'table' | 'grid';

export type Tab = {
  id?: number,
  name: string,
  event?: any,
  children?: Tab[],
}

export type TableStorage = 'auth';