import { useEffect, useState } from "react";
import { getWorkflows } from "../services/workflowService";
import type { Workflow } from "../types/workflow";

const History = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getWorkflows();
      setWorkflows(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Workflow History
        </h1>

        <p className="text-gray-500 mt-2">
          View all previously created workflows.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            Loading history...
          </div>
        ) : workflows.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No workflow history found.
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">AI Model</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {workflows.map((workflow) => (
                <tr
                  key={workflow.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-4">{workflow.id}</td>

                  <td className="p-4">{workflow.title}</td>

                  <td className="p-4">{workflow.aiModel}</td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default History;