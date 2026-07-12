import { useEffect, useState } from "react";
import {
  getWorkflows,
  createWorkflow,
  updateWorkflow,
  deleteWorkflow,
  generateAI,
} from "../services/workflowService";

import type {
  Workflow,
  CreateWorkflowRequest,
} from "../types/workflow";

export default function useWorkflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchWorkflows();
  }, []);

  async function fetchWorkflows() {
    try {
      setLoading(true);

      const data = await getWorkflows();

      setWorkflows(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load workflows.");
    } finally {
      setLoading(false);
    }
  }

  async function addWorkflow(workflow: CreateWorkflowRequest) {
    try {
      setSaving(true);

      const newWorkflow = await createWorkflow(workflow);

      setWorkflows((prev) => [newWorkflow, ...prev]);

      return newWorkflow;
    } finally {
      setSaving(false);
    }
  }

  async function editWorkflow(
    id: number,
    workflow: CreateWorkflowRequest
  ) {
    try {
      setSaving(true);

      const updated = await updateWorkflow(id, workflow);

      setWorkflows((prev) =>
        prev.map((item) =>
          item.id === id ? updated : item
        )
      );

      return updated;
    } finally {
      setSaving(false);
    }
  }

  async function removeWorkflow(id: number) {
    try {
      await deleteWorkflow(id);

      setWorkflows((prev) =>
        prev.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete workflow.");
    }
  }

  async function generatePrompt(prompt: string) {
    try {
      setGenerating(true);

      const result = await generateAI(prompt);

      return result.response;
    } catch (err) {
      console.error(err);
      alert("AI generation failed.");
      return "";
    } finally {
      setGenerating(false);
    }
  }

  return {
    workflows,
    loading,
    saving,
    generating,
    error,

    fetchWorkflows,
    addWorkflow,
    editWorkflow,
    removeWorkflow,
    generatePrompt,
  };
}