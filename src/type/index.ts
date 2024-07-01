export enum TodoStatus {
  DONE = 'DONE',
  IN_PROGESS = 'IN_PROGESS',
  STUCK = 'STUCK',
  PENDING = 'PENDING',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  HIGHEST = 'HIGHEST',
}
export interface TodoItem {
  id?: string;
  title?: string,
  project: string,
  name: string,
  label: string,
  description: string,
  priority: Priority,
  assignee?: string,
  status: TodoStatus,
}

export type DisplayMode = 'table' | 'grid';