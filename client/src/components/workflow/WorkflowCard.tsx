type Workflow = {
  id: number;
  title: string;
  status: string;
  color: "green" | "yellow" | "red";
  aiModel: string;
  prompt: string;
};

type WorkflowCardProps = {
  workflow: Workflow;
  onEdit: (workflow: Workflow) => void;
  onDelete: (id: number) => void;
};

const WorkflowCard = ({
  workflow,
  onEdit,
  onDelete,
}: WorkflowCardProps) => {
  const badgeColor =
    workflow.color === "green"
      ? "bg-green-100 text-green-700"
      : workflow.color === "yellow"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Header */}
      <div className="p-6 flex justify-between items-start">
        <div className="space-y-3 flex-1">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-2xl">
              🤖
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {workflow.title}
              </h2>

              <p className="text-sm text-gray-500">
                {workflow.aiModel}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}
          >
            {workflow.status}
          </span>

          <div>
            <p className="text-sm font-semibold text-gray-500 mb-2">
              Prompt
            </p>

            <div className="bg-slate-50 border rounded-xl p-4 text-gray-700 text-sm line-clamp-3">
              {workflow.prompt}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-gray-50 px-6 py-4 flex justify-end gap-3">

        <button
          onClick={() => onEdit(workflow)}
          className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition"
        >
          ✏️ Edit
        </button>

        <button
          onClick={() => onDelete(workflow.id)}
          className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition"
        >
          🗑 Delete
        </button>

      </div>
    </div>
  );
};

export default WorkflowCard;