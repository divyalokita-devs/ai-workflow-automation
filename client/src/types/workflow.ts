export interface Workflow {
  id: number;
  title: string;
  status: string;
  color: "green" | "yellow" | "red";
  aiModel: string;
  prompt: string;
}

export interface CreateWorkflowRequest {
  title: string;
  status: string;
  color: "green" | "yellow" | "red";
  aiModel: string;
  prompt: string;
}

export interface AIResponse {
  response: string;
}