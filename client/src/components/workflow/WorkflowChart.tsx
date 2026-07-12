import type { Workflow } from "../../types/workflow";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { getWorkflows } from "../../services/workflowService";

const WorkflowChart = () => {
  const [data, setData] = useState([
    { status: "Active", count: 0 },
    { status: "Paused", count: 0 },
    { status: "Draft", count: 0 },
  ]);

  useEffect(() => {
    loadChart();
  }, []);

  const loadChart = async () => {
    try {
      const workflows = await getWorkflows();

      const active = workflows.filter(
        (w: Workflow) => w.status === "Active"
      ).length;

      const paused = workflows.filter(
        (w: Workflow) => w.status === "Paused"
      ).length;

      const draft = workflows.filter(
        (w: Workflow) => w.status === "Draft"
      ).length;

      setData([
        { status: "Active", count: active },
        { status: "Paused", count: paused },
        { status: "Draft", count: draft },
      ]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-bold mb-6">
        Workflow Status
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#06b6d4"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkflowChart;