export interface Project {
  _id: string;
  title: string;
  description: string;
}

export interface Task {
  _id: string;
  title: string;
  assignedTo?: {
    _id: string;
    email: string;
  };
  status: "todo" | "in-progress" | "done";
}

export interface Comment {
  _id: string;
  text: string;
}