const BASE_URL = "http://localhost:8080";

function getHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function getWorkflows() {
  const res = await fetch(`${BASE_URL}/api/workflows`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch workflows");

  return res.json();
}

export async function createWorkflow(workflow: any) {
  const res = await fetch(`${BASE_URL}/api/workflows`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(workflow),
  });

  if (!res.ok) throw new Error("Failed to create workflow");

  return res.json();
}

export async function updateWorkflow(id: number, workflow: any) {
  const res = await fetch(`${BASE_URL}/api/workflows/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(workflow),
  });

  if (!res.ok) throw new Error("Failed to update workflow");

  return res.json();
}

export async function deleteWorkflow(id: number) {
  const res = await fetch(`${BASE_URL}/api/workflows/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to delete workflow");

  return res.json();
}

export async function generateAI(prompt: string) {
  const res = await fetch(`${BASE_URL}/api/ai/generate`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      prompt,
    }),
  });

  if (!res.ok) throw new Error("AI generation failed");

  return res.json();
}