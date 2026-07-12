import WorkflowCard from "./WorkflowCard";
import type { Workflow } from "../../types/workflow";

type WorkflowListProps = {
  workflows: Workflow[];
  onEdit: (workflow: Workflow) => void;
  onDelete: (id: number) => void;
};

const WorkflowList = ({
  workflows,
  onEdit,
  onDelete,
}: WorkflowListProps) => {
  if (workflows.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 text-center shadow-sm">
        <div className="text-6xl mb-4">🤖</div>

        <h2 className="text-2xl font-bold text-slate-800">
          No Workflows Found
        </h2>

        <p className="text-gray-500 mt-3 max-w-md mx-auto">
          You haven't created any AI workflows yet.
          Create your first workflow to automate your tasks with AI.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      {workflows.map((workflow) => (
        <WorkflowCard
          key={workflow.id}
          workflow={workflow}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default WorkflowList;