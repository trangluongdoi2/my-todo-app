export enum TodoStatus {
  DONE = 'DONE',
  IN_PROGESS = 'IN PROGESS',
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
  filename: string,
}
export interface TodoItem {
  id?: string;
  title?: string,
  projects: string[],
  todoName: string,
  label: string,
  description: string,
  priority: Priority,
  assignee?: string,
  todoStatus: TodoStatus,
}

export interface TodoItemDetails extends Omit<TodoItem, 'id'> {
  id: string,
  createdAt: string,
  updateAt: string,
  attachments: TodoAttachment[],
}

export type DisplayMode = 'table' | 'grid';

export type Tab = {
  id?: number,
  name: string,
  event?: any,
  children?: Tab[],
}