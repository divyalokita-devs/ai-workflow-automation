import { useEffect, useState } from "react";
import { getWorkflows } from "../services/workflowService";

type User = {
  name: string;
  email: string;
};

const Profile = () => {
  const [user, setUser] = useState<User>({
    name: "Demo User",
    email: "demo@aiworkflow.com",
  });

  const [workflowCount, setWorkflowCount] = useState(0);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      const data = await getWorkflows();
      setWorkflowCount(data.length);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify(user));
    setEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser({
        name: "Demo User",
        email: "demo@aiworkflow.com",
      });
    }

    setEditing(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your profile information.
        </p>
      </div>

      {/* Profile Card */}

      <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-4xl">

        <div className="flex items-center justify-between flex-wrap gap-6">

          <div className="flex items-center gap-6">

            <div className="w-24 h-24 rounded-full bg-cyan-600 text-white flex items-center justify-center text-4xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                {user.name}
              </h2>

              <p className="text-gray-500">
                {user.email}
              </p>

              <span className="inline-block mt-3 px-4 py-1 rounded-full bg-cyan-100 text-cyan-700 font-semibold">
                AI Workflow Manager
              </span>
            </div>

          </div>

          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl transition"
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
              >
                💾 Save
              </button>

              <button
                onClick={handleCancel}
                className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-xl transition"
              >
                Cancel
              </button>
            </div>
          )}

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-slate-50 rounded-xl border p-5">
            <p className="text-gray-500 text-sm">
              Total Workflows
            </p>

            <h3 className="text-3xl font-bold mt-2">
              {workflowCount}
            </h3>
          </div>

          <div className="bg-slate-50 rounded-xl border p-5">
            <p className="text-gray-500 text-sm">
              Member Since
            </p>

            <h3 className="text-3xl font-bold mt-2">
              2026
            </h3>
          </div>

        </div>

        {/* Form */}

        <div className="grid gap-6 mt-10">

          <div>
            <label className="block font-semibold mb-2">
              Full Name
            </label>

            <input
              type="text"
              value={user.name}
              disabled={!editing}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
              className={`w-full rounded-xl border p-3 ${
                editing
                  ? "bg-white"
                  : "bg-gray-100"
              }`}
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Email Address
            </label>

            <input
              type="email"
              value={user.email}
              disabled={!editing}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
              className={`w-full rounded-xl border p-3 ${
                editing
                  ? "bg-white"
                  : "bg-gray-100"
              }`}
            />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;