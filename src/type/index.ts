export interface InputCardItem {
  title: string;
  description: string;
  // image: string;
}

export interface CardItem extends InputCardItem {
  id: string,
  url: string,
  createdAt: string,
  updatedAt: string,
}

export enum IssueStatus {
  DONE = 'DONE',
  INPROGESS = 'INPROGESS',
  STUCK = 'STUCK',
  PENDING = 'PENDING',
}
export interface TodoItem {
  project: string,
  name: string,
  label: string,
  description: string,
  priority: Priority,
  assignee?: string,
  status: IssueStatus,
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  HIGHEST = 'HIGHEST',
}

export type DisplayMode = 'table' | 'grid';