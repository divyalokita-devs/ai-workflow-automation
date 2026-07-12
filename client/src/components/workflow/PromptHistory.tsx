type PromptHistoryProps = {
  prompts: string[];
  onSelect: (prompt: string) => void;
};

const PromptHistory = ({
  prompts,
  onSelect,
}: PromptHistoryProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-xl font-bold mb-5">
        Prompt History
      </h2>

      {prompts.length === 0 ? (
        <p className="text-gray-500">
          No prompts generated yet.
        </p>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {prompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => onSelect(prompt)}
              className="w-full text-left p-3 rounded-lg border hover:bg-cyan-50 transition"
            >
              {prompt.length > 70
                ? prompt.substring(0, 70) + "..."
                : prompt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PromptHistory;