import { useEffect, useState } from "react";
import { getWorkflows } from "../../services/workflowService";
import type { Workflow } from "../../types/workflow";
import { useNavigate } from "react-router-dom";

const RecentWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      const data = await getWorkflows();
      setWorkflows(data.slice(0, 5));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">
        Recent Workflows
      </h2>

      {workflows.length === 0 ? (
        <div className="text-gray-500 py-8 text-center">
          No workflows yet.
        </div>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-500 border-b">
              <th className="pb-3">Workflow</th>
              <th>Status</th>
              <th>AI Model</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {workflows.map((workflow) => (
              <tr key={workflow.id} className="border-b">
                <td className="py-4">{workflow.title}</td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      workflow.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : workflow.status === "Paused"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {workflow.status}
                  </span>
                </td>

                <td>{workflow.aiModel}</td>

                <td>
                  <button
                    onClick={() => navigate("/workflows")}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RecentWorkflows;