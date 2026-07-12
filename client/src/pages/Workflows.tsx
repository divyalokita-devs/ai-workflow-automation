import { useMemo, useState } from "react";
import Modal from "../components/common/Modal";
import SearchBar from "../components/workflow/Searchbar";
import WorkflowForm from "../components/workflow/WorkflowForm";
import WorkflowList from "../components/workflow/Workflowlist";
import useWorkflows from "../hooks/useWorkflows";
import type { Workflow } from "../types/workflow";

const Workflows = () => {
  const {
    workflows,
    loading,
    saving,
    generating,
    addWorkflow,
    editWorkflow,
    removeWorkflow,
    generatePrompt,
  } = useWorkflows();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);

  const filteredWorkflows = useMemo(() => {
  return workflows.filter((workflow) => {
    const searchMatch = workflow.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const statusMatch =
      statusFilter === "All"
        ? true
        : workflow.status === statusFilter;

    return searchMatch && statusMatch;
  });
}, [workflows, search, statusFilter]);

  const handleCreate = () => {
    setEditingWorkflow(null);
    setOpen(true);
  };

  const handleEdit = (workflow: Workflow) => {
    setEditingWorkflow(workflow);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this workflow?"
    );

    if (!confirmDelete) return;

    await removeWorkflow(id);
  };

  const handleSubmit = async (data: {
    title: string;
    status: string;
    color: "green" | "yellow" | "red";
    aiModel: string;
    prompt: string;
  }) => {
    if (editingWorkflow) {
      await editWorkflow(editingWorkflow.id, data);
    } else {
      await addWorkflow(data);
    }

    setOpen(false);
    setEditingWorkflow(null);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-4xl font-bold text-slate-800">
            AI Workflows
          </h1>

          <p className="text-gray-500 mt-2">
            Create and manage your AI automations.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          + New Workflow
        </button>
      </div>

       <div className="flex justify-between items-center">

      <h2 className="text-lg font-semibold">
        {filteredWorkflows.length} Workflow
        {filteredWorkflows.length !== 1 && "s"}
      </h2>

     </div>

      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="flex gap-3 flex-wrap">

  {["All", "Active", "Paused", "Draft"].map((status) => (

    <button
      key={status}
      onClick={() => setStatusFilter(status)}
      className={`px-5 py-2 rounded-xl border transition
      ${
        statusFilter === status
          ? "bg-cyan-600 text-white"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      {status}
    </button>

  ))}

</div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 text-lg">
          Loading workflows...
        </div>
      ) : (
        <WorkflowList
          workflows={filteredWorkflows}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingWorkflow(null);
        }}
      >
        <WorkflowForm
          initialData={editingWorkflow}
          loading={saving}
          generating={generating}
          onGenerateAI={generatePrompt}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Workflows;