import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(true);
  const [defaultAI, setDefaultAI] = useState("Gemini 2.5 Pro");

  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    const savedAI = localStorage.getItem("defaultAI");

    if (savedNotifications !== null) {
      setNotifications(savedNotifications === "true");
    }

    if (savedAI) {
      setDefaultAI(savedAI);
    }
  }, []);

  const saveNotifications = (value: boolean) => {
    setNotifications(value);
    localStorage.setItem("notifications", String(value));
  };

  const saveDefaultAI = (value: string) => {
    setDefaultAI(value);
    localStorage.setItem("defaultAI", value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your application preferences.
        </p>
      </div>

      {/* Settings Card */}

      <div className="bg-white rounded-2xl shadow-sm border p-8 space-y-8">

        {/* Notifications */}

        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">
              Enable Notifications
            </h2>

            <p className="text-gray-500 text-sm">
              Receive notifications about your workflows.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) =>
              saveNotifications(e.target.checked)
            }
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        <hr />

        {/* AI Model */}

        <div>
          <label className="block text-lg font-semibold mb-3">
            Default AI Model
          </label>

          <select
            value={defaultAI}
            onChange={(e) =>
              saveDefaultAI(e.target.value)
            }
            className="w-full border rounded-xl p-3"
          >
            <option>Gemini 2.5 Pro</option>
            <option>Gemini 2.5 Flash</option>
            <option>OpenAI GPT-4o</option>
            <option>Claude 4</option>
            <option>Llama 4</option>
          </select>

          <p className="text-sm text-gray-500 mt-2">
            This model will be selected by default in the AI Playground.
          </p>
        </div>

        <hr />

        {/* Application Info */}

        <div className="rounded-xl bg-cyan-50 border border-cyan-200 p-6">
          <h2 className="text-xl font-bold text-cyan-700 mb-4">
            🤖 Application Information
          </h2>

          <div className="space-y-3 text-gray-700">

            <p>
              <strong>Application:</strong> AI Workflow Automation
            </p>

            <p>
              <strong>Version:</strong> 1.0.0
            </p>

            <p>
              <strong>Frontend:</strong> React + TypeScript
            </p>

            <p>
              <strong>Backend:</strong> Go (Gin)
            </p>

            <p>
              <strong>Database:</strong> SQLite
            </p>

            <p>
              <strong>AI Provider:</strong> Google Gemini
            </p>

          </div>
        </div>

        <hr />

        {/* Logout */}

        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl font-semibold transition"
          >
            Logout
          </button>
        </div>

      </div>
    </div>
  );
};

export default Settings;