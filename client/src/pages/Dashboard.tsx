import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";
import type { DashboardStats } from "../services/dashboardService";
import WorkflowChart from "../components/workflow/WorkflowChart";
import RecentWorkflows from "../components/workflow/RecentWorkflows";

const Dashboard = () => {
const navigate = useNavigate();

  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    active: 0,
    paused: 0,
    draft: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Workflows",
      value: stats.total,
      color: "bg-cyan-500",
      icon: "⚡",
    },
    {
      title: "Active",
      value: stats.active,
      color: "bg-green-500",
      icon: "🟢",
    },
    {
      title: "Paused",
      value: stats.paused,
      color: "bg-yellow-500",
      icon: "⏸️",
    },
    {
      title: "Draft",
      value: stats.draft,
      color: "bg-red-500",
      icon: "📄",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h2 className="text-xl font-semibold">
          Loading Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Welcome back! Monitor your AI workflow automation.
        </p>
      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-4xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Recent Workflows */}

      <div className="grid lg:grid-cols-2 gap-6">
        <WorkflowChart />
        <RecentWorkflows />
      </div>

      {/* Quick Actions */}

<div className="bg-white rounded-2xl shadow-sm border p-6">
  <h2 className="text-xl font-bold mb-6">
    Quick Actions
  </h2>

  <div className="flex flex-wrap gap-4">
    <button
  onClick={() => navigate("/workflows")}
  className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-xl transition"
>
  ➕ Create Workflow
</button>

<button
  onClick={() => navigate("/ai-playground")}
  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition"
>
  🤖 Generate AI
</button>

<button
  onClick={() => navigate("/history")}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition"
>
  📊 Analytics
</button>

  </div>
</div>
    </div>
  );
};

export default Dashboard;