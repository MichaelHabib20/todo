export enum TodoStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

export enum TodoPriority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export interface Todo {
  id?: string;
  title: string;
  description?: string;
  status: number;
  priority: number;
  dueDate?: Date;
  createdDate?: Date;
  lastModifiedDate?: Date;
}
