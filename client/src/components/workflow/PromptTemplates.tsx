type PromptTemplatesProps = {
  onSelect: (prompt: string) => void;
};

const templates = [
  "Write a professional email.",
  "Summarize the following text.",
  "Generate SEO keywords.",
  "Write a LinkedIn post.",
  "Generate a blog outline.",
  "Explain this code.",
];

const PromptTemplates = ({
  onSelect,
}: PromptTemplatesProps) => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="text-xl font-bold mb-5">
        AI Templates
      </h2>

      <div className="flex flex-wrap gap-3">
        {templates.map((template) => (
          <button
            key={template}
            onClick={() => onSelect(template)}
            className="px-4 py-2 rounded-lg bg-cyan-100 hover:bg-cyan-200 transition"
          >
            {template}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PromptTemplates;