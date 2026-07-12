import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSave: (workflow: any) => void;
};

const CreateWorkflowModal = ({
  open,
  onClose,
  onSave,
}: Props) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [color, setColor] = useState("green");
  const [aiModel, setAIModel] = useState("Gemini 2.5 Flash");
  const [prompt, setPrompt] = useState("");

  if (!open) return null;

  const handleSave = () => {
    if (!title.trim()) {
      alert("Workflow title is required");
      return;
    }

    onSave({
      title,
      status,
      color,
      aiModel,
      prompt,
    });

    setTitle("");
    setStatus("Active");
    setColor("green");
    setAIModel("Gemini 2.5 Flash");
    setPrompt("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6">

        <h2 className="text-2xl font-bold mb-6">
          Create Workflow
        </h2>

        <div className="space-y-4">

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Workflow Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full border rounded-lg p-3"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>Active</option>
            <option>Paused</option>
            <option>Draft</option>
          </select>

          <select
            className="w-full border rounded-lg p-3"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
          </select>

          <select
            className="w-full border rounded-lg p-3"
            value={aiModel}
            onChange={(e) => setAIModel(e.target.value)}
          >
            <option>Gemini 2.5 Flash</option>
            <option>Gemini 2.5 Pro</option>
          </select>

          <textarea
            rows={5}
            className="w-full border rounded-lg p-3"
            placeholder="Workflow Prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-cyan-600 text-white"
          >
            Save Workflow
          </button>

        </div>

      </div>
    </div>
  );
};

export default CreateWorkflowModal;