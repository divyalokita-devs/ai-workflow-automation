import { useEffect, useState } from "react";
import PromptHistory from "../components/workflow/PromptHistory";
import { generateAI } from "../services/workflowService";
import PromptTemplates from "../components/workflow/PromptTemplates";

const AIPlayground = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

     useEffect(() => {
     const saved = localStorage.getItem("promptHistory");

     if (saved) {
    setHistory(JSON.parse(saved));
    }
    }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }

    try {
      setLoading(true);

      const result = await generateAI(prompt);

      setResponse(result.response);
      const updatedHistory = [prompt, ...history].slice(0, 20);

      setHistory(updatedHistory);

      localStorage.setItem(
      "promptHistory",
      JSON.stringify(updatedHistory)
      );
    } catch (error) {
      console.error(error);
      alert("AI generation failed.");
    } finally {
      setLoading(false);
    }
  };

  const copyResponse = async () => {
    if (!response) return;

    await navigator.clipboard.writeText(response);

    alert("Copied to clipboard!");
  };

  const clearAll = () => {
    setPrompt("");
    setResponse("");
  };

  const selectPrompt = (selectedPrompt: string) => {
  setPrompt(selectedPrompt);
   };

  const downloadResponse = () => {
  if (!response) {
    alert("Nothing to download.");
    return;
  }

  const blob = new Blob([response], {
    type: "text/plain;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "ai-response.txt";

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          AI Playground
        </h1>

        <p className="text-gray-500 mt-2">
          Test prompts using your Gemini AI backend.
        </p>
        <PromptTemplates onSelect={selectPrompt} />
      </div>

      <div className="bg-white rounded-2xl border shadow-sm p-8">

        <label className="block font-semibold mb-3">
          Prompt
        </label>

        <textarea
          rows={8}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask Gemini anything..."
          className="w-full border rounded-xl p-4 resize-none focus:ring-2 focus:ring-cyan-500 outline-none"
        />

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          <button
            onClick={copyResponse}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Copy
          </button>

          <button
            onClick={downloadResponse}
            className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl"
>
             Download
           </button>

          <button
            onClick={clearAll}
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm p-8">
      <h2 className="text-2xl font-bold mb-4">
         AI Response
      </h2>

      <div className="bg-slate-100 rounded-xl p-5 min-h-[220px] whitespace-pre-wrap">
          {response || "AI response will appear here..."}
      </div>
      </div>

     <PromptHistory
        prompts={history}
        onSelect={selectPrompt}
        />
      </div>
    </div>
  );
};

export default AIPlayground;