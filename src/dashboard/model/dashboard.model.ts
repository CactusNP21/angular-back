export interface Job {
  id: number;
  name: string;
  created: Date;
  comments: [string];
}

export interface Tasks {
  todo: Job[];
  progress: Job[];
  done: Job[];
  archive: Job[];
}

export interface DashboardInterface {
  title: string;
  description: string;
  date: Date;
  tasks: Tasks;
  publisher: string;
}
