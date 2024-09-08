export interface TProject {
  id: number;
  projectName: string;
  members: any[];
  todos: any[];
}

export interface ProjectCreateNew {
  projectName: string;
}