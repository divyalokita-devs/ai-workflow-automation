import { useState } from "react";
import type { Workflow } from "../../types/workflow";

type WorkflowFormProps = {
  initialData?: Workflow | null;
  loading: boolean;
  generating: boolean;
  onGenerateAI: (prompt: string) => Promise<string>;
  onSubmit: (data: {
    title: string;
    status: string;
    color: "green" | "yellow" | "red";
    aiModel: string;
    prompt: string;
  }) => Promise<void>;
};

const WorkflowForm = ({
  initialData,
  loading,
  generating,
  onGenerateAI,
  onSubmit,
}: WorkflowFormProps) => {
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [status, setStatus] = useState(initialData?.status ?? "Active");
  const [color, setColor] = useState<"green" | "yellow" | "red">(
    initialData?.color ?? "green"
  );
  const [aiModel, setAiModel] = useState(
    initialData?.aiModel ?? "Gemini 2.5 Pro"
  );
  const [prompt, setPrompt] = useState(initialData?.prompt ?? "");
  const [aiResult, setAiResult] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt first.");
      return;
    }

    const result = await onGenerateAI(prompt);

    if (result) {
      setAiResult(result);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert("Workflow title is required.");
      return;
    }

    if (!prompt.trim()) {
      alert("Prompt is required.");
      return;
    }

    await onSubmit({
      title,
      status,
      color,
      aiModel,
      prompt,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-medium mb-2">
          Workflow Name
        </label>

        <input
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Generator"
        />
      </div>

      <div>
        <label className="block font-medium mb-2">
          AI Model
        </label>

        <select
          className="w-full border rounded-lg p-3"
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
        >
          <option>Gemini 2.5 Pro</option>
          <option>OpenAI GPT-4o</option>
          <option>Claude 4</option>
          <option>Llama 4</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2">
          Status
        </label>

        <select
          className="w-full border rounded-lg p-3"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Active</option>
          <option>Paused</option>
          <option>Draft</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2">
          Status Color
        </label>

        <select
          className="w-full border rounded-lg p-3"
          value={color}
          onChange={(e) =>
            setColor(e.target.value as "green" | "yellow" | "red")
          }
        >
          <option value="green">Green</option>
          <option value="yellow">Yellow</option>
          <option value="red">Red</option>
        </select>
      </div>

      <div>
        <label className="block font-medium mb-2">
          Prompt
        </label>

        <textarea
          rows={6}
          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 outline-none"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe what you want the AI to generate..."
        />
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={generating}
          className="px-5 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white"
        >
          {generating ? "Generating..." : "Generate with AI"}
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-5 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-400 text-white"
        >
          {loading
            ? "Saving..."
            : initialData
            ? "Update Workflow"
            : "Create Workflow"}
        </button>
      </div>

      {aiResult && (
        <div className="rounded-xl border bg-slate-50 p-4">
          <h3 className="font-semibold text-slate-700 mb-2">
            AI Response
          </h3>

          <p className="whitespace-pre-wrap text-gray-700">
            {aiResult}
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkflowForm;