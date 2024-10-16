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

export interface TodoInput {
  title?: string,
  todoName: string,
  label: string,
  description: string,
  priority: Priority,
  assignee?: string[],
  todoStatus: TodoStatus,
  projectId?: number | string,
  files?: File[],
  comments?: TTodoCommentInput[],
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

export interface TTodoItemDetails extends Omit<TodoItem, 'id'> {
  id: string,
  createdAt: string,
  updatedAt: string,
  attachments?: TodoAttachment[],
  statusLogs?: TTodoStatusLog[],
  comments?: TTodoComment[],
}

export interface TTodoStatusLog {
  id: string,
  action: 'create' | 'update',
  oldValue: any,
  newValue: any,
  createdAt: string,
}

export interface TodoItemDetails extends Omit<TodoItem, 'id'> {
  id: string | number,
  createdAt: string,
  updatedAt: string,
  attachments?: TodoAttachment[],
  statusLogs?: TTodoStatusLog[],
  comments?: TTodoComment[],
}

export type TTodoCommentInput = {
  content: string;
  userId: string | number;
  todoId: string | number;
  emoji?: string | string[];
}

export type TTodoComment = {
  id: string;
  content: string;
  user?: any;
  todo?: any;
  emoji?: string | string[];
  createdAt: string,
  updatedAt: string,
}

export type TTodoUploadAttach = {
  todoId: string | number,
  projectId: string | number,
  files: File[],
}

export type TTodoDownloadAttach = {
  key: string,
  projectId: string | number,
}
