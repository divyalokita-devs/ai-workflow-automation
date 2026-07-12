const API = "http://localhost:8080/api/workflows";

export interface DashboardStats {
  total: number;
  active: number;
  paused: number;
  draft: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  const res = await fetch(API);

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard stats");
  }

  const workflows = await res.json();

  return {
    total: workflows.length,
    active: workflows.filter((w: any) => w.status === "Active").length,
    paused: workflows.filter((w: any) => w.status === "Paused").length,
    draft: workflows.filter((w: any) => w.status === "Draft").length,
  };
}